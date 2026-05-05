const State = {
    currentUser: null,
    currentRoute: 'login',
    currentClientId: null,
    searchQuery: '',
    filterRegimen: '',
    filterForma: '',
    filterStart: '',
    filterEnd: '',
    sortDesc: true,
    editingId: null,
    userEditingId: null,
    theme: localStorage.getItem('theme') || 'light',
    clientEditingId: null,
    showClientForm: false,
    editingCuentasCobrarId: null,
    editingCuentasPagarId: null,
    showSettingsModal: false,
    
    // Gestión de Cuentas Data & Modals
    showAbonoModal: false,
    abonoCurrentId: null,
    abonoType: 'cobrar', // 'cobrar' o 'pagar'
    cuentasCobrarData: [],
    cuentasPagarData: [],
    
    // Bancos de Ecuador para transferencias
    bancosEcuador: [
        "Banco Guayaquil", "Banco Pichincha", "Cooperativa JEP", "Cooperativa Jardín Azuayo"
    ],
    
    isLoading: true,
    clientSearch: '',
    matrizSearch: '',
    matrizClientesMesActual: new Set(), // Set de clientIds que ya declararon este mes
    matrizSriListener: null,            // Referencia al listener de Firestore para limpiar
    currentFichaClientId: null,         // ID del cliente cuya ficha está abierta
    fichaEditingSection: null,          // 'sri' | 'facturacion' | 'firma'
    sriActiveTab: 'ventas',             // Tab activo en Registro de Compra/Venta
    sriMes: new Date().getMonth() + 1, // Mes seleccionado (1-12)
    sriAnio: new Date().getFullYear(), // Año seleccionado
    sriEditingId: null,                // ID del registro en edición
    sriEditingTipo: null,              // 'venta' | 'compra'
    conciliadoAnio: new Date().getFullYear(),
    conciliadoPeriodo: 0, // 0 = Todo el año, 1 = Enero, etc.
    conciliadoFechaInicio: `${new Date().getFullYear()}-01-01`,
    conciliadoFechaFin: `${new Date().getFullYear()}-12-31`,
    // ─── Gestión de Cuentas ───────────────────────
    cuentasActiveTab: 'cobrar',
    cuentasCobrarFF:  `${new Date().getFullYear()}-12-31`,
    cuentasPagarFI:  `${new Date().getFullYear()}-01-01`,
    cuentasPagarFF:  `${new Date().getFullYear()}-12-31`,

    // Búsqueda y Paginación
    cobrarSearch: '',
    pagarSearch: '',
    cobrarPage: 1,
    pagarPage: 1,
    pageSize: 8,

    // Modal de Detalles
    showDetalleModal: false,
    detalleRecord: null,
    detalleType: 'cobrar',

    // Centro de Reportes
    reportSelectedClientId: null,
    selectedCuentasCobrar: [],
    selectedCuentasPagar: []
};

// Expose state globally for easy access in views and handlers
if (typeof window !== 'undefined') {
    window.State = State;
}
