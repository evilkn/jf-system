const App = {
    // Data for Ecuadorian Bank Logos
    bankLogos: {
        'guayaquil': 'img/logos/banco_guayaquil.png',
        'pichincha': 'img/logos/banco_pichincha.png',
        'jep': 'img/logos/cooperativa_jep.png',
        'azuayo': 'img/logos/cooperativa_jardin_azuayo.png'
    },

    getBankLogoHTML(bankName, size = 18) {
        if (!bankName) return '';
        const lowerName = bankName.toLowerCase();
        let logoUrl = null;

        for (const [key, url] of Object.entries(this.bankLogos)) {
            if (lowerName.includes(key)) {
                logoUrl = url;
                break;
            }
        }

        if (logoUrl) {
            return `<img src="${logoUrl}" style="width:${size}px; height:${size}px; object-fit:contain; border-radius:3px; vertical-align:middle; margin-right:8px; background:white; padding:1px; border:1px solid rgba(0,0,0,0.05);" alt="${bankName}">`;
        }
        
        // Default icon if no logo found
        return `<span style="display:inline-flex; align-items:center; justify-content:center; width:${size}px; height:${size}px; margin-right:8px; color:var(--primary); opacity:0.7;">${Icons.bank(size)}</span>`;
    },

    init() {
        console.log('App Initializing...');
        // Set initial theme
        document.documentElement.setAttribute('data-theme', State.theme);
        
        // Initialize Store with Firestore and an update callback
        Store.init(db, (type) => {
            console.log(`Store updated: ${type}`);
            this.render();
        });

        // Initial render
        this.render();
    },

    // Función de seguridad para prevenir XSS
    escapeHTML(str) {
        if (!str) return '';
        return str.toString().replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    },

    togglePasswordVis(inputId) {
        const input = document.getElementById(inputId);
        if (input) {
            input.type = input.type === 'password' ? 'text' : 'password';
        }
    },

    copyToClipboard(inputId) {
        const input = document.getElementById(inputId);
        if (!input || !input.value) {
            App.showToast('No hay valor para copiar.', 'warning');
            return;
        }
        navigator.clipboard.writeText(input.value).then(() => {
            App.showToast('¡Copiado al portapapeles!', 'success');
        }).catch(() => {
            // Fallback para contextos sin clipboard API
            const tmp = document.createElement('textarea');
            tmp.value = input.value;
            tmp.style.position = 'fixed';
            tmp.style.opacity = '0';
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            App.showToast('¡Copiado al portapapeles!', 'success');
        });
    },

    // Copia el contenido de un <span> oculto (modo display de ficha)
    copyRaw(spanId) {
        const span = document.getElementById(spanId);
        if (!span || !span.textContent) { this.showToast('No hay valor para copiar.', 'warning'); return; }
        navigator.clipboard.writeText(span.textContent).then(() => {
            this.showToast('¡Copiado al portapapeles!', 'success');
        }).catch(() => {
            const tmp = document.createElement('textarea');
            tmp.value = span.textContent;
            tmp.style.cssText = 'position:fixed;opacity:0;';
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            this.showToast('¡Copiado al portapapeles!', 'success');
        });
    },

    // Alterna la visibilidad del valor en modo display (•••• ↔ valor real)
    toggleDisplay(displayId, rawId) {
        const disp = document.getElementById(displayId);
        const raw  = document.getElementById(rawId);
        if (!disp || !raw) return;
        if (disp.textContent === '••••••••') {
            disp.textContent = raw.textContent;
            disp.style.letterSpacing = 'normal';
        } else {
            disp.textContent = '••••••••';
            disp.style.letterSpacing = '1px';
        }
    },

    navigate(route, resetClient = false) {
        if (resetClient || route !== 'sri') {
            State.currentClientId = null;
            State.editingId = null; // Also reset editing state for safety
            
            // Cleanup listener para no gastar lecturas en background
            if (Store.listenToClientSRI) {
                Store.listenToClientSRI(null, () => {}); 
            }
        }

        // Limpiar listener de Matriz si salimos de ella
        if (State.currentRoute === 'matriz' && route !== 'matriz') {
            if (State.matrizSriListener) {
                State.matrizSriListener();
                State.matrizSriListener = null;
            }
        }

        State.currentRoute = route;

        // Al navegar a clientes, limpiar formulario y ficha activa
        if (route === 'clients') {
            State.showClientForm = false;
            State.clientEditingId = null;
            State.currentFichaClientId = null;
            State.fichaEditingSection = null;
        }

        this.render();
    },

    toggleTheme() {
        State.theme = State.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', State.theme);
        document.documentElement.setAttribute('data-theme', State.theme);
        if (State.currentUser) {
            Store.updateUserTheme(State.theme);
        }
        this.render();
    },

    toggleSettingsModal() {
        State.showSettingsModal = !State.showSettingsModal;
        this.render();
    },

    render() {
        const root = document.getElementById('app');
        if (!root) return;

        // Si el sistema aún está verificando la identidad
        if (State.isLoading) {
            root.innerHTML = Views.splash();
            return;
        }

        if (State.currentRoute === 'login') {
            root.innerHTML = Views.login();
            this.initParticles();
        } else {
            const content = this.getContent();
            root.innerHTML = Views.layout(content);
            this.afterRender();
        }
    },

    getContent() {
        switch (State.currentRoute) {
            case 'dashboard': return Views.dashboard();
            case 'clients': return Views.clients();
            case 'sri': return Views.sri();
            case 'reports': return Views.reports();
            case 'matriz': return Views.matriz();
            case 'cuentas': return Views.cuentas();
            default: return Views.dashboard();
        }
    },

    afterRender() {
        // Hydrate dynamic lists after the main layout is in DOM
        if (State.currentRoute === 'dashboard') {
            this.initDashboardChart();
        }
        if (State.currentRoute === 'sri' && State.currentClientId) {
            this.renderSRITable();
        }
        if (State.currentRoute === 'clients') {
            this.renderClientsTable();
        }
        if (State.currentRoute === 'matriz') {
            this.initMatrizListener();
        }
        if (State.showSettingsModal) {
            this.renderUsersList();
        }
    },

    initParticles() {
        if (window.particlesJS && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": State.theme === 'dark' ? ["#8b5cf6", "#c4b5fd", "#ffffff"] : ["#3b82f6", "#1e40af", "#6d28d9"] },
                    "shape": { "type": "circle" },
                    "opacity": { 
                        "value": 0.8, 
                        "random": true,
                        "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
                    },
                    "size": { 
                        "value": 3.5, 
                        "random": true,
                        "anim": { "enable": true, "speed": 2, "size_min": 1, "sync": false }
                    },
                    "line_linked": { "enable": false },
                    "move": { 
                        "enable": true, 
                        "speed": 0.6, 
                        "direction": "top", 
                        "random": true, 
                        "straight": false, 
                        "out_mode": "out", 
                        "bounce": false 
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "bubble" },
                        "onclick": { "enable": true, "mode": "repulse" },
                        "resize": true
                    },
                    "modes": {
                        "bubble": { "distance": 150, "size": 5, "duration": 2, "opacity": 1, "speed": 3 },
                        "repulse": { "distance": 200, "duration": 0.4 }
                    }
                },
                "retina_detect": true
            });
        }
    },

    // --- Authentication ---
    async handleGoogleLogin() {
        const btnText = document.getElementById('login-btn-text');
        const spinner = document.getElementById('login-spinner');
        const googleIcon = document.getElementById('login-google-icon');
        
        if (btnText && spinner && googleIcon) {
            btnText.style.display = 'none';
            googleIcon.style.display = 'none';
            spinner.style.display = 'block';
        }
        
        try {
            await Store.loginWithGoogle();
            this.showToast('Bienvenido con Google', 'success');
        } catch (err) {
            console.error(err);
            this.showToast('Error al autenticar con Google', 'danger');
            if (btnText && spinner && googleIcon) {
                btnText.style.display = 'block';
                googleIcon.style.display = 'block';
                spinner.style.display = 'none';
            }
        }
    },

    async handleLogout() {
        Views.confirmModal(
            '¿Ya te vas?', 
            'Tu sesión se cerrará y tendrás que volver a autenticarte para acceder al panel.',
            async () => {
                try {
                    await Store.logout();
                    this.showToast('Sesión cerrada', 'info');
                } catch (err) {
                    this.showToast('Error al cerrar sesión', 'danger');
                }
            }
        );
    },

    // --- SRI / Registro Compra & Venta Handlers ---
    selectClient(clientId) {
        State.currentClientId = clientId;
        // Cargar créditos tributarios del cliente en caché
        Store.loadConciliadoCreditos(clientId);
        Store.listenToClientSRI(clientId, () => {
            if (State.currentRoute === 'sri') {
                this.renderVentasTable();
                this.renderComprasTable();
                this.updateSRISummary();
                if (State.sriActiveTab === 'conciliado') this.renderConciliadoTable();
            }
        });
        this.navigate('sri');
    },


    updateSRISummary() {
        const el = document.getElementById('sri-summary');
        if (el) el.innerHTML = Views.renderSRISummary();
    },

    setSRIPeriod() {
        const m = document.getElementById('sri-mes-sel');
        const a = document.getElementById('sri-anio-sel');
        if (m) State.sriMes  = parseInt(m.value);
        if (a) State.sriAnio = parseInt(a.value);
        this.renderVentasTable();
        this.renderComprasTable();
        this.updateSRISummary();
    },

    switchSRITab(tab) {
        State.sriActiveTab = tab;
        document.querySelectorAll('.sri-tab').forEach(t => t.classList.remove('sri-tab-active'));
        document.getElementById('tab-' + tab)?.classList.add('sri-tab-active');
        document.getElementById('sri-panel-ventas').style.display     = tab === 'ventas'     ? 'block' : 'none';
        document.getElementById('sri-panel-compras').style.display    = tab === 'compras'    ? 'block' : 'none';
        document.getElementById('sri-panel-conciliado').style.display = tab === 'conciliado' ? 'block' : 'none';
        if (tab === 'conciliado') this.renderConciliadoPanel();
    },

    switchCuentasTab(tab) {
        State.cuentasActiveTab = tab;
        document.querySelectorAll('.cuentas-tab').forEach(t => t.classList.remove('sri-tab-active'));
        document.getElementById('tab-cuentas-' + tab)?.classList.add('sri-tab-active');
        const panelCobrar = document.getElementById('cuentas-panel-cobrar');
        const panelPagar = document.getElementById('cuentas-panel-pagar');
        if (panelCobrar) panelCobrar.style.display = tab === 'cobrar' ? 'block' : 'none';
        if (panelPagar) panelPagar.style.display = tab === 'pagar' ? 'block' : 'none';
    },

    // --- Gestión de Cuentas: Lógica ---

    calculateCuentasCobrar() {
        const monto = parseFloat(document.getElementById('cobrar-monto')?.value) || 0;
        const abono = parseFloat(document.getElementById('cobrar-abono')?.value) || 0;
        const pendiente = Math.max(0, monto - abono);
        const pendienteEl = document.getElementById('cobrar-pendiente');
        if (pendienteEl) pendienteEl.value = pendiente.toFixed(2);
    },

    toggleBankSelect(type, isTransfer) {
        const container = document.getElementById(`${type}-banco-container`);
        if (container) container.style.display = isTransfer ? 'block' : 'none';
        if (!isTransfer) {
            const search = document.getElementById(`${type}-banco-search`);
            const selected = document.getElementById(`${type}-banco-selected`);
            if (search) search.value = '';
            if (selected) selected.value = '';
        }
    },

    filterBanks(type, query) {
        const list = document.getElementById(`${type}-banco-list`);
        if (!list) return;
        
        if (!query) {
            list.style.display = 'none';
            return;
        }

        const filtered = State.bancosEcuador.filter(b => b.toLowerCase().includes(query.toLowerCase()));
        
        if (filtered.length > 0) {
            list.innerHTML = filtered.map(b => `
                <li onclick="App.selectBank('${type}', '${b}')" style="display:flex; align-items:center;">
                    ${this.getBankLogoHTML(b, 16)}
                    <span>${b}</span>
                </li>
            `).join('');
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }
    },

    selectBank(type, bankName) {
        const search = document.getElementById(`${type}-banco-search`);
        const selected = document.getElementById(`${type}-banco-selected`);
        const list = document.getElementById(`${type}-banco-list`);
        
        if (search) search.value = bankName;
        if (selected) selected.value = bankName;
        if (list) list.style.display = 'none';
    },

    handleMethodCheck(type, method) {
        const checkboxes = document.querySelectorAll(`input[name="${type}-metodo"]`);
        checkboxes.forEach(cb => {
            if (cb.value !== method) cb.checked = false;
        });
        
        // Si se desmarcó el actual, asegurar que al menos uno esté marcado (opcional, pero mejor para UX)
        const checked = document.querySelector(`input[name="${type}-metodo"]:checked`);
        if (!checked) {
            const current = Array.from(checkboxes).find(cb => cb.value === method);
            if (current) current.checked = true;
        }

        const isTransfer = (method === 'Transferencia');
        this.toggleBankSelect(type, isTransfer);
    },

    toggleBankSelect(type, show) {
        const container = document.getElementById(`${type}-banco-container`);
        if (container) {
            container.style.display = show ? 'block' : 'none';
            const searchInput = document.getElementById(`${type}-banco-search`);
            if (show && searchInput) searchInput.setAttribute('required', 'required');
            else if (searchInput) searchInput.removeAttribute('required');
        }
    },

    toggleMontoEdit(type) {
        const input = document.getElementById(`${type}-monto`);
        if (input) {
            input.disabled = !input.disabled;
            if (!input.disabled) input.focus();
        }
    },

    renderBankDetail(bankName) {
        if (!bankName) return '';
        return `
            <div style="display:inline-flex;align-items:center;gap:2px;background:rgba(var(--primary-rgb),0.08);padding:4px 10px;border-radius:20px;font-size:0.75rem;margin-top:4px;border:1px solid rgba(var(--primary-rgb),0.1);box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                ${this.getBankLogoHTML(bankName, 14)}
                <span style="font-weight:600;color:var(--primary);">${bankName}</span>
            </div>
        `;
    },

    async saveCuentaCobrar() {
        const data = {
            cliente: document.getElementById('cobrar-cliente').value,
            concepto: document.getElementById('cobrar-concepto').value,
            fecha: document.getElementById('cobrar-fecha').value,
            montoTotal: parseFloat(document.getElementById('cobrar-monto').value) || 0,
            pendiente: parseFloat(document.getElementById('cobrar-pendiente').value) || 0,
        };

        if (!State.editingCuentasCobrarId) {
            // Es nuevo registro, procesar abono inicial si existe
            const abonoInicial = parseFloat(document.getElementById('cobrar-abono').value) || 0;
            data.abonos = [];
            if (abonoInicial > 0) {
                const metodo = document.querySelector('input[name="cobrar-metodo"]:checked')?.value || 'Efectivo';
                const banco = metodo === 'Transferencia' ? document.getElementById('cobrar-banco-selected').value : '';
                data.abonos.push({
                    fecha: new Date().toISOString(),
                    monto: abonoInicial,
                    metodo: metodo,
                    banco: banco
                });
            }
        } else {
            data.id = State.editingCuentasCobrarId;
            const existing = State.cuentasCobrarData.find(c => c.id === State.editingCuentasCobrarId);
            data.abonos = existing ? [...existing.abonos] : [];
            
            // Si hay abonos, permitir actualizar el método/banco del primero (abono inicial) si los campos existen
            const methodInput = document.querySelector('input[name="cobrar-metodo"]:checked');
            if (data.abonos.length > 0 && methodInput) {
                const metodo = methodInput.value || 'Efectivo';
                const banco = metodo === 'Transferencia' ? (document.getElementById('cobrar-banco-selected')?.value || '') : '';
                data.abonos[0] = { ...data.abonos[0], metodo, banco };
            }

            const totalAbonado = data.abonos.reduce((sum, a) => sum + a.monto, 0);
            data.pendiente = Math.max(0, data.montoTotal - totalAbonado);
        }

        try {
            await Store.saveCuentaCobrar(data);
            this.showToast('Cuenta por cobrar guardada correctamente', 'success');
            State.editingCuentasCobrarId = null;
            this.render();
        } catch (e) {
            console.error(e);
            this.showToast('Error al guardar la cuenta', 'danger');
        }
    },

    editCuentaCobrar(id) {
        const record = State.cuentasCobrarData.find(c => c.id === id);
        if (!record) return;

        State.editingCuentasCobrarId = id;
        this.render();

        setTimeout(() => {
            document.getElementById('cobrar-cliente').value = record.cliente || '';
            document.getElementById('cobrar-concepto').value = record.concepto || '';
            document.getElementById('cobrar-fecha').value = record.fecha || '';
            document.getElementById('cobrar-monto').value = record.montoTotal || 0;
            document.getElementById('cobrar-pendiente').value = record.pendiente || 0;
            
            // Poblar método y banco del primer abono si existe y los campos están presentes
            const firstAbono = (record.abonos && record.abonos.length > 0) ? record.abonos[0] : null;
            if (firstAbono && document.querySelector('input[name="cobrar-metodo"]')) {
                const method = firstAbono.metodo || 'Efectivo';
                this.handleMethodCheck('cobrar', method);
                const bank = firstAbono.banco || '';
                const bankSearch = document.getElementById('cobrar-banco-search');
                const bankSelected = document.getElementById('cobrar-banco-selected');
                if (bankSearch) bankSearch.value = bank;
                if (bankSelected) bankSelected.value = bank;
            }

            const abonoInput = document.getElementById('cobrar-abono');
            if (abonoInput) abonoInput.value = 0;

            if (record.abonos && record.abonos.length > 0) {
                document.getElementById('cobrar-monto').disabled = true;
            }
        }, 50);
    },

    cancelEditCuentaCobrar() {
        State.editingCuentasCobrarId = null;
        this.render();
    },

    async deleteCuentaCobrar(id) {
        if (!(await this.confirmDialog({ 
            title: '¿Eliminar Cuenta por Cobrar?', 
            message: 'Esta acción borrará permanentemente el registro de deuda del cliente.' 
        }))) return;
        try {
            await Store.deleteCuentaCobrar(id);
            this.showToast('Registro eliminado', 'info');
        } catch (e) {
            this.showToast('Error al eliminar', 'danger');
        }
    },

    setCobrarSearch(q) {
        State.cobrarSearch = q;
        State.cobrarPage = 1;
        this.render();
    },

    setCobrarPage(p) {
        State.cobrarPage = p;
        this.render();
    },

    renderPagination(type) {
        const data = type === 'cobrar' ? (State.cuentasCobrarData || []) : (State.cuentasPagarData || []);
        const q = (type === 'cobrar' ? State.cobrarSearch : State.pagarSearch).toLowerCase().trim();
        const filtered = q 
            ? data.filter(d => (d.cliente || d.proveedor || '').toLowerCase().includes(q))
            : data;
        
        const totalPages = Math.ceil(filtered.length / State.pageSize);
        if (totalPages <= 1) return '';

        const currentPage = type === 'cobrar' ? State.cobrarPage : State.pagarPage;
        let html = '';

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button class="btn ${i === currentPage ? 'btn-primary' : 'btn-secondary'}" 
                    style="padding:6px 12px; font-size:0.8rem; min-width:32px;"
                    onclick="App.set${type.charAt(0).toUpperCase() + type.slice(1)}Page(${i})">
                    ${i}
                </button>
            `;
        }
        return html;
    },

    renderCuentasCobrarTable() {
        const allData = State.cuentasCobrarData || [];
        const q = (State.cobrarSearch || '').toLowerCase().trim();
        
        // Filter
        let filtered = q 
            ? allData.filter(c => (c.cliente || '').toLowerCase().includes(q))
            : allData;

        if (allData.length === 0) {
            return `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-secondary);">No hay registros de cuentas por cobrar.</td></tr>`;
        }

        if (filtered.length === 0) {
            return `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-secondary);">No se encontraron resultados para "${this.escapeHTML(q)}".</td></tr>`;
        }

        // Paginate
        const start = (State.cobrarPage - 1) * State.pageSize;
        const paged = filtered.slice(start, start + State.pageSize);

        return paged.map(c => {
            const isPaid = c.pendiente <= 0;
            const lastTransfer = (c.abonos || []).filter(a => a.metodo === 'Transferencia').pop();
            const bankName = lastTransfer ? lastTransfer.banco : '';

            return `
                <tr class="animate-fadeIn">
                    <td>
                        <input type="checkbox" class="cobrar-checkbox" 
                            ${State.selectedCuentasCobrar.includes(c.id) ? 'checked' : ''} 
                            onchange="App.toggleCuentaSelection('cobrar', '${c.id}', this.checked)">
                    </td>
                    <td>
                        <div style="font-weight:700;">${c.cliente}</div>
                        ${bankName ? `<div style="margin-top:4px; display:flex; align-items:center; font-size:0.7rem; color:var(--text-secondary); opacity:0.8;">
                            ${this.getBankLogoHTML(bankName, 12)} ${bankName}
                        </div>` : ''}
                    </td>
                    <td style="font-size:0.8rem;color:var(--text-secondary);">${c.concepto || '-'}</td>
                    <td>${c.fecha}</td>
                    <td style="text-align:right;font-weight:700;">$${c.montoTotal.toFixed(2)}</td>
                    <td style="text-align:right;font-weight:800;color:${isPaid ? 'var(--success)' : 'var(--primary)'};">$${c.pendiente.toFixed(2)}</td>
                    <td>
                        <span class="status-pill ${isPaid ? 'status-green' : 'status-yellow'}" style="font-size:0.7rem;padding:4px 8px;">
                            ${isPaid ? 'Pagado' : 'Pendiente'}
                        </span>
                    </td>
                    <td>
                        <div style="display:flex;gap:4px;">
                            <button class="icon-btn" onclick="App.openDetalleModal('cobrar', '${c.id}')" title="Ver Detalles" style="color:var(--primary);">
                                ${Icons.eye()}
                            </button>
                            <button class="icon-btn" onclick="App.openAbonoModal('${c.id}')" title="Registrar Abono" style="color:var(--success);">
                                ${Icons.plus()}
                            </button>
                            <button class="icon-btn" onclick="App.editCuentaCobrar('${c.id}')" title="Editar Metadatos" style="color:var(--primary);">
                                ${Icons.edit()}
                            </button>
                            <button class="icon-btn" onclick="App.deleteCuentaCobrar('${c.id}')" title="Eliminar" style="color:var(--danger);">
                                ${Icons.delete()}
                            </button>
                            <button class="icon-btn" onclick="App.exportSingleClientReport('${c.cliente}')" title="Exportar PDF Individual" style="color:var(--accent);">
                                ${Icons.pdf()}
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    },

    openAbonoModal(id, type = 'cobrar') {
        State.abonoCurrentId = id;
        State.abonoType = type;
        State.showAbonoModal = true;
        this.render();
        
        setTimeout(() => {
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
            const input = document.getElementById('abono-fecha');
            if (input) input.value = localISOTime;
        }, 50);
    },

    closeAbonoModal() {
        State.showAbonoModal = false;
        State.abonoCurrentId = null;
        this.render();
    },

    async saveAbono() {
        const id = State.abonoCurrentId;
        const type = State.abonoType;
        const collection = type === 'cobrar' ? State.cuentasCobrarData : State.cuentasPagarData;
        const record = collection.find(c => c.id === id);
        if (!record) return;

        const monto = parseFloat(document.getElementById('abono-monto').value) || 0;
        const fecha = document.getElementById('abono-fecha').value;
        const metodo = document.querySelector('input[name="abono-metodo"]:checked')?.value || 'Efectivo';
        const banco = metodo === 'Transferencia' ? document.getElementById('abono-banco-selected').value : '';

        if (monto <= 0) return this.showToast('Monto inválido', 'warning');
        if (monto > record.pendiente + 0.01) return this.showToast('El abono no puede exceder la deuda', 'warning');

        const newAbono = {
            fecha: fecha,
            monto: monto,
            metodo: metodo,
            banco: banco
        };

        const updatedAbonos = [...(record.abonos || []), newAbono];
        const totalAbonado = updatedAbonos.reduce((sum, a) => sum + a.monto, 0);
        const newPendiente = Math.max(0, record.montoTotal - totalAbonado);

        try {
            if (type === 'cobrar') {
                await Store.saveCuentaCobrar({ id, abonos: updatedAbonos, pendiente: newPendiente });
            } else {
                await Store.saveCuentaPagar({ id, abonos: updatedAbonos, pendiente: newPendiente });
            }
            this.showToast('Abono registrado con éxito', 'success');
            this.closeAbonoModal();
        } catch (e) {
            this.showToast('Error al registrar abono', 'danger');
        }
    },

    // --- Lógica Cuentas por Pagar ---

    calculateCuentasPagar() {
        const monto = parseFloat(document.getElementById('pagar-monto')?.value) || 0;
        const abono = parseFloat(document.getElementById('pagar-abono')?.value) || 0;
        const pendiente = Math.max(0, monto - abono);
        const pendienteEl = document.getElementById('pagar-pendiente');
        if (pendienteEl) pendienteEl.value = pendiente.toFixed(2);
    },

    async saveCuentaPagar() {
        const data = {
            proveedor: document.getElementById('pagar-proveedor').value,
            concepto: document.getElementById('pagar-concepto').value,
            fecha: document.getElementById('pagar-fecha').value,
            montoTotal: parseFloat(document.getElementById('pagar-monto').value) || 0,
            pendiente: parseFloat(document.getElementById('pagar-pendiente').value) || 0,
        };

        if (!State.editingCuentasPagarId) {
            const abonoInicial = parseFloat(document.getElementById('pagar-abono').value) || 0;
            data.abonos = [];
            if (abonoInicial > 0) {
                const methodInput = document.querySelector('input[name="pagar-metodo"]:checked');
                const metodo = methodInput ? methodInput.value : 'Efectivo';
                const bankEl = document.getElementById('pagar-banco-selected');
                const banco = (metodo === 'Transferencia' && bankEl) ? bankEl.value : '';
                
                data.abonos.push({
                    fecha: new Date().toISOString(),
                    monto: abonoInicial,
                    metodo: metodo,
                    banco: banco
                });
            }
        } else {
            data.id = State.editingCuentasPagarId;
            const existing = State.cuentasPagarData.find(c => c.id === State.editingCuentasPagarId);
            data.abonos = existing ? [...existing.abonos] : [];

            if (data.abonos.length > 0) {
                const methodInput = document.querySelector('input[name="pagar-metodo"]:checked');
                if (methodInput) {
                    const metodo = methodInput.value || 'Efectivo';
                    const bankEl = document.getElementById('pagar-banco-selected');
                    const banco = metodo === 'Transferencia' ? (bankEl?.value || '') : '';
                    data.abonos[0] = { ...data.abonos[0], metodo, banco };
                }
            }

            const totalAbonado = data.abonos.reduce((sum, a) => sum + a.monto, 0);
            data.pendiente = Math.max(0, data.montoTotal - totalAbonado);
        }

        try {
            await Store.saveCuentaPagar(data);
            this.showToast('Cuenta por pagar guardada', 'success');
            State.editingCuentasPagarId = null;
            this.render();
        } catch (e) {
            console.error(e);
            this.showToast('Error al guardar', 'danger');
        }
    },

    editCuentaPagar(id) {
        const record = State.cuentasPagarData.find(c => c.id === id);
        if (!record) return;

        State.editingCuentasPagarId = id;
        this.render();

        setTimeout(() => {
            document.getElementById('pagar-proveedor').value = record.proveedor || '';
            document.getElementById('pagar-concepto').value = record.concepto || '';
            document.getElementById('pagar-fecha').value = record.fecha || '';
            document.getElementById('pagar-monto').value = record.montoTotal || 0;
            document.getElementById('pagar-pendiente').value = record.pendiente || 0;
            
            const firstAbono = (record.abonos && record.abonos.length > 0) ? record.abonos[0] : null;
            if (firstAbono && document.querySelector('input[name="pagar-metodo"]')) {
                const method = firstAbono.metodo || 'Efectivo';
                this.handleMethodCheck('pagar', method);
                const bank = firstAbono.banco || '';
                const bankSearch = document.getElementById('pagar-banco-search');
                const bankSelected = document.getElementById('pagar-banco-selected');
                if (bankSearch) bankSearch.value = bank;
                if (bankSelected) bankSelected.value = bank;
            }

            const abonoInput = document.getElementById('pagar-abono');
            if (abonoInput) abonoInput.value = 0;

            if (record.abonos && record.abonos.length > 0) {
                document.getElementById('pagar-monto').disabled = true;
            }
        }, 50);
    },

    cancelEditCuentaPagar() {
        State.editingCuentasPagarId = null;
        this.render();
    },

    async deleteCuentaPagar(id) {
        if (!(await this.confirmDialog({ 
            title: '¿Eliminar Cuenta por Pagar?', 
            message: '¿Estás seguro de que deseas eliminar este compromiso de pago?' 
        }))) return;
        try {
            await Store.deleteCuentaPagar(id);
            this.showToast('Registro eliminado', 'info');
        } catch (e) {
            console.error(e);
            this.showToast('Error al eliminar', 'danger');
        }
    },

    setPagarSearch(q) {
        State.pagarSearch = q;
        State.pagarPage = 1;
        this.render();
    },

    setPagarPage(p) {
        State.pagarPage = p;
        this.render();
    },

    renderCuentasPagarTable() {
        const allData = State.cuentasPagarData || [];
        const q = (State.pagarSearch || '').toLowerCase().trim();
        
        let filtered = q 
            ? allData.filter(c => (c.proveedor || '').toLowerCase().includes(q))
            : allData;

        if (allData.length === 0) {
            return `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-secondary);">No hay registros de cuentas por pagar.</td></tr>`;
        }

        if (filtered.length === 0) {
            return `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-secondary);">No se encontraron resultados para "${this.escapeHTML(q)}".</td></tr>`;
        }

        const start = (State.pagarPage - 1) * State.pageSize;
        const paged = filtered.slice(start, start + State.pageSize);

        return paged.map(c => {
            const isPaid = c.pendiente <= 0;
            const lastTransfer = (c.abonos || []).filter(a => a.metodo === 'Transferencia').pop();
            const bankName = lastTransfer ? lastTransfer.banco : '';

            return `
                <tr class="animate-fadeIn">
                    <td>
                        <input type="checkbox" class="pagar-checkbox" 
                            ${State.selectedCuentasPagar.includes(c.id) ? 'checked' : ''} 
                            onchange="App.toggleCuentaSelection('pagar', '${c.id}', this.checked)">
                    </td>
                    <td><strong>${c.proveedor}</strong></td>
                    <td style="font-size:0.8rem;color:var(--text-secondary);">${c.concepto || '-'}</td>
                    <td>${c.fecha}</td>
                    <td style="text-align:right;font-weight:700;">$${c.montoTotal.toFixed(2)}</td>
                    <td style="text-align:right;font-weight:800;color:${isPaid ? 'var(--success)' : 'var(--danger)'};">$${c.pendiente.toFixed(2)}</td>
                    <td>
                        <span class="status-pill ${isPaid ? 'status-green' : 'status-red'}" style="font-size:0.7rem;padding:4px 8px;">
                            ${isPaid ? 'Pagado' : 'Pendiente'}
                        </span>
                        ${bankName ? `<div style="margin-top:6px; display:flex; align-items:center; font-size:0.7rem; color:var(--text-secondary); opacity:0.8;">
                            ${this.getBankLogoHTML(bankName, 12)} ${bankName}
                        </div>` : ''}
                    </td>
                    <td>
                        <div style="display:flex;gap:4px;">
                            <button class="icon-btn" onclick="App.openDetalleModal('pagar', '${c.id}')" title="Ver Detalles" style="color:var(--primary);">
                                ${Icons.eye()}
                            </button>
                            <button class="icon-btn" onclick="App.openAbonoModal('${c.id}', 'pagar')" title="Registrar Pago" style="color:var(--success);">
                                ${Icons.plus()}
                            </button>
                            <button class="icon-btn" onclick="App.editCuentaPagar('${c.id}')" title="Editar" style="color:var(--primary);">
                                ${Icons.edit()}
                            </button>
                            <button class="icon-btn" onclick="App.deleteCuentaPagar('${c.id}')" title="Eliminar" style="color:var(--danger);">
                                ${Icons.delete()}
                            </button>
                            <button class="icon-btn" onclick="App.exportSingleClientReport('${c.proveedor}')" title="Exportar PDF Individual" style="color:var(--accent);">
                                ${Icons.pdf()}
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    },

    openDetalleModal(type, id) {
        const data = type === 'cobrar' ? State.cuentasCobrarData : State.cuentasPagarData;
        const record = data.find(r => r.id === id);
        if (!record) return;

        State.detalleRecord = record;
        State.detalleType = type;
        State.showDetalleModal = true;
        this.render();
        this.renderDetalleModalContent();
    },

    closeDetalleModal() {
        State.showDetalleModal = false;
        State.detalleRecord = null;
        this.render();
    },

    renderDetalleModalContent() {
        const container = document.getElementById('detalle-modal-content');
        if (!container || !State.detalleRecord) return;

        const r = State.detalleRecord;
        const type = State.detalleType;
        const name = type === 'cobrar' ? r.cliente : r.proveedor;
        const label = type === 'cobrar' ? 'Cliente' : 'Proveedor';
        const totalPaid = (r.abonos || []).reduce((sum, a) => sum + a.monto, 0);

        container.innerHTML = `
            <div style="padding:24px; background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:white; border-bottom:1px solid rgba(255,255,255,0.1);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px;">
                    <div>
                        <h2 style="margin:0; font-family:var(--font-heading); font-size:1.5rem; letter-spacing:-0.5px;">Historial de Pagos</h2>
                        <p style="margin:6px 0 0; opacity:0.9; font-size:0.95rem;">${label}: <strong style="color:var(--accent);">${name}</strong></p>
                    </div>
                    <button class="icon-btn detalle-close-btn" onclick="App.closeDetalleModal()" style="color:white; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">
                        ${Icons.close()}
                    </button>
                </div>
                
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px;">
                    <div style="padding:16px; border-radius:16px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(10px);">
                        <div style="font-size:0.75rem; text-transform:uppercase; opacity:0.7; margin-bottom:6px; font-weight:700; letter-spacing:0.5px;">Deuda Total</div>
                        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono);">$${r.montoTotal.toFixed(2)}</div>
                    </div>
                    <div style="padding:16px; border-radius:16px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(10px);">
                        <div style="font-size:0.75rem; text-transform:uppercase; opacity:0.7; margin-bottom:6px; font-weight:700; letter-spacing:0.5px;">Total Pagado</div>
                        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#10b981;">$${totalPaid.toFixed(2)}</div>
                    </div>
                    <div style="padding:16px; border-radius:16px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); backdrop-filter:blur(10px);">
                        <div style="font-size:0.75rem; text-transform:uppercase; opacity:0.8; margin-bottom:6px; font-weight:700; letter-spacing:0.5px;">Saldo Pendiente</div>
                        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:${r.pendiente > 0 ? '#fbbf24' : '#10b981'};">$${r.pendiente.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <div style="padding:24px; max-height:450px; overflow-y:auto; background:var(--bg-card);">
                <h4 style="margin:0 0 20px; font-size:0.85rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1.5px; font-weight:700; display:flex; align-items:center; gap:8px;">
                    <span style="width:20px; height:2px; background:var(--primary); display:inline-block;"></span>
                    Movimientos Registrados
                </h4>
                
                ${!r.abonos || r.abonos.length === 0 ? `
                    <div style="text-align:center; padding:60px 20px; color:var(--text-secondary); opacity:0.5;">
                        <div style="margin-bottom:16px;">${Icons.emptyDocument()}</div>
                        <p style="margin:0; font-weight:500;">No hay abonos registrados para esta cuenta.</p>
                    </div>
                ` : `
                    <div style="display:flex; flex-direction:column; gap:16px;">
                        ${r.abonos.map((a, idx) => {
                            const isTransf = a.metodo === 'Transferencia';
                            const accentColor = isTransf ? '#6366f1' : '#10b981';
                            return `
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; background:var(--bg-main); border-radius:16px; border:1px solid var(--border-color); position:relative; overflow:hidden; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                                <div style="position:absolute; left:0; top:0; bottom:0; width:4px; background:${accentColor};"></div>
                                <div style="display:flex; align-items:center; gap:16px;">
                                    <div style="width:52px; height:52px; border-radius:12px; background:${isTransf ? 'rgba(99,102,241,0.08)' : 'rgba(16,185,129,0.08)'}; display:flex; align-items:center; justify-content:center; border:1px solid ${isTransf ? 'rgba(99,102,241,0.1)' : 'rgba(16,185,129,0.1)'};">
                                        ${isTransf ? this.getBankLogoHTML(a.banco, 32).replace('margin-right:8px;', 'margin-right:0;') : Icons.cash(28)}
                                    </div>
                                    <div>
                                        <div style="font-weight:800; font-size:1.25rem; color:var(--text-primary); font-family:var(--font-mono); letter-spacing:-0.5px;">$${a.monto.toFixed(2)}</div>
                                        <div style="font-size:0.8rem; color:var(--text-secondary); font-weight:500;">
                                            ${this.formatDateTime(a.fecha)}
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align:right;">
                                    <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); text-transform:capitalize; margin-bottom:4px;">${a.metodo}</div>
                                    ${isTransf ? `
                                        <div style="font-size:0.75rem; color:${accentColor}; font-weight:700; display:flex; align-items:center; justify-content:flex-end; gap:6px;">
                                            <span style="opacity:0.8;">${a.banco}</span>
                                            ${this.getBankLogoHTML(a.banco, 14).replace('margin-right:8px;', 'margin-right:0;')}
                                        </div>` : ''}
                                </div>
                            </div>
                            `;
                        }).reverse().join('')}
                    </div>
                `}
            </div>

        `;
    },

    formatDateTime(isoString) {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return date.toLocaleString('es-EC', { 
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) { return isoString; }
    },


    calculateVentaIVA() {
        const s15 = parseFloat(document.getElementById('venta-subt15')?.value) || 0;
        const s0  = parseFloat(document.getElementById('venta-subt0')?.value)  || 0;
        const iva = s15 * 0.15;
        const total = s15 + s0 + iva;
        const ivaEl   = document.getElementById('venta-iva');
        const totalEl = document.getElementById('venta-total');
        if (ivaEl)   ivaEl.value   = iva.toFixed(2);
        if (totalEl) totalEl.value = total.toFixed(2);
    },

    calculateCompraIVA() {
        const s15 = parseFloat(document.getElementById('compra-subt15')?.value) || 0;
        const s0  = parseFloat(document.getElementById('compra-subt0')?.value)  || 0;
        const s5  = parseFloat(document.getElementById('compra-subt5')?.value)  || 0;
        const iva = (s15 * 0.15) + (s5 * 0.05);
        const total = s15 + s0 + s5 + iva;
        const ivaEl   = document.getElementById('compra-iva');
        const totalEl = document.getElementById('compra-total');
        if (ivaEl)   ivaEl.value   = iva.toFixed(2);
        if (totalEl) totalEl.value = total.toFixed(2);
    },

    // Keep legacy calculateIVA alias for backward compatibility
    calculateIVA() { this.calculateVentaIVA(); },

    async handleSRISubmit(e, tipo) {
        e.preventDefault();
        const isEditing = !!State.sriEditingId;
        let data;

        if (tipo === 'venta') {
            const fecha = document.getElementById('venta-fecha').value;
            const d = new Date(fecha + 'T00:00:00');
            data = {
                id: State.sriEditingId || 'sri_' + Date.now(),
                tipo: 'venta',
                clientId: State.currentClientId,
                factura:       document.getElementById('venta-factura').value.trim(),
                clienteNombre: document.getElementById('venta-cliente').value.trim(),
                rucCedula:     document.getElementById('venta-ruc').value.trim(),
                fecha,
                mes:    d.getMonth() + 1,
                anio:   d.getFullYear(),
                subt15: parseFloat(document.getElementById('venta-subt15').value) || 0,
                subt0:  parseFloat(document.getElementById('venta-subt0').value)  || 0,
                iva:    parseFloat(document.getElementById('venta-iva').value)    || 0,
                total:  parseFloat(document.getElementById('venta-total').value)  || 0,
                anulada: document.getElementById('venta-anulada').checked,
                updatedAt: new Date().toISOString()
            };
        } else {
            const fecha = document.getElementById('compra-fecha').value;
            const d = new Date(fecha + 'T00:00:00');
            data = {
                id: State.sriEditingId || 'sri_' + Date.now(),
                tipo: 'compra',
                clientId: State.currentClientId,
                factura:   document.getElementById('compra-factura').value.trim(),
                proveedor: document.getElementById('compra-proveedor').value.trim(),
                ruc:       document.getElementById('compra-ruc').value.trim(),
                fecha,
                mes:    d.getMonth() + 1,
                anio:   d.getFullYear(),
                subt15: parseFloat(document.getElementById('compra-subt15').value) || 0,
                subt0:  parseFloat(document.getElementById('compra-subt0').value)  || 0,
                subt5:  parseFloat(document.getElementById('compra-subt5').value)  || 0,
                iva:    parseFloat(document.getElementById('compra-iva').value)    || 0,
                total:  parseFloat(document.getElementById('compra-total').value)  || 0,
                updatedAt: new Date().toISOString()
            };
        }

        try {
            await Store.saveSRI(data);
            this.showToast(isEditing ? 'Registro actualizado' : 'Registro guardado correctamente', 'success');
            State.sriEditingId  = null;
            State.sriEditingTipo = null;
            this.resetSRIForm(tipo === 'venta' ? 'ventas' : 'compras');
        } catch (err) {
            this.showToast('Error al guardar: ' + err.message, 'danger');
        }
    },

    resetSRIForm(panel) {
        if (panel === 'ventas' || !panel) {
            const f = document.getElementById('sri-form-ventas');
            if (f) f.reset();
        }
        if (panel === 'compras' || !panel) {
            const f = document.getElementById('sri-form-compras');
            if (f) f.reset();
        }
        State.sriEditingId   = null;
        State.sriEditingTipo = null;
    },

    renderVentasTable() {
        const tbody = document.getElementById('sri-ventas-body');
        const tfoot = document.getElementById('sri-ventas-foot');
        if (!tbody) return;

        const registros = Store.get('sri_registros')
            .filter(r => r.clientId === State.currentClientId && r.tipo === 'venta'
                      && r.mes === State.sriMes && r.anio === State.sriAnio)
            .sort((a,b) => a.fecha > b.fecha ? -1 : 1);

        const isAdmin = State.currentUser?.role === 'admin';
        const fmt = n => '$' + (n||0).toFixed(2);

        if (registros.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${isAdmin?10:9}" style="border:none;padding:0;">
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptyDocument()}</div>
                    <div class="empty-state-title">Sin ventas en este período</div>
                    <div class="empty-state-desc">No hay ventas registradas para ${State.sriMes}/${State.sriAnio}.</div>
                </div></td></tr>`;
            if (tfoot) tfoot.innerHTML = '';
            return;
        }

        tbody.replaceChildren();
        const fragment = document.createDocumentFragment();
        let totS15=0, totS0=0, totIva=0, totTotal=0;

        registros.forEach(r => {
            totS15   += r.subt15||0;
            totS0    += r.subt0||0;
            totIva   += r.iva||0;
            totTotal += r.total||0;

            const tr = document.createElement('tr');
            if (r.anulada) tr.classList.add('row-anulada');
            tr.dataset.id = r.id;
            tr.innerHTML = `
                <td style="font-family:var(--font-mono);font-size:0.82rem;">${this.escapeHTML(r.factura||'')}</td>
                <td>${this.escapeHTML(r.clienteNombre||'-')}</td>
                <td style="font-family:var(--font-mono);">${this.escapeHTML(r.rucCedula||'-')}</td>
                <td>${r.fecha||''}</td>
                <td style="text-align:right;">${fmt(r.subt15)}</td>
                <td style="text-align:right;">${fmt(r.subt0)}</td>
                <td style="text-align:right;font-weight:600;color:var(--primary);">${fmt(r.iva)}</td>
                <td style="text-align:right;font-weight:700;">${fmt(r.total)}</td>
                <td><span style="font-size:0.75rem;padding:2px 8px;border-radius:20px;font-weight:700;background:${r.anulada?'rgba(239,68,68,0.12)':'rgba(34,197,94,0.12)'};color:${r.anulada?'var(--danger)':'var(--success)'};">${r.anulada?'ANULADA':'VÁLIDA'}</span></td>
                ${isAdmin ? `<td></td>` : ''}
            `;
            if (isAdmin) {
                const td = tr.querySelector('td:last-child');
                td.style.cssText = 'white-space:nowrap;';
                const wrap = document.createElement('div');
                wrap.style.cssText = 'display:flex;gap:4px;';
                const btnE = document.createElement('button');
                btnE.className = 'btn-icon'; btnE.title = 'Editar';
                btnE.style.cssText = 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;';
                btnE.innerHTML = Icons.edit(); btnE.onclick = () => App.editSRI(r.id);
                const btnD = document.createElement('button');
                btnD.className = 'btn-icon'; btnD.title = 'Eliminar';
                btnD.style.cssText = 'color:var(--danger);width:28px;height:28px;display:flex;align-items:center;justify-content:center;';
                btnD.innerHTML = Icons.trash(); btnD.onclick = () => App.deleteSRI(r.id);
                wrap.appendChild(btnE); wrap.appendChild(btnD); td.appendChild(wrap);
            }
            fragment.appendChild(tr);
        });
        tbody.replaceChildren(fragment);

        if (tfoot) tfoot.innerHTML = `<tr class="sri-tfoot-row">
            <td colspan="4" style="text-align:right;font-weight:700;">TOTALES (${registros.length} reg.):</td>
            <td style="text-align:right;">${fmt(totS15)}</td>
            <td style="text-align:right;">${fmt(totS0)}</td>
            <td style="text-align:right;color:var(--primary);">${fmt(totIva)}</td>
            <td style="text-align:right;">${fmt(totTotal)}</td>
            <td>${isAdmin?'<td></td>':''}</td>
        </tr>`;
    },

    renderComprasTable() {
        const tbody = document.getElementById('sri-compras-body');
        const tfoot = document.getElementById('sri-compras-foot');
        if (!tbody) return;

        const registros = Store.get('sri_registros')
            .filter(r => r.clientId === State.currentClientId && r.tipo === 'compra'
                      && r.mes === State.sriMes && r.anio === State.sriAnio)
            .sort((a,b) => a.fecha > b.fecha ? -1 : 1);

        const isAdmin = State.currentUser?.role === 'admin';
        const fmt = n => '$' + (n||0).toFixed(2);

        if (registros.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${isAdmin?10:9}" style="border:none;padding:0;">
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptyDocument()}</div>
                    <div class="empty-state-title">Sin compras en este período</div>
                    <div class="empty-state-desc">No hay compras registradas para ${State.sriMes}/${State.sriAnio}.</div>
                </div></td></tr>`;
            if (tfoot) tfoot.innerHTML = '';
            return;
        }

        tbody.replaceChildren();
        const fragment = document.createDocumentFragment();
        let totS15=0, totS0=0, totS5=0, totIva=0, totTotal=0;

        registros.forEach(r => {
            totS15   += r.subt15||0;
            totS0    += r.subt0||0;
            totS5    += r.subt5||0;
            totIva   += r.iva||0;
            totTotal += r.total||0;

            const tr = document.createElement('tr');
            tr.dataset.id = r.id;
            tr.innerHTML = `
                <td style="font-family:var(--font-mono);font-size:0.82rem;">${this.escapeHTML(r.factura||'')}</td>
                <td>${this.escapeHTML(r.proveedor||'-')}</td>
                <td style="font-family:var(--font-mono);">${this.escapeHTML(r.ruc||'-')}</td>
                <td>${r.fecha||''}</td>
                <td style="text-align:right;">${fmt(r.subt15)}</td>
                <td style="text-align:right;">${fmt(r.subt0)}</td>
                <td style="text-align:right;">${fmt(r.subt5)}</td>
                <td style="text-align:right;font-weight:600;color:var(--danger);">${fmt(r.iva)}</td>
                <td style="text-align:right;font-weight:700;">${fmt(r.total)}</td>
                ${isAdmin ? `<td></td>` : ''}
            `;
            if (isAdmin) {
                const td = tr.querySelector('td:last-child');
                td.style.cssText = 'white-space:nowrap;';
                const wrap = document.createElement('div');
                wrap.style.cssText = 'display:flex;gap:4px;';
                const btnE = document.createElement('button');
                btnE.className = 'btn-icon'; btnE.title = 'Editar';
                btnE.style.cssText = 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;';
                btnE.innerHTML = Icons.edit(); btnE.onclick = () => App.editSRI(r.id);
                const btnD = document.createElement('button');
                btnD.className = 'btn-icon'; btnD.title = 'Eliminar';
                btnD.style.cssText = 'color:var(--danger);width:28px;height:28px;display:flex;align-items:center;justify-content:center;';
                btnD.innerHTML = Icons.trash(); btnD.onclick = () => App.deleteSRI(r.id);
                wrap.appendChild(btnE); wrap.appendChild(btnD); td.appendChild(wrap);
            }
            fragment.appendChild(tr);
        });
        tbody.replaceChildren(fragment);

        if (tfoot) tfoot.innerHTML = `<tr class="sri-tfoot-row">
            <td colspan="4" style="text-align:right;font-weight:700;">TOTALES (${registros.length} reg.):</td>
            <td style="text-align:right;">${fmt(totS15)}</td>
            <td style="text-align:right;">${fmt(totS0)}</td>
            <td style="text-align:right;">${fmt(totS5)}</td>
            <td style="text-align:right;color:var(--danger);">${fmt(totIva)}</td>
            <td style="text-align:right;">${fmt(totTotal)}</td>
            ${isAdmin?'<td></td>':''}
        </tr>`;
    },

    // Keep renderSRITable as alias so existing listeners don't break
    renderSRITable() {
        this.renderVentasTable();
        this.renderComprasTable();
    },

    editSRI(id) {
        const r = Store.get('sri_registros').find(x => x.id === id);
        if (!r) return;
        State.sriEditingId   = id;
        State.sriEditingTipo = r.tipo;

        if (r.tipo === 'venta') {
            this.switchSRITab('ventas');
            const set = (id, v) => { const el=document.getElementById(id); if(el) el.value=v; };
            set('venta-factura', r.factura||'');
            set('venta-cliente', r.clienteNombre||'');
            set('venta-ruc',     r.rucCedula||'');
            set('venta-fecha',   r.fecha||'');
            set('venta-subt15',  r.subt15||0);
            set('venta-subt0',   r.subt0||0);
            const chk = document.getElementById('venta-anulada');
            if (chk) chk.checked = !!r.anulada;
            this.calculateVentaIVA();
        } else {
            this.switchSRITab('compras');
            const set = (id, v) => { const el=document.getElementById(id); if(el) el.value=v; };
            set('compra-factura',   r.factura||'');
            set('compra-proveedor', r.proveedor||'');
            set('compra-ruc',       r.ruc||'');
            set('compra-fecha',     r.fecha||'');
            set('compra-subt15',    r.subt15||0);
            set('compra-subt0',     r.subt0||0);
            set('compra-subt5',     r.subt5||0);
            this.calculateCompraIVA();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async deleteSRI(id) {
        if (!(await this.confirmDialog({ 
            title: '¿Eliminar Registro SRI?', 
            message: 'Se borrará el registro de venta/compra y se actualizarán las estadísticas del dashboard.' 
        }))) return;
        await Store.deleteSRI(id);
        this.showToast('Registro eliminado', 'warning');
    },

    // ─────────────────────────────────────────────
    // CONCILIADO — Resumen Mensual de Compra/Venta
    // ─────────────────────────────────────────────

    setConciliadoPeriod() {
        const a = document.getElementById('con-anio-sel');
        const m = document.getElementById('con-mes-sel');
        if (a) State.conciliadoAnio = parseInt(a.value);
        if (m) State.conciliadoPeriodo = parseInt(m.value);
        this.renderConciliadoPanel();
    },

    renderConciliadoPanel() {
        const container = document.getElementById('conciliado-content');
        if (!container) return;

        const now   = new Date();
        const client = (Store.get('clientes') || []).find(c => c.id === State.currentClientId);
        // Fallback: si no hay crédito para el mes específico, buscar el anual (mes=0) o usar 0
        let credito = Store.getConciliadoCredito(State.currentClientId, State.conciliadoAnio, State.conciliadoPeriodo);
        if (!credito && State.conciliadoPeriodo !== 0) {
             const fallbackCredito = Store.getConciliadoCredito(State.currentClientId, State.conciliadoAnio, 0);
             if (fallbackCredito) credito = fallbackCredito;
        }

        const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

        // Build print wrapper (always in DOM for printing)
        container.innerHTML = `
        <!-- ── ÁREA IMPRIMIBLE ─────────────────────────────────── -->
        <div id="conciliado-print-area">
            <div class="print-header" style="display:none;">
                <div>
                    <div class="ph-brand">JF SYSTEM</div>
                    <div style="font-size:0.7rem;color:rgba(255,255,255,0.65);margin-top:2px;">Sistema de Gestión Contable</div>
                </div>
                <div class="ph-meta">
                    <div style="font-weight:700;font-size:0.85rem;">REPORTE CONCILIADO</div>
                    <div>Período: <span id="print-periodo"></span></div>
                    <div>Generado: ${now.toLocaleDateString('es-EC',{day:'2-digit',month:'long',year:'numeric'})}</div>
                </div>
            </div>
            <div class="print-client-band" style="display:none;">
                <div>
                    <div style="font-weight:800;font-size:0.95rem;">${this.escapeHTML(client?.name || '')}</div>
                    <div style="font-size:0.75rem;opacity:0.8;">RUC: ${this.escapeHTML(client?.ruc || '')} &nbsp;|&nbsp; Régimen: ${this.escapeHTML(client?.regime || '')}</div>
                </div>
                <div style="font-size:0.75rem;opacity:0.8;">
                    Forma: ${this.escapeHTML(client?.frecuencia || '')}
                </div>
            </div>
            <div class="print-body">
                <div class="print-title" style="display:none;">CONCILIADO TRIBUTARIO</div>

                <!-- ── FILTROS (no imprimen) ─────────────────────── -->
                <div class="conciliado-filter-bar print-no-print">
                    <label>Año:</label>
                    <select id="con-anio-sel" onchange="App.setConciliadoPeriod()" style="padding:6px;border-radius:4px;border:1px solid rgba(0,0,0,0.1);">
                        ${[...Array(10)].map((_, i) => {
                            const y = now.getFullYear() - i;
                            return \`<option value="\${y}" \${State.conciliadoAnio === y ? 'selected' : ''}>\${y}</option>\`;
                        }).join('')}
                    </select>
                    
                    <label style="margin-left:12px;">Período:</label>
                    <select id="con-mes-sel" onchange="App.setConciliadoPeriod()" style="padding:6px;border-radius:4px;border:1px solid rgba(0,0,0,0.1);">
                        <option value="0" ${State.conciliadoPeriodo === 0 ? 'selected' : ''}>Todo el año</option>
                        ${MESES.map((m, i) => \`<option value="\${i+1}" \${State.conciliadoPeriodo === i+1 ? 'selected' : ''}>\${m}</option>\`).join('')}
                    </select>
                    
                    <button class="btn btn-primary print-no-print" onclick="App.exportConciliadoPDF()" style="margin-left:auto;display:flex;align-items:center;gap:8px;padding:8px 18px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9,15 12,18 15,15"/></svg>
                        Exportar PDF
                    </button>
                </div>

                <!-- ── TABLA CONCILIADO ──────────────────────────── -->
                <div class="conciliado-table-wrap">
                    <table class="conciliado-table" id="tabla-conciliado">
                        <thead>
                            <tr>
                                <th rowspan="2" style="text-align:left;min-width:110px;">Mes</th>
                                <th colspan="3" class="group-ventas">VENTAS</th>
                                <th colspan="6" class="group-compras">COMPRAS</th>
                            </tr>
                            <tr>
                                <th class="group-ventas">Sub.15%</th>
                                <th class="group-ventas">IVA 15%</th>
                                <th class="group-ventas">Total</th>
                                <th class="group-compras">Sub.15%</th>
                                <th class="group-compras">Sub.5%</th>
                                <th class="group-compras">Sub.0%</th>
                                <th class="group-compras">IVA 15%</th>
                                <th class="group-compras">IVA 5%</th>
                                <th class="group-compras">Total</th>
                            </tr>
                        </thead>
                        <tbody id="conciliado-tbody"></tbody>
                        <tfoot id="conciliado-tfoot"></tfoot>
                    </table>
                </div>

                <!-- ── CRÉDITO TRIBUTARIO ────────────────────────── -->
                <div class="credito-tributario-card print-no-print" style="margin-top:20px;">
                    <div style="flex:1;">
                        <div style="font-size:0.72rem;font-weight:800;letter-spacing:1px;color:var(--text-secondary);margin-bottom:6px;">CRÉDITO TRIBUTARIO (arrastre período anterior)</div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <input type="number" id="con-credito" step="0.01" min="0"
                                value="${credito}"
                                placeholder="0.00"
                                onchange="App.saveCreditoTributario()"
                                style="width:160px;font-family:var(--font-mono);font-size:1rem;font-weight:700;text-align:right;">
                            <span style="font-size:0.8rem;color:var(--text-secondary);">USD</span>
                        </div>
                    </div>
                    <div style="flex:1;text-align:right;">
                        <div style="font-size:0.72rem;font-weight:800;letter-spacing:1px;color:var(--text-secondary);margin-bottom:6px;">BALANCE IVA</div>
                        <div id="con-balance-chip"></div>
                    </div>
                </div>

                <!-- Balance para impresión -->
                <div id="print-balance-area" style="display:none;margin-top:12px;text-align:right;"></div>
            </div>
            <div class="print-footer" style="display:none;">
                <span>JF SYSTEM — Sistema de Gestión Contable</span>
                <span>Documento generado el ${now.toLocaleDateString('es-EC')}</span>
            </div>
        </div>
        `;

        this.renderConciliadoTable();
    },

    renderConciliadoTable() {
        const tbody = document.getElementById('conciliado-tbody');
        const tfoot = document.getElementById('conciliado-tfoot');
        if (!tbody) return;

        const MESES  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

        const all = Store.get('sri_registros').filter(r =>
            r.clientId === State.currentClientId
        );

        // Determinar meses en el rango
        const mesesEnRango = [];
        if (State.conciliadoPeriodo === 0) {
            for (let m = 1; m <= 12; m++) {
                mesesEnRango.push({ mes: m, anio: State.conciliadoAnio });
            }
        } else {
            mesesEnRango.push({ mes: State.conciliadoPeriodo, anio: State.conciliadoAnio });
        }

        // Acumuladores totales
        let sumVS15=0, sumVIva=0, sumVTot=0;
        let sumCS15=0, sumCS5=0, sumCS0=0, sumCIva15=0, sumCIva5=0, sumCTot=0;

        const fmt = n => (n||0).toFixed(2);

        const rows = mesesEnRango.map(({mes, anio}) => {
            const ventasMes  = all.filter(r => r.tipo==='venta'  && !r.anulada && r.mes===mes && r.anio===anio);
            const comprasMes = all.filter(r => r.tipo==='compra' && r.mes===mes && r.anio===anio);

            const vS15  = ventasMes.reduce((s,r)  => s+(r.subt15||0), 0);
            const vIva  = ventasMes.reduce((s,r)  => s+(r.iva||0),    0);
            const vTot  = ventasMes.reduce((s,r)  => s+(r.total||0),  0);

            const cS15  = comprasMes.reduce((s,r) => s+(r.subt15||0), 0);
            const cS5   = comprasMes.reduce((s,r) => s+(r.subt5||0),  0);
            const cS0   = comprasMes.reduce((s,r) => s+(r.subt0||0),  0);
            const cIva15 = comprasMes.reduce((s,r)=> s+(r.subt15||0)*0.15, 0);
            const cIva5  = comprasMes.reduce((s,r)=> s+(r.subt5||0)*0.05,  0);
            const cTot   = comprasMes.reduce((s,r)=> s+(r.total||0),  0);

            sumVS15  += vS15;  sumVIva += vIva;  sumVTot += vTot;
            sumCS15  += cS15;  sumCS5  += cS5;   sumCS0  += cS0;
            sumCIva15+= cIva15;sumCIva5+= cIva5; sumCTot += cTot;

            const hasData = vS15||vIva||vTot||cS15||cS5||cS0||cTot;
            const opacity = hasData ? '' : 'opacity:0.35;';

            return `<tr style="${opacity}">
                <td class="mes-col">${MESES[mes-1]}</td>
                <td>${fmt(vS15)}</td>
                <td style="color:var(--success);font-weight:600;">${fmt(vIva)}</td>
                <td style="font-weight:700;">${fmt(vTot)}</td>
                <td>${fmt(cS15)}</td>
                <td>${fmt(cS5)}</td>
                <td>${fmt(cS0)}</td>
                <td style="color:var(--danger);font-weight:600;">${fmt(cIva15)}</td>
                <td style="color:var(--danger);font-weight:600;">${fmt(cIva5)}</td>
                <td style="font-weight:700;">${fmt(cTot)}</td>
            </tr>`;
        });

        tbody.innerHTML = rows.join('');

        tfoot.innerHTML = `<tr class="conciliado-suman">
            <td class="mes-col">SUMAN</td>
            <td>${fmt(sumVS15)}</td>
            <td style="color:var(--success);">${fmt(sumVIva)}</td>
            <td>${fmt(sumVTot)}</td>
            <td>${fmt(sumCS15)}</td>
            <td>${fmt(sumCS5)}</td>
            <td>${fmt(sumCS0)}</td>
            <td style="color:var(--danger);">${fmt(sumCIva15)}</td>
            <td style="color:var(--danger);">${fmt(sumCIva5)}</td>
            <td>${fmt(sumCTot)}</td>
        </tr>`;

        // Balance IVA
        this._updateConciliadoBalance(sumVIva, sumCIva15 + sumCIva5);

        // Actualizar período para impresión
        const pEl = document.getElementById('print-periodo');
        if (pEl) {
            if (State.conciliadoPeriodo === 0) {
                pEl.textContent = `Año ${State.conciliadoAnio}`;
            } else {
                pEl.textContent = `${MESES[State.conciliadoPeriodo - 1]} ${State.conciliadoAnio}`;
            }
        }
    },

    _updateConciliadoBalance(ivaVentas, ivaCompras) {
        const credito  = parseFloat(document.getElementById('con-credito')?.value) || 0;
        const balance  = ivaVentas - ivaCompras - credito;
        const chip     = document.getElementById('con-balance-chip');
        const printBal = document.getElementById('print-balance-area');
        const fmt      = n => '$' + Math.abs(n).toFixed(2);
        const label    = balance >= 0 ? 'A FAVOR' : 'A PAGAR';
        const cls      = balance >= 0 ? 'a-favor' : 'a-pagar';
        const html     = `<span class="balance-chip ${cls}">${label}: ${fmt(balance)}</span>`;
        if (chip)     chip.innerHTML     = html;
        if (printBal) printBal.innerHTML = html;
    },

    async saveCreditoTributario() {
        const credito = parseFloat(document.getElementById('con-credito')?.value) || 0;
        await Store.saveConciliadoCredito(State.currentClientId, State.conciliadoAnio, State.conciliadoPeriodo, credito);
        this.renderConciliadoTable();
        this.showToast('Crédito tributario guardado', 'success');
    },

    exportConciliadoPDF() {
        const now    = new Date();
        const client = (Store.get('clientes') || []).find(c => c.id === State.currentClientId);
        const credito = parseFloat(document.getElementById('con-credito')?.value) || 0;

        // Recalcular datos iguales a renderConciliadoTable
        const MESES  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const all    = Store.get('sri_registros').filter(r => r.clientId === State.currentClientId);

        const mesesEnRango = [];
        if (State.conciliadoPeriodo === 0) {
            for (let m = 1; m <= 12; m++) {
                mesesEnRango.push({ mes: m, anio: State.conciliadoAnio });
            }
        } else {
            mesesEnRango.push({ mes: State.conciliadoPeriodo, anio: State.conciliadoAnio });
        }

        let sumVS15=0,sumVIva=0,sumVTot=0,sumCS15=0,sumCS5=0,sumCS0=0,sumCIva15=0,sumCIva5=0,sumCTot=0;
        const fmt = n => (n||0).toFixed(2);

        const rowsHTML = mesesEnRango.map(({mes, anio}) => {
            const V = all.filter(r => r.tipo==='venta'  && !r.anulada && r.mes===mes && r.anio===anio);
            const C = all.filter(r => r.tipo==='compra' && r.mes===mes && r.anio===anio);
            const vS15=V.reduce((s,r)=>s+(r.subt15||0),0), vIva=V.reduce((s,r)=>s+(r.iva||0),0), vTot=V.reduce((s,r)=>s+(r.total||0),0);
            const cS15=C.reduce((s,r)=>s+(r.subt15||0),0), cS5=C.reduce((s,r)=>s+(r.subt5||0),0), cS0=C.reduce((s,r)=>s+(r.subt0||0),0);
            const cIva15=cS15*0.15, cIva5=cS5*0.05, cTot=C.reduce((s,r)=>s+(r.total||0),0);
            sumVS15+=vS15;sumVIva+=vIva;sumVTot+=vTot;
            sumCS15+=cS15;sumCS5+=cS5;sumCS0+=cS0;sumCIva15+=cIva15;sumCIva5+=cIva5;sumCTot+=cTot;
            const e = !vS15&&!vIva&&!vTot&&!cS15&&!cS5&&!cS0&&!cTot;
            return `<tr style="${e?'opacity:0.38;':''}">
                <td class="mc">${MESES[mes-1]}</td>
                <td>${fmt(vS15)}</td><td class="iv">${fmt(vIva)}</td><td class="b">${fmt(vTot)}</td>
                <td>${fmt(cS15)}</td><td>${fmt(cS5)}</td><td>${fmt(cS0)}</td>
                <td class="ic">${fmt(cIva15)}</td><td class="ic">${fmt(cIva5)}</td><td class="b">${fmt(cTot)}</td>
            </tr>`;
        }).join('');

        const bal   = sumVIva - (sumCIva15+sumCIva5) - credito;
        const bLbl  = bal >= 0 ? 'A FAVOR' : 'A PAGAR';
        const bCls  = bal >= 0 ? 'color:#065f46;background:#d1fae5;border:1.5px solid #10b981;' : 'color:#991b1b;background:#fee2e2;border:1.5px solid #ef4444;';
        
        let per = `Año ${State.conciliadoAnio}`;
        if (State.conciliadoPeriodo !== 0) {
            per = `${MESES[State.conciliadoPeriodo - 1]} ${State.conciliadoAnio}`;
        }
        
        const fgen  = now.toLocaleDateString('es-EC',{day:'2-digit',month:'long',year:'numeric'});
        const hora  = now.toLocaleTimeString('es-EC',{hour:'2-digit',minute:'2-digit'});

        const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Conciliado - ${client?.name||''}</title>
<style>
@page{size:A4 landscape;margin:10mm 12mm;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:9pt;background:#fff;color:#1a1a2e;width:100%;}
.hdr{background:linear-gradient(135deg,#1e0533 0%,#3b0764 100%);color:#fff;padding:14px 20px;display:flex;justify-content:space-between;align-items:center;border-radius:6px 6px 0 0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.hdr .brand{font-size:15pt;font-weight:900;letter-spacing:2px;}
.hdr .sub{font-size:6.5pt;color:rgba(255,255,255,0.65);margin-top:2px;}
.hdr .meta-t{font-size:10pt;font-weight:800;text-align:right;}
.hdr .meta-i{font-size:6.5pt;color:rgba(255,255,255,0.7);text-align:right;line-height:1.7;}
.cband{background:#7c3aed;color:#fff;padding:8px 20px;display:flex;justify-content:space-between;align-items:center;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.cband .cn{font-size:10pt;font-weight:800;}
.cband .cm{font-size:6.5pt;color:rgba(255,255,255,0.82);margin-top:2px;}
.ttl{text-align:center;font-size:10.5pt;font-weight:900;letter-spacing:2px;color:#3b0764;margin:10px 0 8px;text-transform:uppercase;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
table{width:100%;border-collapse:collapse;table-layout:fixed;}
th{padding:5px 4px;font-size:6pt;font-weight:800;letter-spacing:0.3px;text-transform:uppercase;text-align:center;border:0.5px solid #ccc;white-space:nowrap;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
th.hm{background:#f3e8ff;color:#5b21b6;text-align:left;width:88px;}
th.hv{background:#d1fae5;color:#065f46;}
th.hc{background:#fee2e2;color:#991b1b;}
td{padding:4px 6px;font-size:7.5pt;border:0.5px solid #e5e7eb;text-align:right;font-family:'Courier New',monospace;white-space:nowrap;}
td.mc{text-align:left;font-family:'Segoe UI',Arial,sans-serif;font-weight:600;background:#faf5ff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
td.iv{color:#065f46;font-weight:700;}td.ic{color:#991b1b;font-weight:700;}td.b{font-weight:800;}
tr.sum td{font-weight:900;background:#ede9fe;border-top:2px solid #7c3aed;color:#1e0533;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
tr.sum td.mc{color:#7c3aed;font-size:7pt;letter-spacing:1px;text-transform:uppercase;}
.ftr{margin-top:10px;display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#faf5ff;border:1px solid #ddd6fe;border-radius:6px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.lbl{font-size:6pt;font-weight:800;letter-spacing:0.5px;color:#6b7280;text-transform:uppercase;margin-bottom:3px;}
.cval{font-size:10pt;font-weight:900;font-family:'Courier New',monospace;color:#1a1a2e;}
.pill{display:inline-block;padding:5px 16px;border-radius:20px;font-weight:800;font-size:9.5pt;font-family:'Courier New',monospace;}
.pgf{margin-top:12px;padding-top:7px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:6.5pt;color:#9ca3af;}
</style></head><body>
<div class="hdr">
  <div><div class="brand">JF SYSTEM</div><div class="sub">Sistema de Gestión Contable</div></div>
  <div><div class="meta-t">REPORTE CONCILIADO</div><div class="meta-i">Período: ${per}<br>Generado: ${fgen}</div></div>
</div>
<div class="cband">
  <div><div class="cn">${client?.name||'—'}</div><div class="cm">RUC: ${client?.ruc||'—'} &nbsp;|&nbsp; Régimen: ${client?.regime||'—'}</div></div>
  <div style="font-size:6.5pt;color:rgba(255,255,255,0.82);">Forma: ${client?.frecuencia||'—'}</div>
</div>
<div class="ttl">Conciliado Tributario</div>
<table>
  <thead>
    <tr>
      <th class="hm" rowspan="2">Mes</th>
      <th class="hv" colspan="3">VENTAS</th>
      <th class="hc" colspan="6">COMPRAS</th>
    </tr>
    <tr>
      <th class="hv">Sub.15%</th><th class="hv">IVA 15%</th><th class="hv">Total</th>
      <th class="hc">Sub.15%</th><th class="hc">Sub.5%</th><th class="hc">Sub.0%</th>
      <th class="hc">IVA 15%</th><th class="hc">IVA 5%</th><th class="hc">Total</th>
    </tr>
  </thead>
  <tbody>${rowsHTML}</tbody>
  <tfoot>
    <tr class="sum">
      <td class="mc">SUMAN</td>
      <td>${fmt(sumVS15)}</td><td class="iv">${fmt(sumVIva)}</td><td class="b">${fmt(sumVTot)}</td>
      <td>${fmt(sumCS15)}</td><td>${fmt(sumCS5)}</td><td>${fmt(sumCS0)}</td>
      <td class="ic">${fmt(sumCIva15)}</td><td class="ic">${fmt(sumCIva5)}</td><td class="b">${fmt(sumCTot)}</td>
    </tr>
  </tfoot>
</table>
<div class="ftr">
  <div><div class="lbl">Crédito Tributario (arrastre)</div><div class="cval">$ ${fmt(credito)}</div></div>
  <div><div class="lbl">Balance IVA del Período</div>
       <span class="pill" style="${bCls}">${bLbl}: $${Math.abs(bal).toFixed(2)}</span></div>
  <div style="text-align:right;"><div class="lbl">IVA Ventas</div><div class="cval">$ ${fmt(sumVIva)}</div></div>
  <div style="text-align:right;"><div class="lbl">IVA Compras</div><div class="cval">$ ${fmt(sumCIva15+sumCIva5)}</div></div>
</div>
<div class="pgf">
  <span>JF SYSTEM — Sistema de Gestión Contable — Documento confidencial</span>
  <span>Generado el ${fgen} a las ${hora}</span>
</div>
</body></html>`;

        const pw = window.open('', '_blank', 'width=1100,height=750');
        if (!pw) { this.showToast('Permite ventanas emergentes para exportar PDF', 'warning'); return; }
        pw.document.write(html);
        pw.document.close();
        pw.focus();
        pw.addEventListener('afterprint', () => pw.close());
        setTimeout(() => pw.print(), 350);
    },

    // --- Client Handlers ---

    toggleClientForm(show) {
        State.showClientForm = show;
        if (!show) State.clientEditingId = null;
        this.render();
    },

    editClient(id) {
        if (!id) return;
        State.clientEditingId = id;
        State.showClientForm = true;
        console.log('[editClient] Editando cliente ID:', id);
        this.render();
    },

    setClientSearch(query) {
        State.clientSearch = query;
        this.renderClientsTable();
        // Mantener el foco en el input después del re-render de tabla
        const input = document.getElementById('client-search-input');
        if (input && document.activeElement !== input) input.focus();
        // Actualizar botón limpiador dinámicamente
        const wrapper = input ? input.parentElement : null;
        if (wrapper) {
            const existingBtn = wrapper.querySelector('button');
            if (query && !existingBtn) {
                const btn = document.createElement('button');
                btn.innerHTML = Icons.close();
                btn.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;opacity:0.5;display:flex;align-items:center;color:var(--text-primary);';
                btn.onclick = () => App.setClientSearch('');
                wrapper.appendChild(btn);
            } else if (!query && existingBtn) {
                existingBtn.remove();
            }
        }
    },

    setMatrizSearch(query) {
        State.matrizSearch = query;
        this.renderMatrizTable();
        const input = document.getElementById('matriz-search-input');
        if (input && document.activeElement !== input) input.focus();
        const wrapper = input ? input.parentElement : null;
        if (wrapper) {
            const existingBtn = wrapper.querySelector('button');
            if (query && !existingBtn) {
                const btn = document.createElement('button');
                btn.innerHTML = Icons.close();
                btn.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;opacity:0.5;display:flex;align-items:center;color:var(--text-primary);';
                btn.onclick = () => App.setMatrizSearch('');
                wrapper.appendChild(btn);
            } else if (!query && existingBtn) {
                existingBtn.remove();
            }
        }
    },

    calculateDeclarationDay(ruc) {
        if (!ruc || ruc.length < 9) return null;
        const novenoDigito = parseInt(ruc.charAt(8));
        if (isNaN(novenoDigito)) return null;
        
        // SRI Rules for maximum declaration day based on 9th digit
        const dias = { 1: 10, 2: 12, 3: 14, 4: 16, 5: 18, 6: 20, 7: 22, 8: 24, 9: 26, 0: 28 };
        return dias[novenoDigito] || null;
    },

    async handleClientSubmit(e) {
        e.preventDefault();

        // Capturar el ID INMEDIATAMENTE antes de cualquier operación async
        // para evitar que renders intermedios del listener de Firestore lo afecten
        const editingId = State.clientEditingId;
        const isEditing = !!editingId;
        const docId = editingId || ('client_' + Date.now());

        console.log('[handleClientSubmit] Modo:', isEditing ? 'EDITAR' : 'NUEVO', '| ID:', docId);

        const ruc = document.getElementById('client-ruc').value.trim();
        const diaDeclaracion = this.calculateDeclarationDay(ruc);

        const data = {
            id: docId,
            name: document.getElementById('client-name').value.trim(),
            ruc: ruc,
            regime: document.getElementById('client-regime').value,
            frecuencia: document.getElementById('client-frecuencia').value,
            claveSRI: document.getElementById('client-clave-sri').value,
            novenoDigito: ruc.length >= 9 ? ruc.charAt(8) : null,
            diaMaximo: diaDeclaracion,
            // Obligaciones tributarias
            oblSuperCia: document.getElementById('client-super-cia').value,
            oblIVA:      document.getElementById('client-iva').value,
            oblRenta:    document.getElementById('client-renta').value,
            oblATS:      document.getElementById('client-ats').value,
            oblADI:      document.getElementById('client-adi').value,
            oblGP:       document.getElementById('client-gp').value,
            oblRebefics: document.getElementById('client-rebefics').value,
            updatedAt: new Date().toISOString()
        };

        // Si es nuevo, añadir fecha de creación
        if (!isEditing) {
            data.createdAt = new Date().toISOString();
        }

        try {
            await Store.saveClient(data, isEditing);
            State.showClientForm = false;
            State.clientEditingId = null;
            this.showToast(isEditing ? 'Cliente actualizado correctamente' : 'Cliente registrado correctamente', 'success');
            this.render(); // Forzar re-render para cerrar el formulario
        } catch (err) {
            console.error("Error al guardar cliente:", err);
            this.showToast('Error al guardar cliente', 'danger');
        }
    },

    renderClientsTable() {
        const tbody = document.getElementById('clients-table-body');
        if (!tbody) return;
        const allClients = Store.get('clientes') || [];

        // Filtro de búsqueda
        const q = (State.clientSearch || '').toLowerCase().trim();
        const clients = q
            ? allClients.filter(c =>
                (c.name || '').toLowerCase().includes(q) ||
                (c.ruc  || '').toLowerCase().includes(q)
              )
            : allClients;

        // Actualizar contador
        const counter = document.getElementById('clients-search-count');
        if (counter) {
            counter.textContent = q
                ? `Mostrando ${clients.length} de ${allClients.length} cliente${allClients.length !== 1 ? 's' : ''}`
                : allClients.length > 0 ? `${allClients.length} cliente${allClients.length !== 1 ? 's' : ''} en total` : '';
        }

        if (allClients.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="border: none; padding: 0;">
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptyClients()}</div>
                    <div class="empty-state-title">No tienes clientes registrados</div>
                    <div class="empty-state-desc">Comienza agregando tu primer cliente para gestionar sus declaraciones y reportes.</div>
                </div>
            </td></tr>`;
            return;
        }

        if (clients.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="border: none; padding: 0;">
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptySearch()}</div>
                    <div class="empty-state-title">Sin coincidencias</div>
                    <div class="empty-state-desc">No se encontró ningún cliente con «${this.escapeHTML(q)}». Intenta con otro nombre o RUC.</div>
                </div>
            </td></tr>`;
            return;
        }
        
        const today = new Date();
        const statusDot = (expiresStr) => {
            if (!expiresStr) return `<span title="Sin datos" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:rgba(150,150,150,0.35);"></span>`;
            const diff = Math.ceil((new Date(expiresStr) - today) / 86400000);
            const color = diff < 0 ? 'var(--danger)' : diff <= 30 ? 'var(--warning)' : 'var(--success)';
            const label = diff < 0 ? 'Vencida' : `${diff}d restantes`;
            return `<span title="${label}" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${color};box-shadow:0 0 5px ${color};"></span>`;
        };

        tbody.innerHTML = clients.map(c => `
            <tr>
                <td style="font-weight: 600;">${this.escapeHTML(c.name)}</td>
                <td>${this.escapeHTML(c.ruc)}</td>
                <td><span class="badge" style="background: rgba(var(--primary-rgb), 0.1); color: var(--primary); padding: 4px 8px; border-radius: 4px;">${this.escapeHTML(c.regime)}</span></td>
                <td><span class="badge" style="background: rgba(100, 100, 100, 0.1); color: var(--text-secondary); padding: 4px 8px; border-radius: 4px;">${this.escapeHTML(c.frecuencia || 'Mensual')}</span></td>
                <td style="font-weight: bold; font-family: var(--font-mono);">${c.diaMaximo || '-'}</td>
                <td style="text-align:center;">${statusDot(c.firmaCaduca)}</td>
                <td style="text-align:center;">${statusDot(c.factCaduca)}</td>
                <td style="display: flex; gap: 8px;">
                    <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.8rem; display:inline-flex;align-items:center;gap:6px;" onclick="App.openFicha('${c.id}')">${Icons.ficha()} Ver Ficha</button>
                    <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="App.selectClient('${c.id}')">Gestionar SRI</button>
                    ${State.currentUser && State.currentUser.role === 'admin' ? `
                    <button class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.8rem; display:inline-flex;align-items:center;justify-content:center;" onclick="App.editClient('${c.id}')">${Icons.edit()}</button>
                    ` : ''}
                </td>
            </tr>
        `).join('');

    },

    // Inicializa un listener de Firestore para los registros SRI del mes actual
    // Esto es necesario porque sriRegistros solo se carga por cliente (lazy loading)
    // y la Matriz necesita saber quién declaró en el mes actual para TODOS los clientes.
    initMatrizListener() {
        // Limpiar listener anterior si existía (ej: al navegar de vuelta a la Matriz)
        if (State.matrizSriListener) {
            State.matrizSriListener();
            State.matrizSriListener = null;
        }

        const hoy = new Date();
        const mesAnioActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;

        // Query: solo los registros del mes en curso (YYYY-MM).
        // Usa >= y < para aprovechar el índice de Firestore sin leer todo el historial.
        const inicio = `${mesAnioActual}-01`;
        const fin    = `${mesAnioActual}-31`; // Firestore devuelve ≤ esta fecha

        State.matrizSriListener = db.collection('sri_registros')
            .where('fecha', '>=', inicio)
            .where('fecha', '<=', fin)
            .onSnapshot((snapshot) => {
                // Construir Set de clientIds que ya tienen registro este mes
                State.matrizClientesMesActual = new Set(
                    snapshot.docs.map(doc => doc.data().clientId).filter(Boolean)
                );
                // Re-renderizar la tabla con los datos actualizados
                this.renderMatrizTable();
            }, (err) => {
                console.error('Error en listener de Matriz (mes actual):', err);
                // Aun así renderizar con datos vacíos (sin crash)
                State.matrizClientesMesActual = new Set();
                this.renderMatrizTable();
            });
    },

    renderMatrizTable() {

        const tbody = document.getElementById('matriz-table-body');
        if (!tbody) return;
        const allClients = Store.get('clientes') || [];

        // Filtro de búsqueda
        const q = (State.matrizSearch || '').toLowerCase().trim();
        const clients = q
            ? allClients.filter(c =>
                (c.name || '').toLowerCase().includes(q) ||
                (c.ruc  || '').toLowerCase().includes(q)
              )
            : allClients;

        // Actualizar contador
        const counter = document.getElementById('matriz-search-count');
        if (counter) {
            counter.textContent = q
                ? `Mostrando ${clients.length} de ${allClients.length} cliente${allClients.length !== 1 ? 's' : ''}`
                : allClients.length > 0 ? `${allClients.length} cliente${allClients.length !== 1 ? 's' : ''} en total` : '';
        }

        if (allClients.length === 0) {
            tbody.innerHTML = `<tr><td colspan="14" style="border: none; padding: 0;">
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptyMatriz()}</div>
                    <div class="empty-state-title">No hay clientes</div>
                    <div class="empty-state-desc">Registra clientes para ver la matriz de control tributario.</div>
                </div>
            </td></tr>`;
            return;
        }

        if (clients.length === 0) {
            tbody.innerHTML = `<tr><td colspan="14" style="border: none; padding: 0;">
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptySearch()}</div>
                    <div class="empty-state-title">Sin coincidencias</div>
                    <div class="empty-state-desc">No se encontró ningún cliente con «${this.escapeHTML(q)}».</div>
                </div>
            </td></tr>`;
            return;
        }

        const hoy = new Date();
        const diaActual = hoy.getDate();

        // Usar el Set pre-calculado por initMatrizListener (cargado desde Firestore)
        const clientesConRegistroMesActual = State.matrizClientesMesActual || new Set();
        
        tbody.innerHTML = clients.map(c => {
            const diaMax = parseInt(c.diaMaximo) || 0;

            // ── 1. Calcular nivel de alerta por DECLARACIÓN SRI ──────────────────
            // Niveles: 0=gris, 1=verde, 2=amarillo, 3=rojo
            let sriLevel = 0;
            let sriMsg   = 'Sin día máximo configurado';

            if (diaMax > 0) {
                if (clientesConRegistroMesActual.has(c.id)) {
                    sriLevel = 1;
                    sriMsg   = 'Declaración SRI: al día ✓';
                } else {
                    const diff = diaMax - diaActual;
                    if (diff < 0) {
                        sriLevel = 3;
                        sriMsg   = `Declaración SRI: vencida (debió declarar el día ${diaMax})`;
                    } else if (diff <= 5) {
                        sriLevel = 2;
                        sriMsg   = `Declaración SRI: próxima (día ${diaMax}, faltan ${diff} día${diff !== 1 ? 's' : ''})`;
                    } else {
                        sriLevel = 1;
                        sriMsg   = `Declaración SRI: a tiempo (día máx. ${diaMax}, faltan ${diff} días)`;
                    }
                }
            }

            // ── 2. Calcular nivel de alerta por FIRMA DIGITAL ────────────────────
            let firmaLevel = 0;
            let firmaMsg   = 'Firma digital: no registrada';
            let firmaHtml  = c.firmaExpira
                ? this.escapeHTML(c.firmaExpira)
                : '<span style="color: var(--text-secondary);">-</span>';

            if (c.firmaExpira) {
                const parts = c.firmaExpira.split('-'); // YYYY-MM-DD
                if (parts.length === 3) {
                    const fExpira = new Date(parts[0], parts[1] - 1, parts[2]);
                    const daysToExpire = Math.ceil((fExpira - hoy) / (1000 * 60 * 60 * 24));
                    if (daysToExpire < 0) {
                        firmaLevel = 3;
                        firmaMsg   = `Firma digital: vencida el ${this.escapeHTML(c.firmaExpira)}`;
                        firmaHtml  = `<span style="display:inline-flex;align-items:center;gap:4px;color: var(--danger); font-weight: 600;">${Icons.warn()} Vencida (${this.escapeHTML(c.firmaExpira)})</span>`;
                    } else if (daysToExpire <= 30) {
                        firmaLevel = 2;
                        firmaMsg   = `Firma digital: expira en ${daysToExpire} días (${this.escapeHTML(c.firmaExpira)})`;
                        firmaHtml  = `<span style="display:inline-flex;align-items:center;gap:4px;color: var(--warning); font-weight: 600;">${Icons.warn()} Expira pronto (${this.escapeHTML(c.firmaExpira)})</span>`;
                    } else {
                        firmaLevel = 1;
                        firmaMsg   = `Firma digital: vigente hasta ${this.escapeHTML(c.firmaExpira)}`;
                    }
                }
            }

            // ── 3. Indicador combinado: tomar el PEOR nivel ─────────────────────
            const worstLevel = Math.max(sriLevel, firmaLevel);
            const levelMap = {
                0: { color: 'var(--border-color)', label: 'Sin datos' },
                1: { color: 'var(--success)',      label: 'A tiempo'  },
                2: { color: 'var(--warning)',       label: 'Atención'  },
                3: { color: 'var(--danger)',        label: 'Vencido'   }
            };
            const { color: statusColor } = levelMap[worstLevel];
            // Tooltip con ambas líneas de estado
            const statusTitle = [sriMsg, firmaMsg].join('\n');

            return `
            <tr>
                <td style="text-align: center; vertical-align: middle;">
                    <div title="${statusTitle}" style="width: 14px; height: 14px; border-radius: 50%; background: ${statusColor}; margin: 0 auto; box-shadow: 0 0 5px ${statusColor};"></div>
                </td>
                <td style="font-weight: 600;">${this.escapeHTML(c.name)}</td>
                <td style="font-family: var(--font-mono); font-size: 0.9rem;">${this.escapeHTML(c.ruc)}</td>
                <td><span class="badge" style="background: rgba(var(--primary-rgb), 0.1); color: var(--primary); padding: 4px 8px; border-radius: 4px;">${this.escapeHTML(c.regime || c.frecuencia || 'General')}</span></td>
                <td style="text-align: center; font-weight: bold; font-family: var(--font-mono);">${diaMax || '-'}</td>
                <td style="text-align: center; font-family: var(--font-mono); font-size: 0.9rem;">${firmaHtml}</td>
                ${['oblSuperCia','oblIVA','oblRenta','oblATS','oblADI','oblGP','oblRebefics'].map(k => {
                    const v = c[k] || 'No';
                    const color = v === 'Si' ? 'var(--success)' : 'rgba(150,150,150,0.25)';
                    const textColor = v === 'Si' ? 'var(--success)' : 'var(--text-secondary)';
                    return `<td style="text-align:center; overflow:hidden;"><span style="font-size:0.7rem; font-weight:700; padding: 2px 5px; border-radius: 8px; background: ${color}20; color: ${textColor}; white-space: nowrap; display:inline-block;">${v}</span></td>`;
                }).join('')}
                <td style="text-align: center; vertical-align: middle;">
                    <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="App.navigate('sri', true); App.selectClient('${c.id}')">Ir a SRI</button>
                </td>
            </tr>
            `;
        }).join('');
    },

    // --- User Handlers ---
    async handleUserSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('user-email').value.trim().toLowerCase();
        const role = document.getElementById('user-role').value;
        
        const data = {
            id: email, // Usamos el email como ID
            email: email,
            role: role,
            createdAt: new Date().toISOString()
        };

        try {
            await Store.saveUser(data);
            this.showToast('Usuario autorizado', 'success');
            e.target.reset();
        } catch (err) {
            this.showToast('Error: ' + err.message, 'danger');
        }
    },

    renderUsersList() {
        const container = document.getElementById('users-list');
        if (!container) return;
        const users = Store.get('usuarios') || [];
        const currentUser = State.currentUser;

        if (users.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">${Icons.emptyUsers()}</div>
                    <div class="empty-state-title">Sin usuarios adicionales</div>
                    <div class="empty-state-desc">Actualmente eres la única persona con acceso al sistema.</div>
                </div>
            `;
            return;
        }

        container.innerHTML = users.map(u => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; background:rgba(var(--primary-rgb), 0.05); border-radius:12px; border: 1px solid rgba(var(--primary-rgb), 0.1);">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:var(--primary); display:flex; align-items:center; justify-content:center; color:white; font-size:0.8rem; font-weight:700;">
                        ${(u.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div style="font-weight:600; font-size:0.9rem;">${u.email}</div>
                        <div style="font-size:0.7rem; opacity:0.6;">ID: ${u.id.substring(0,8)}...</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <select onchange="App.changeUserRole('${u.id}', this.value)" style="font-size:0.75rem; padding:4px 8px; border-radius:4px; background:var(--bg-card); color:var(--text-main);">
                        <option value="lector" ${u.role === 'lector' ? 'selected' : ''}>Lector</option>
                        <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                    ${u.email !== currentUser.email ? `
                        <button class="btn-icon" onclick="App.deleteUser('${u.id}')" style="color:var(--danger);display:flex;align-items:center;justify-content:center;width:30px;height:30px;">${Icons.trash()}</button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    },

    async changeUserRole(id, newRole) {
        try {
            await Store.updateUserRole(id, newRole);
            this.showToast('Rol actualizado', 'success');
        } catch (err) {
            this.showToast('Error al actualizar rol', 'danger');
        }
    },

    async deleteUser(id) {
        if (!(await this.confirmDialog({ 
            title: '¿Eliminar Usuario?', 
            message: 'El usuario perderá el acceso al sistema de forma inmediata.' 
        }))) return;
        await Store.deleteUser(id);
        this.showToast('Usuario eliminado', 'warning');
    },

    exportMasterExcel() {
        const clients = Store.get('clientes') || [];
        const registros = Store.get('sri_registros') || [];
        const start = document.getElementById('report-start')?.value;
        const end = document.getElementById('report-end')?.value;
        
        const data = clients.map(c => {
            let clientRegs = registros.filter(r => r.clientId === c.id);
            
            if(start) clientRegs = clientRegs.filter(r => r.fecha >= start);
            if(end) clientRegs = clientRegs.filter(r => r.fecha <= end);
            
            const totals = clientRegs.reduce((acc, r) => {
                acc.sales += (r.v_sub15 || 0) + (r.v_sub5 || 0) + (r.v_sub0 || 0);
                acc.purchases += (r.c_sub15 || 0) + (r.c_sub5 || 0) + (r.c_sub0 || 0);
                acc.v_iva += (r.v_iva || 0);
                acc.c_iva += (r.c_iva || 0);
                return acc;
            }, { sales: 0, purchases: 0, v_iva: 0, c_iva: 0 });

            return {
                'Cliente': c.name,
                'RUC': c.ruc,
                'Régimen': c.regime,
                'Ventas Totales': totals.sales,
                'IVA Ventas': totals.v_iva,
                'Compras Totales': totals.purchases,
                'IVA Compras': totals.c_iva,
                'Registros en Periodo': clientRegs.length
            };
        });

        if (data.length === 0) {
            this.showToast('No hay datos para exportar', 'warning');
            return;
        }

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte Global");
        
        const filename = `Reporte_Global_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, filename);
        this.showToast('Reporte generado correctamente', 'success');
    },

    // --- Utilities ---
    async confirmDialog(options = {}) {
        const { title = '¿Estás seguro?', message = 'Esta acción no se puede deshacer.', type = 'danger', confirmText = 'Eliminar', cancelText = 'Cancelar' } = options;
        
        return new Promise((resolve) => {
            let overlay = document.getElementById('confirm-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'confirm-overlay';
                overlay.className = 'confirm-overlay';
                document.body.appendChild(overlay);
            }

            overlay.innerHTML = `
                <div class="confirm-card">
                    <div class="confirm-icon ${type === 'info' ? 'info' : ''}">
                        ${type === 'info' ? Icons.info(32) : Icons.trash(32)}
                    </div>
                    <h3 class="confirm-title">${title}</h3>
                    <p class="confirm-message">${message}</p>
                    <div class="confirm-actions">
                        <button class="btn btn-ghost" id="confirm-cancel-btn">${cancelText}</button>
                        <button class="btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}" id="confirm-ok-btn">${confirmText}</button>
                    </div>
                </div>
            `;

            const cleanUp = (result) => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.innerHTML = '';
                    resolve(result);
                }, 300);
            };

            // Force reflow
            overlay.offsetHeight;
            overlay.classList.add('active');

            document.getElementById('confirm-cancel-btn').onclick = () => cleanUp(false);
            document.getElementById('confirm-ok-btn').onclick = () => cleanUp(true);
            overlay.onclick = (e) => { if (e.target === overlay) cleanUp(false); };
        });
    },

    showToast(msg, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast premium-toast toast-${type} animate-slideInRight`;
        
        // Define dynamic icons based on type
        const icons = {
            success: '✅',
            danger: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        const icon = icons[type] || icons['info'];
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${icon}</span>
                <span class="toast-message">${this.escapeHTML(msg)}</span>
            </div>
            <div class="toast-progress-bar">
                <div class="toast-progress-value"></div>
            </div>
        `;
        
        container.appendChild(toast);
        
        // Setup removal
        const duration = 3000;
        const progressValue = toast.querySelector('.toast-progress-value');
        
        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                progressValue.style.transition = `width ${duration}ms linear`;
                progressValue.style.width = '0%';
            });
        });

        setTimeout(() => {
            toast.classList.replace('animate-slideInRight', 'animate-fadeOutRight');
            setTimeout(() => toast.remove(), 400); // Wait for fade out animation
        }, duration);
    },

    initDashboardChart() {
        const ctx = document.getElementById('dashboardChart')?.getContext('2d');
        if (!ctx) return;

        const meta = Store.get('dashboardMeta') || { totalRegistros: 0, mensual: {}, clientes: {} };
        
        // Group by month
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const dataMap = {};

        // Last 6 months
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            
            // Extraemos los datos pre-calculados del metadata
            const monthMeta = meta.mensual[key] || { sales: 0, purchases: 0 };
            
            dataMap[key] = { 
                label: `${months[d.getMonth()]}`, 
                sales: monthMeta.sales || 0, 
                purchases: monthMeta.purchases || 0 
            };
        }

        const labels = Object.values(dataMap).map(v => v.label);
        const salesData = Object.values(dataMap).map(v => v.sales);
        const purchaseData = Object.values(dataMap).map(v => v.purchases);

        // Theme-aware colors
        const isDark = State.theme === 'dark';
        const primaryColor = '#3b82f6'; // Fallback
        const dangerColor = '#ef4444'; // Fallback

        if (this.currentChart) this.currentChart.destroy();

        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ventas',
                        data: salesData,
                        borderColor: primaryColor,
                        backgroundColor: primaryColor + '20',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: primaryColor
                    },
                    {
                        label: 'Compras',
                        data: purchaseData,
                        borderColor: dangerColor,
                        backgroundColor: dangerColor + '20',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: dangerColor
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { 
                            color: isDark ? '#ffffff' : '#1e293b',
                            font: { family: 'Inter', weight: '600' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleFont: { family: 'Inter' },
                        bodyFont: { family: 'Inter' },
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            color: isDark ? 'rgba(255,255,255,0.6)' : '#64748b',
                            callback: (value) => '$' + value.toLocaleString()
                        },
                        grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        ticks: { color: isDark ? 'rgba(255,255,255,0.6)' : '#64748b' },
                        grid: { display: false }
                    }
                }
            }
        });
    },

    // ─── FICHA DE CLIENTE ─────────────────────────────────────────────────────────
    openFicha(clientId) {
        State.currentFichaClientId = clientId;
        State.fichaEditingSection = null;
        State.showClientForm = false;  // Cerrar cualquier formulario abierto
        this.render();
    },

    closeFicha() {
        State.currentFichaClientId = null;
        State.fichaEditingSection = null;
        this.render();
    },

    setFichaSection(section) {
        State.fichaEditingSection = section;
        this.render();
    },

    async handleFichaSRISubmit(e) {
        e.preventDefault();
        const c = Store.get('clientes').find(cl => cl.id === State.currentFichaClientId);
        if (!c) return;
        const ruc = document.getElementById('fich-ruc').value.trim();
        const ninth = ruc.length >= 9 ? ruc.charAt(8) : null;
        const dias = { '1':10,'2':10,'3':10,'4':16,'5':16,'6':16,'7':22,'8':22,'9':22,'0':28 };
        const diaMax = ninth ? (dias[ninth] || null) : null;
        const updates = {
            name: document.getElementById('fich-name').value.trim(),
            ruc, regime: document.getElementById('fich-regime').value,
            frecuencia: document.getElementById('fich-frecuencia').value,
            claveSRI: document.getElementById('fich-clave-sri').value,
            novenoDigito: ninth, diaMaximo: diaMax,
            oblSuperCia: document.getElementById('fich-super-cia').value,
            oblIVA:      document.getElementById('fich-iva').value,
            oblRenta:    document.getElementById('fich-renta').value,
            oblATS:      document.getElementById('fich-ats').value,
            oblADI:      document.getElementById('fich-adi').value,
            oblGP:       document.getElementById('fich-gp').value,
            oblRebefics: document.getElementById('fich-rebefics').value,
            updatedAt: new Date().toISOString()
        };
        try {
            await Store.saveClient({ ...c, ...updates }, true);
            State.fichaEditingSection = null;
            this.showToast('✅ Datos SRI guardados', 'success');
            this.render();
        } catch (err) { this.showToast('Error: ' + err.message, 'danger'); }
    },

    async handleFichaFacturacionSubmit(e) {
        e.preventDefault();
        const c = Store.get('clientes').find(cl => cl.id === State.currentFichaClientId);
        if (!c) return;
        const updates = {
            factUsuario: document.getElementById('fact-usuario').value.trim(),
            factClave:   document.getElementById('fact-clave').value,
            factNumComp: document.getElementById('fact-num-comp').value.trim(),
            factEmitido: document.getElementById('fact-emitido').value,
            factCaduca:  document.getElementById('fact-caduca').value,
            updatedAt: new Date().toISOString()
        };
        try {
            await Store.saveClient({ ...c, ...updates }, true);
            State.fichaEditingSection = null;
            this.showToast('✅ Facturación guardada', 'success');
            this.render();
        } catch (err) { this.showToast('Error: ' + err.message, 'danger'); }
    },

    async handleFichaFirmaSubmit(e) {
        e.preventDefault();
        const c = Store.get('clientes').find(cl => cl.id === State.currentFichaClientId);
        if (!c) return;
        const updates = {
            firmaUsuario: document.getElementById('firma-usuario').value.trim(),
            firmaClave:   document.getElementById('firma-clave').value,
            firmaEmision: document.getElementById('firma-emision').value,
            firmaCaduca:  document.getElementById('firma-caduca').value,
            firmaTiempo:  document.getElementById('firma-tiempo').value,
            updatedAt: new Date().toISOString()
        };
        try {
            await Store.saveClient({ ...c, ...updates }, true);
            State.fichaEditingSection = null;
            this.showToast('✅ Firma Digital guardada', 'success');
            this.render();
        } catch (err) { this.showToast('Error: ' + err.message, 'danger'); }
    },

    // ─── CENTRO DE REPORTES PREMIUM ──────────────────────────────────────────────
    openReportModal() {
        if (document.getElementById('report-modal-root')) return;
        const modalContainer = document.createElement('div');
        modalContainer.id = 'report-modal-root';
        modalContainer.innerHTML = Views.reportModal();
        document.body.appendChild(modalContainer);
        
        // Default dates: this month
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        document.getElementById('report-date-start').value = start.toISOString().split('T')[0];
        document.getElementById('report-date-end').value = end.toISOString().split('T')[0];
    },

    closeReportModal() {
        const modal = document.getElementById('report-modal-root');
        if (modal) {
            modal.querySelector('.confirm-overlay').classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        State.reportSelectedClientId = null;
    },

    filterReportClients(query) {
        const list = document.getElementById('report-client-list');
        if (!query || query.length < 2) {
            list.style.display = 'none';
            return;
        }
        
        const clients = Store.get('clientes').filter(c => 
            c.name.toLowerCase().includes(query.toLowerCase()) || 
            c.ruc.includes(query)
        ).slice(0, 5);
        
        if (clients.length === 0) {
            list.innerHTML = `<li style="text-align:center; color:var(--text-secondary); pointer-events:none;">No se encontraron clientes</li>`;
            list.style.display = 'block';
            return;
        }
        
        list.innerHTML = clients.map(c => `
            <li onclick="App.selectReportClient('${c.id}', '${c.name.replace(/'/g, "\\'")}')">
                <div style="font-weight:600;">${c.name}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${c.ruc}</div>
            </li>
        `).join('');
        list.style.display = 'block';
    },

    selectReportClient(id, name) {
        State.reportSelectedClientId = id;
        document.getElementById('report-client-search').value = '';
        document.getElementById('report-client-list').style.display = 'none';
        
        const badge = document.getElementById('report-selected-badge');
        const nameSpan = document.getElementById('report-selected-name');
        nameSpan.textContent = name;
        badge.style.display = 'flex';
        
        document.getElementById('report-client-search').parentElement.style.display = 'none';
    },

    clearReportClient() {
        State.reportSelectedClientId = null;
        document.getElementById('report-selected-badge').style.display = 'none';
        document.getElementById('report-client-search').parentElement.style.display = 'block';
        document.getElementById('report-client-search').focus();
    },

    setReportRange(range) {
        const startInput = document.getElementById('report-date-start');
        const endInput = document.getElementById('report-date-end');
        const now = new Date();
        let start, end;

        switch(range) {
            case 'thisMonth':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'lastMonth':
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            case 'thisYear':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31);
                break;
            case 'all':
                start = new Date(2020, 0, 1);
                end = new Date(now.getFullYear() + 1, 11, 31);
                break;
        }
        
        startInput.value = start.toISOString().split('T')[0];
        endInput.value = end.toISOString().split('T')[0];
    },

    async generatePremiumReport(targetName = null) {
        let clientId = State.reportSelectedClientId;
        let client = null;

        if (targetName) {
            client = Store.get('clientes').find(c => c.name.toLowerCase() === targetName.toLowerCase());
            if (!client) {
                this.showToast(`No se encontró ficha técnica para ${targetName}`, 'warning');
                return;
            }
            clientId = client.id;
        }

        if (!clientId) {
            this.showToast('⚠️ Por favor selecciona un cliente', 'warning');
            return;
        }

        // Use default dates if not in modal
        let start = document.getElementById('report-date-start')?.value;
        let end = document.getElementById('report-date-end')?.value;
        
        if (!start || !end) {
            const now = new Date();
            start = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]; // Year start
            end = now.toISOString().split('T')[0]; // Today
        }

        const opts = {
            charts: document.getElementById('report-opt-charts')?.checked ?? true,
            details: document.getElementById('report-opt-details')?.checked ?? true,
            bank: document.getElementById('report-opt-bank')?.checked ?? true,
            compact: document.getElementById('report-opt-compact')?.checked ?? false
        };

        const btn = document.getElementById('btn-generate-report');
        const originalText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = `<span class="spinner" style="border-top-color:white; width:16px; height:16px;"></span> Generando...`;
            btn.disabled = true;
        }

        try {
            this.showToast(`🚀 Compilando datos para ${targetName || 'cliente'}...`, 'info');
            
            if (!client) client = Store.get('clientes').find(c => c.id === clientId);
            if (!client) throw new Error('Cliente no encontrado en la base de datos');
            
            // 1. Obtener Cuentas por Cobrar (donde el cliente es el deudor)
            const cuentas = State.cuentasCobrarData.filter(r => 
                r.cliente.toLowerCase() === client.name.toLowerCase() && 
                r.fecha >= start && r.fecha <= end
            );

            // 2. Obtener Historial SRI (si tenemos acceso o cache)
            // Nota: El sistema carga SRI por cliente bajo demanda.
            // Para el reporte, intentaremos cargarlo si no está.
            let sriData = [];
            try {
                const snapshot = await firebase.firestore().collection("clientes").doc(clientId).collection("sri_registros")
                    .where("fecha", ">=", start)
                    .where("fecha", "<=", end)
                    .orderBy("fecha", "desc")
                    .get();
                sriData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (e) {
                console.warn("No se pudo obtener datos SRI detallados:", e);
            }

            if (cuentas.length === 0 && sriData.length === 0) {
                const ok = await this.confirmDialog({
                    title: 'Sin datos encontrados',
                    message: 'No existen registros de cuentas o SRI para este cliente en el rango seleccionado. ¿Deseas generar un reporte vacío con solo los datos generales?',
                    confirmText: 'Generar igual',
                    cancelText: 'Cancelar'
                });
                if (!ok) throw new Error('Operación cancelada');
            }

            // 3. Construir el HTML del reporte premium
            const reportHTML = this.buildPremiumReportHTML(client, cuentas, sriData, opts, start, end);
            
            // 4. Generar PDF con html2pdf
            const worker = html2pdf().from(reportHTML).set({
                margin: [5, 5, 5, 5], // Reduce margins to 5mm all around for better space usage
                filename: `Reporte_${client.name.replace(/\s+/g, '_')}_${start}_${end}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 3, // Higher scale for crisper text
                    useCORS: true, 
                    letterRendering: true,
                    scrollY: 0
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            });

            await worker.save();
            
            this.showToast('✅ Reporte generado y descargado', 'success');
            this.closeReportModal();

        } catch (err) {
            if (err.message !== 'Operación cancelada') {
                this.showToast('Error: ' + err.message, 'danger');
            }
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    buildPremiumReportHTML(client, accounts, sri, opts, start, end) {
        const now = new Date();
        const fgen = now.toLocaleDateString('es-EC', { day:'2-digit', month:'long', year:'numeric' });
        
        // Calcular totales
        const totalDeuda = accounts.reduce((s, r) => s + (r.montoTotal || 0), 0);
        const totalPendiente = accounts.reduce((s, r) => s + (r.pendiente || 0), 0);
        const totalPagado = totalDeuda - totalPendiente;

        // Extraer y aplanar todos los abonos (movimientos) de las cuentas
        const movimientos = [];
        accounts.forEach(acc => {
            if (acc.abonos && Array.isArray(acc.abonos)) {
                acc.abonos.forEach(ab => {
                    movimientos.push({
                        ...ab,
                        parentConcepto: acc.concepto || 'Abono a cuenta'
                    });
                });
            }
        });

        // Ordenar movimientos por fecha descendente
        movimientos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const formatFullDate = (isoStr) => {
            if (!isoStr) return '—';
            const d = new Date(isoStr);
            return d.toLocaleDateString('es-EC', { day:'2-digit', month:'2-digit', year:'numeric' }) + 
                   ' ' + d.toLocaleTimeString('es-EC', { hour:'2-digit', minute:'2-digit' });
        };

        const getMethodIcon = (metodo, banco) => {
            if (metodo === 'Transferencia') {
                return this.getBankLogoHTML(banco, 14);
            }
            return `<span style="color:#10b981; margin-right:5px; vertical-align:middle;">${Icons.cash(14)}</span>`;
        };

        return `
            <div style="font-family:'Inter', sans-serif; color:#1e293b; padding:5px 20px 20px 20px; background:white;">
                <!-- Header más compacto y arriba -->
                <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2px solid #8b5cf6; padding-bottom:10px; margin-bottom:20px;">
                    <div>
                        <h1 style="margin:0; color:#3b0764; font-size:22px; font-weight:800; letter-spacing:-0.5px;">JF SYSTEM</h1>
                        <p style="margin:0; font-size:9px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Reporte Financiero Consolidado</p>
                    </div>
                    <div style="text-align:right;">
                        <h2 style="margin:0; font-size:13px; color:#1e293b; font-weight:700;">${client.name}</h2>
                        <p style="margin:0; font-size:10px; color:#64748b;">RUC: ${client.ruc} | Generado: ${fgen}</p>
                    </div>
                </div>

                <!-- Resumen de Saldos -->
                <div style="background:#f8fafc; border-radius:10px; padding:15px; margin-bottom:20px; display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; border:1px solid #f1f5f9;">
                    <div style="text-align:center; border-right:1px solid #e2e8f0;">
                        <p style="margin:0; font-size:9px; color:#64748b; text-transform:uppercase; font-weight:600;">Total Facturado</p>
                        <h3 style="margin:4px 0 0 0; font-size:16px; color:#1e293b; font-weight:800;">$${totalDeuda.toFixed(2)}</h3>
                    </div>
                    <div style="text-align:center; border-right:1px solid #e2e8f0;">
                        <p style="margin:0; font-size:9px; color:#64748b; text-transform:uppercase; font-weight:600;">Total Pagado</p>
                        <h3 style="margin:4px 0 0 0; font-size:16px; color:#059669; font-weight:800;">$${totalPagado.toFixed(2)}</h3>
                    </div>
                    <div style="text-align:center;">
                        <p style="margin:0; font-size:9px; color:#64748b; text-transform:uppercase; font-weight:600;">Saldo Pendiente</p>
                        <h3 style="margin:4px 0 0 0; font-size:16px; color:#dc2626; font-weight:800;">$${totalPendiente.toFixed(2)}</h3>
                    </div>
                </div>

                <!-- Historial de Movimientos Detallado -->
                <div style="margin-bottom:20px;">
                    <h4 style="margin:0 0 10px 0; font-size:12px; color:#334155; text-transform:uppercase; border-left:3px solid #10b981; padding-left:8px; font-weight:700;">Movimientos de Caja (Pagos/Abonos)</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:10px;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th style="padding:8px; text-align:left; border-bottom:1px solid #e2e8f0;">Fecha y Hora</th>
                                <th style="padding:8px; text-align:left; border-bottom:1px solid #e2e8f0;">Referencia / Concepto</th>
                                <th style="padding:8px; text-align:left; border-bottom:1px solid #e2e8f0;">Método</th>
                                <th style="padding:8px; text-align:right; border-bottom:1px solid #e2e8f0;">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${movimientos.length ? movimientos.map(m => `
                                <tr>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9; white-space:nowrap;">${formatFullDate(m.fecha)}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9; color:#64748b;">${m.parentConcepto}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9; vertical-align:middle;">
                                        <div style="display:flex; align-items:center;">
                                            ${getMethodIcon(m.metodo, m.banco)}
                                            <span style="font-size:9px;">${m.metodo} ${m.banco ? `(${m.banco})` : ''}</span>
                                        </div>
                                    </td>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9; text-align:right; font-weight:700; color:#059669;">+$${(m.monto||0).toFixed(2)}</td>
                                </tr>
                            `).join('') : '<tr><td colspan="4" style="padding:20px; text-align:center; color:#94a3b8;">No se registran movimientos de pago en el periodo</td></tr>'}
                        </tbody>
                    </table>
                </div>

                <!-- Estado de Facturas / Deudas -->
                <div style="margin-bottom:20px;">
                    <h4 style="margin:0 0 10px 0; font-size:12px; color:#334155; text-transform:uppercase; border-left:3px solid #8b5cf6; padding-left:8px; font-weight:700;">Estado de Cuentas por Cobrar</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:10px;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th style="padding:8px; text-align:left; border-bottom:1px solid #e2e8f0;">Fecha Registro</th>
                                <th style="padding:8px; text-align:left; border-bottom:1px solid #e2e8f0;">Concepto</th>
                                <th style="padding:8px; text-align:right; border-bottom:1px solid #e2e8f0;">Total</th>
                                <th style="padding:8px; text-align:right; border-bottom:1px solid #e2e8f0;">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${accounts.length ? accounts.map(a => `
                                <tr>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9;">${a.fecha}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9;">${a.concepto || '—'}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9; text-align:right;">$${(a.montoTotal||0).toFixed(2)}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f1f5f9; text-align:right; font-weight:700; color:${a.pendiente > 0 ? '#dc2626' : '#059669'};">$${(a.pendiente||0).toFixed(2)}</td>
                                </tr>
                            `).join('') : '<tr><td colspan="4" style="padding:20px; text-align:center; color:#94a3b8;">No hay registros de cuentas</td></tr>'}
                        </tbody>
                    </table>
                </div>

                ${opts.details && sri.length ? `
                <div>
                    <h4 style="margin:0 0 10px 0; font-size:12px; color:#334155; text-transform:uppercase; border-left:3px solid #14b8a6; padding-left:8px; font-weight:700;">Resumen de Actividad SRI</h4>
                    <table style="width:100%; border-collapse:collapse; font-size:9px;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th style="padding:6px; text-align:left; border-bottom:1px solid #e2e8f0;">Periodo</th>
                                <th style="padding:6px; text-align:right; border-bottom:1px solid #e2e8f0;">Ventas</th>
                                <th style="padding:6px; text-align:right; border-bottom:1px solid #e2e8f0;">IVA Ventas</th>
                                <th style="padding:6px; text-align:right; border-bottom:1px solid #e2e8f0;">Compras</th>
                                <th style="padding:6px; text-align:right; border-bottom:1px solid #e2e8f0;">IVA Compras</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sri.map(s => `
                                <tr>
                                    <td style="padding:6px; border-bottom:1px solid #f1f5f9;">${s.fecha.substring(0,7)}</td>
                                    <td style="padding:6px; border-bottom:1px solid #f1f5f9; text-align:right;">$${(s.ventasTotal||0).toFixed(2)}</td>
                                    <td style="padding:6px; border-bottom:1px solid #f1f5f9; text-align:right;">$${(s.ventasIva||0).toFixed(2)}</td>
                                    <td style="padding:6px; border-bottom:1px solid #f1f5f9; text-align:right;">$${(s.comprasTotal||0).toFixed(2)}</td>
                                    <td style="padding:6px; border-bottom:1px solid #f1f5f9; text-align:right;">$${(s.comprasIvaTotal||0).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ` : ''}

                ${opts.bank ? `
                <div style="margin-top:40px; padding:20px; background:#f1f5f9; border-radius:12px; font-size:11px;">
                    <h5 style="margin:0 0 10px 0; font-size:12px; color:#1e293b;">Información de Pago (JF SYSTEM)</h5>
                    <p style="margin:2px 0;"><strong>Banco:</strong> Banco Pichincha (Ahorros)</p>
                    <p style="margin:2px 0;"><strong>Titular:</strong> JESSICA FAREZ</p>
                    <p style="margin:2px 0;"><strong>Número de Cuenta:</strong> 2200000000</p>
                    <p style="margin:2px 0;"><strong>Correo:</strong> pagos@jfsystem.com</p>
                </div>
                ` : ''}

                <div style="margin-top:50px; text-align:center; border-top:1px solid #e2e8f0; padding-top:20px; font-size:9px; color:#94a3b8;">
                    Este documento es una representación financiera oficial generada por JF SYSTEM. No tiene validez legal tributaria ante el SRI.
                </div>
            </div>
        `;
    },
    // --- Lógica de Reportes Premium & Selección ---

    toggleCuentaSelection(type, id, checked) {
        const list = type === 'cobrar' ? State.selectedCuentasCobrar : State.selectedCuentasPagar;
        if (checked) {
            if (!list.includes(id)) list.push(id);
        } else {
            const idx = list.indexOf(id);
            if (idx > -1) list.splice(idx, 1);
        }
    },

    toggleAllCuentas(type, checked) {
        const data = type === 'cobrar' ? State.cuentasCobrarData : State.cuentasPagarData;
        const listName = type === 'cobrar' ? 'selectedCuentasCobrar' : 'selectedCuentasPagar';
        
        if (checked) {
            State[listName] = data.map(c => c.id);
        } else {
            State[listName] = [];
        }
        this.render();
    },

    exportSelectedReports(type) {
        const ids = type === 'cobrar' ? State.selectedCuentasCobrar : State.selectedCuentasPagar;
        if (!ids || ids.length === 0) {
            return this.showToast('Selecciona al menos un registro para exportar.', 'warning');
        }

        const data = type === 'cobrar' ? State.cuentasCobrarData : State.cuentasPagarData;
        const selectedNames = data
            .filter(c => ids.includes(c.id))
            .map(c => type === 'cobrar' ? c.cliente : c.proveedor);

        // Remove duplicates
        const uniqueNames = [...new Set(selectedNames.filter(n => n))];

        if (uniqueNames.length === 0) return;

        this.showToast(`Generando ${uniqueNames.length} reporte(s)...`, 'info');
        
        let i = 0;
        const processNext = async () => {
            if (i < uniqueNames.length) {
                try {
                    await this.generatePremiumReport(uniqueNames[i]);
                } catch (e) {
                    console.error(`Error generating report for ${uniqueNames[i]}`, e);
                }
                i++;
                setTimeout(processNext, 800); // 800ms delay to ensure stability
            } else {
                this.showToast('Exportación masiva completada.', 'success');
                if (type === 'cobrar') State.selectedCuentasCobrar = [];
                else State.selectedCuentasPagar = [];
                this.render();
            }
        };
        processNext();
    },

    exportSingleClientReport(name) {
        if (!name) return;
        this.showToast(`Generando reporte para ${name}...`, 'info');
        this.generatePremiumReport(name);
    }
};

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());

