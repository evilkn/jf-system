const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function rebuildDashboardMetadata() {
    console.log("Reconstruyendo metadatos del dashboard desde cero...");
    const snapshot = await db.collection("sri_registros").get();
    let meta = { totalRegistros: 0, mensual: {}, clientes: {} };
    
    snapshot.docs.forEach(doc => {
        const data = doc.data();
        meta.totalRegistros++;
        
        if (!data.fecha) return;

        const ym = data.fecha.substring(0, 7);
        const y = data.fecha.substring(0, 4);
        
        if (!meta.mensual[ym]) meta.mensual[ym] = { sales: 0, purchases: 0 };
        meta.mensual[ym].sales += (data.v_sub15 || 0) + (data.v_sub5 || 0) + (data.v_sub0 || 0);
        meta.mensual[ym].purchases += (data.c_sub15 || 0) + (data.c_sub5 || 0) + (data.c_sub0 || 0);
        
        if (data.clientId) {
            if (!meta.clientes[data.clientId]) meta.clientes[data.clientId] = {};
            if (!meta.clientes[data.clientId][y]) meta.clientes[data.clientId][y] = { sales: 0 };
            meta.clientes[data.clientId][y].sales += (data.v_sub15 || 0) + (data.v_sub5 || 0) + (data.v_sub0 || 0);
        }
    });
    
    await db.collection("metadata").doc("dashboard").set(meta);
    console.log("Metadatos reconstruidos con éxito:", JSON.stringify(meta, null, 2));
}

rebuildDashboardMetadata()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
