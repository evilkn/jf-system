const LIMITS = {
    'General': Infinity,
    'Tercera Edad': Infinity,
    'Rimpe P.': 20000,
    'F.Publica': Infinity
};

const Store = {
    sriRegistros: [],
    usuarios: [],
    clientes: [],
    configuraciones: {
        regimenes: ['General', 'Tercera Edad', 'Rimpe P.', 'F.Publica'],
        formas: ['Mensual', 'Anual'],
        sino: ['Sí', 'No']
    },

    dashboardMeta: { totalRegistros: 0, mensual: {}, clientes: {} },

    get(key) {
        if (key === 'sri_registros') return this.sriRegistros;
        if (key === 'usuarios') return this.usuarios;
        if (key === 'clientes') return this.clientes;
        if (key === 'configuraciones') return this.configuraciones;
        if (key === 'dashboardMeta') return this.dashboardMeta;
        return JSON.parse(localStorage.getItem(key)) || null;
    },

    set(key, val) {
        if (['sri_registros', 'usuarios', 'clientes', 'dashboardMeta'].includes(key)) return;
        localStorage.setItem(key, JSON.stringify(val));
    },

    init(db, onUpdate) {
        // Load configurations from localStorage if exists
        const localConfig = JSON.parse(localStorage.getItem('configuraciones'));
        if (localConfig) this.configuraciones = localConfig;

        // Firebase Auth Listener
        firebase.auth().onAuthStateChanged(async (user) => {
            try {
                if (user) {
                    // USAMOS EL EMAIL COMO ID PARA FACILITAR LA PRE-AUTORIZACIÓN
                    let userDoc = await db.collection("usuarios").doc(user.email).get();
                    
                    // SI EL USUARIO NO EXISTE EN LA BASE DE DATOS, LO CREAMOS (AUTO-REGISTRO)
                    if (!userDoc.exists) {
                        const newUserData = {
                            email: user.email,
                            role: 'lector', // Rol por defecto: Lector (Solo ver)
                            photoURL: user.photoURL,
                            createdAt: new Date().toISOString(),
                            uid: user.uid // Guardamos el UID como referencia interna
                        };
                        await db.collection("usuarios").doc(user.email).set(newUserData);
                        userDoc = await db.collection("usuarios").doc(user.email).get();
                    } else {
                        // Si ya existe, actualizamos la foto por si cambió en Google
                        await db.collection("usuarios").doc(user.email).update({
                            photoURL: user.photoURL,
                            lastLogin: new Date().toISOString()
                        }).catch(err => console.warn("No se pudo actualizar perfil:", err));
                    }

                    const userData = userDoc.data();
                    
                    // Sincronizar tema del usuario si existe
                    if (userData.theme) {
                        State.theme = userData.theme;
                        localStorage.setItem('theme', userData.theme);
                        document.documentElement.setAttribute('data-theme', State.theme);
                    }
                    
                    State.currentUser = { 
                        ...userData,
                        uid: user.uid, 
                        email: user.email, 
                        photoURL: user.photoURL || userData.photoURL // Priorizamos Google pero fallamos a DB
                    };

                    this.setupDataListeners(db, onUpdate);
                    State.currentRoute = 'dashboard';
                } else {
                    State.currentUser = null;
                    State.currentRoute = 'login';
                    // Limpiar datos si no hay usuario
                    this.sriRegistros = [];
                    this.usuarios = [];
                    this.dashboardMeta = { totalRegistros: 0, mensual: {}, clientes: {} };
                }
            } catch (error) {
                console.error("Error crítico en autenticación:", error);
                State.currentUser = null;
                State.currentRoute = 'login';
            } finally {
                State.isLoading = false;
                onUpdate('auth');
            }
        });
    },

    setupDataListeners(db, onUpdate) {
        const user = State.currentUser;
        if (!user) return;

        // Escuchar Metadatos Globales (Opción B: Nivel Experto)
        db.collection("metadata").doc("dashboard").onSnapshot((doc) => {
            if (doc.exists) {
                this.dashboardMeta = doc.data();
                onUpdate('metadata');
            } else if (user.role === 'admin') {
                // Si el documento no existe y somos admin, lo construimos la primera vez
                this.rebuildDashboardMetadata();
            }
        }, (error) => console.error("Error en Metadata listener:", error));

        // Firestore Listener: Usuarios (Solo si es admin)
        if (user.role === 'admin') {
            db.collection("usuarios").onSnapshot((snapshot) => {
                this.usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                onUpdate('users');
            }, (error) => console.error("Error en Usuarios listener:", error));
        }

        // Firestore Listener: Clientes
        db.collection("clientes").onSnapshot((snapshot) => {
            this.clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            onUpdate('clients');
        }, (error) => console.error("Error en Clientes listener:", error));

        // Firestore Listener: Cuentas por Cobrar
        db.collection("cuentas_cobrar").onSnapshot((snapshot) => {
            State.cuentasCobrarData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            onUpdate('cuentas');
        }, (error) => console.error("Error en Cobrar listener:", error));

        // Firestore Listener: Cuentas por Pagar
        db.collection("cuentas_pagar").onSnapshot((snapshot) => {
            State.cuentasPagarData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            onUpdate('cuentas');
        }, (error) => console.error("Error en Pagar listener:", error));
    },

    currentSriListener: null,

    listenToClientSRI(clientId, onUpdate) {
        // 1. Limpiar el listener anterior si existe para no duplicar lecturas
        if (this.currentSriListener) {
            this.currentSriListener();
            this.currentSriListener = null;
        }

        if (!clientId) {
            this.sriRegistros = [];
            onUpdate('sri');
            return;
        }

        // 2. Query Segura: Solo descargar lo de este cliente específico
        // Esto reduce drásticamente los Document Reads de Firebase
        this.currentSriListener = db.collection("sri_registros")
            .where("clientId", "==", clientId)
            .onSnapshot((snapshot) => {
                this.sriRegistros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                onUpdate('sri');
            }, (error) => console.error("Error en SRI listener de cliente:", error));
    },

    async rebuildDashboardMetadata() {
        console.log("Reconstruyendo metadatos del dashboard desde cero...");
        const snapshot = await db.collection("sri_registros").get();
        let meta = { totalRegistros: 0, mensual: {}, clientes: {} };

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (!data.fecha || !data.clientId || !data.tipo) return; // saltar registros corruptos
            meta.totalRegistros++;

            const ym = data.fecha.substring(0, 7);
            const y  = data.fecha.substring(0, 4);

            if (!meta.mensual[ym]) meta.mensual[ym] = { sales: 0, purchases: 0 };

            if (data.tipo === 'venta' && !data.anulada) {
                const ventaNeta = (data.subt15 || 0) + (data.subt0 || 0);
                meta.mensual[ym].sales += ventaNeta;
                if (!meta.clientes[data.clientId]) meta.clientes[data.clientId] = {};
                if (!meta.clientes[data.clientId][y]) meta.clientes[data.clientId][y] = { sales: 0 };
                meta.clientes[data.clientId][y].sales += ventaNeta;
            } else if (data.tipo === 'compra') {
                meta.mensual[ym].purchases += (data.subt15 || 0) + (data.subt0 || 0) + (data.subt5 || 0);
            }
        });

        await db.collection("metadata").doc("dashboard").set(meta);
        console.log("Metadatos reconstruidos con éxito.");
    },

    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    },

    async logout() {
        return firebase.auth().signOut();
    },

    async saveCuentaCobrar(data) {
        if (data.id) {
            await db.collection("cuentas_cobrar").doc(data.id).set(data, { merge: true });
        } else {
            const docRef = db.collection("cuentas_cobrar").doc();
            data.id = docRef.id;
            await docRef.set(data);
        }
    },

    async deleteCuentaCobrar(id) {
        await db.collection("cuentas_cobrar").doc(id).delete();
    },

    async saveCuentaPagar(data) {
        if (data.id) {
            await db.collection("cuentas_pagar").doc(data.id).set(data, { merge: true });
        } else {
            const docRef = db.collection("cuentas_pagar").doc();
            data.id = docRef.id;
            await docRef.set(data);
        }
    },

    async deleteCuentaPagar(id) {
        await db.collection("cuentas_pagar").doc(id).delete();
    },

    async deleteCuentasBatch(type, ids) {
        const collection = type === 'cobrar' ? "cuentas_cobrar" : "cuentas_pagar";
        const batch = db.batch();
        ids.forEach(id => {
            const docRef = db.collection(collection).doc(id);
            batch.delete(docRef);
        });
        await batch.commit();
    },

    async saveClient(data, isEditing = false) {
        console.log('[Store.saveClient] Guardando doc ID:', data.id, '| isEditing:', isEditing);
        if (isEditing) {
            // merge:true preserva campos de Firestore que no están en el formulario (ej. createdAt)
            await db.collection("clientes").doc(data.id).set(data, { merge: true });
        } else {
            await db.collection("clientes").doc(data.id).set(data);
        }
    },

    async deleteClient(id) {
        await db.collection("clientes").doc(id).delete();
    },

    async saveSRI(data) {
        const docRef = db.collection("sri_registros").doc(data.id);
        const metaRef = db.collection("metadata").doc("dashboard");

        await db.runTransaction(async (transaction) => {
            const metaDoc = await transaction.get(metaRef);
            let meta = metaDoc.exists ? metaDoc.data() : { totalRegistros: 0, mensual: {}, clientes: {} };

            const oldDoc = await transaction.get(docRef);
            const oldData = oldDoc.exists ? oldDoc.data() : null;

            // Helper: suma ventas o compras de un registro (nuevo modelo)
            const regVentas  = (r) => r ? ((r.tipo==='venta' && !r.anulada) ? ((r.subt15||0)+(r.subt0||0)) : 0) : 0;
            const regCompras = (r) => r ? (r.tipo==='compra' ? ((r.subt15||0)+(r.subt0||0)+(r.subt5||0)) : 0) : 0;

            // Revertir datos viejos si existe
            if (oldData) {
                const oldYM = oldData.fecha.substring(0, 7);
                const oldY  = oldData.fecha.substring(0, 4);
                if (meta.mensual[oldYM]) {
                    meta.mensual[oldYM].sales     -= regVentas(oldData);
                    meta.mensual[oldYM].purchases -= regCompras(oldData);
                }
                if (meta.clientes[oldData.clientId]?.[oldY]) {
                    meta.clientes[oldData.clientId][oldY].sales -= regVentas(oldData);
                }
            } else {
                meta.totalRegistros = (meta.totalRegistros || 0) + 1;
            }

            // Sumar datos nuevos
            const newYM = data.fecha.substring(0, 7);
            const newY  = data.fecha.substring(0, 4);
            if (!meta.mensual[newYM]) meta.mensual[newYM] = { sales: 0, purchases: 0 };
            meta.mensual[newYM].sales     += regVentas(data);
            meta.mensual[newYM].purchases += regCompras(data);

            if (!meta.clientes[data.clientId]) meta.clientes[data.clientId] = {};
            if (!meta.clientes[data.clientId][newY]) meta.clientes[data.clientId][newY] = { sales: 0 };
            meta.clientes[data.clientId][newY].sales += regVentas(data);

            transaction.set(metaRef, meta);
            transaction.set(docRef, data);
        });
    },

    async deleteSRI(id) {
        const docRef = db.collection("sri_registros").doc(id);
        const metaRef = db.collection("metadata").doc("dashboard");

        await db.runTransaction(async (transaction) => {
            const oldDoc = await transaction.get(docRef);
            if (!oldDoc.exists) return;
            const oldData = oldDoc.data();

            const metaDoc = await transaction.get(metaRef);
            if (metaDoc.exists) {
                let meta = metaDoc.data();
                const oldYM = oldData.fecha.substring(0, 7);
                const oldY  = oldData.fecha.substring(0, 4);

                const regVentas  = (r) => (r.tipo==='venta' && !r.anulada) ? ((r.subt15||0)+(r.subt0||0)) : 0;
                const regCompras = (r) => (r.tipo==='compra') ? ((r.subt15||0)+(r.subt0||0)+(r.subt5||0)) : 0;

                if (meta.mensual[oldYM]) {
                    meta.mensual[oldYM].sales     -= regVentas(oldData);
                    meta.mensual[oldYM].purchases -= regCompras(oldData);
                }
                if (meta.clientes[oldData.clientId]?.[oldY]) {
                    meta.clientes[oldData.clientId][oldY].sales -= regVentas(oldData);
                }
                meta.totalRegistros = Math.max(0, (meta.totalRegistros || 1) - 1);
                transaction.set(metaRef, meta);
            }
            transaction.delete(docRef);
        });
    },

    async saveUser(data) {
        await db.collection("usuarios").doc(data.id).set(data);
    },

    async deleteUser(id) {
        await db.collection("usuarios").doc(id).delete();
    },

    async updateUserRole(id, newRole) {
        await db.collection("usuarios").doc(id).update({ role: newRole });
    },

    async updateUserTheme(theme) {
        if (!State.currentUser) return;
        localStorage.setItem('theme', theme);
        await db.collection("usuarios").doc(State.currentUser.email).update({ theme: theme })
            .catch(err => console.warn("No se pudo guardar tema en la nube:", err));
    },

    getUserRole() {
        return State.currentUser ? State.currentUser.role : 'lector';
    },

    // ─────────────────────────────────────────────
    // CONCILIADO — Crédito Tributario
    // ─────────────────────────────────────────────

    // Cache local para créditos tributarios ya cargados
    _conciliadoCreditos: {},

    getConciliadoCredito(clientId, anio, mes = 0) {
        const key = `${clientId}_${anio}` + (mes ? `_${mes}` : '');
        return this._conciliadoCreditos[key] ?? 0;
    },

    async saveConciliadoCredito(clientId, anio, mes = 0, credito) {
        const key  = `${clientId}_${anio}` + (mes ? `_${mes}` : '');
        const data = { clientId, anio, mes, credito, updatedAt: new Date().toISOString() };
        this._conciliadoCreditos[key] = credito;  // cache local
        await db.collection('conciliados').doc(key).set(data);
    },

    async loadConciliadoCreditos(clientId) {
        try {
            const snap = await db.collection('conciliados')
                .where('clientId', '==', clientId).get();
            snap.forEach(doc => {
                const d = doc.data();
                const key = `${d.clientId}_${d.anio}` + (d.mes ? `_${d.mes}` : '');
                this._conciliadoCreditos[key] = d.credito || 0;
            });
        } catch (e) {
            console.warn('loadConciliadoCreditos:', e);
        }
    }
};

if (typeof window !== 'undefined') {
    window.Store = Store;
    window.LIMITS = LIMITS;
}
