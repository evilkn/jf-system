const Views = {
    renderOptions(options) {
        return options.map(o => `<option value="${o}">${o}</option>`).join('');
    },

    splash() {
        return `
            <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-main); color: var(--text-primary); transition: background 0.3s ease;">
                <div style="margin-bottom: 24px; padding: 20px; display: inline-block;">
                    <img src="logo.png?v=6" alt="JF Logo" class="splash-logo" style="width: 100%; max-width: 250px; height: auto; display: block; filter: drop-shadow(0 0 15px rgba(255,255,255,0.15));">
                </div>
                <div style="font-family: var(--font-heading); letter-spacing: 4px; font-size: 1.1rem; font-weight: 700;">
                    VERIFICANDO <span style="color: var(--primary);">ACCESO</span>
                </div>
                <div style="margin-top: 24px; display: flex; gap: 4px;">
                    <div class="dot-loader" style="animation-delay: 0s;"></div>
                    <div class="dot-loader" style="animation-delay: 0.2s;"></div>
                    <div class="dot-loader" style="animation-delay: 0.4s;"></div>
                </div>
                <style>
                    .dot-loader {
                        width: 8px;
                        height: 8px;
                        background: var(--primary);
                        border-radius: 50%;
                        animation: dotJump 0.6s infinite alternate;
                    }
                    @keyframes dotJump {
                        from { transform: translateY(0); opacity: 0.3; }
                        to { transform: translateY(-10px); opacity: 1; }
                    }
                </style>
            </div>
        `;
    },

    login() {
        return `
            <div class="auth-container" style="height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-main); position: relative; overflow: hidden;">
                <div id="particles-js" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
                <div class="glass-card animate-fadeIn" style="width: 100%; max-width: 400px; padding: 40px; position: relative; z-index: 2;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div style="padding: 20px; display: inline-block; margin-bottom: 8px;">
                            <img src="logo.png?v=6" alt="JF Logo" style="width: 100%; max-width: 250px; height: auto; display: block; filter: drop-shadow(0 0 15px rgba(255,255,255,0.15));">
                        </div>
                        <p style="color: var(--text-secondary); margin-top: 12px; font-weight: 500;">Acceso al sistema</p>
                    </div>
                    <div style="margin-top: 10px;">
                        <button id="login-btn" class="btn" onclick="App.handleGoogleLogin()" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; background: white; color: #1f2937; border: 1px solid #d1d5db; font-weight: 600; padding: 14px; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <img id="login-google-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style="height: 20px;">
                            <span id="login-btn-text">Ingresar con Google</span>
                            <div id="login-spinner" class="spinner" style="display: none;"></div>
                        </button>
                    </div>
                    <p style="text-align: center; margin-top: 24px; font-size: 0.75rem; color: var(--text-secondary); opacity: 0.7;">
                        Acceso restringido. Solo personal autorizado.
                    </p>
                </div>
            </div>
        `;
    },

    layout(content) {
        const user = State.currentUser;
        const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        return `
            <div class="dashboard-layout${isCollapsed ? ' sidebar-collapsed' : ''}">
                <aside class="sidebar" id="main-sidebar">

                    <!-- Toggle button -->
                    <button class="sidebar-toggle-btn" id="sidebar-toggle" onclick="App.toggleSidebar()" title="Colapsar menú">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6"  x2="21" y2="6"/>
                            <line x1="3" y1="12" x2="21" y2="12"/>
                            <line x1="3" y1="18" x2="21" y2="18"/>
                        </svg>
                    </button>

                    <div class="sidebar-brand" style="justify-content: center; padding: 16px 0;">
                        <div style="padding: 10px; display: inline-block;">
                            <img src="logo.png?v=6" alt="Logo" class="sidebar-logo" style="width: 100%; max-width: 160px; height: auto; display: block; filter: drop-shadow(0 0 12px rgba(255,255,255,0.1));">
                        </div>
                    </div>

                    <!-- Nav -->
                    <nav class="sidebar-nav">
                        <a href="#" class="nav-item ${State.currentRoute === 'dashboard' ? 'active' : ''}" onclick="App.navigate('dashboard', true); return false;" data-tooltip="Dashboard">
                            <span class="nav-icon">${Icons.navDashboard()}</span>
                            <span class="nav-label">Dashboard</span>
                        </a>
                        <a href="#" class="nav-item ${State.currentRoute === 'clients' ? 'active' : ''}" onclick="App.navigate('clients', true); return false;" data-tooltip="Clientes">
                            <span class="nav-icon">${Icons.navClients()}</span>
                            <span class="nav-label">Clientes</span>
                        </a>
                        <a href="#" class="nav-item ${State.currentRoute === 'sri' ? 'active' : ''}" onclick="App.navigate('sri', true); return false;" data-tooltip="Compra y Venta">
                            <span class="nav-icon">${Icons.navSRI()}</span>
                            <span class="nav-label">Compra y Venta</span>
                        </a>
                        <a href="#" class="nav-item ${State.currentRoute === 'cuentas' ? 'active' : ''}" onclick="App.navigate('cuentas', true); return false;" data-tooltip="Gestión de Cuentas">
                            <span class="nav-icon">${Icons.navCuentas()}</span>
                            <span class="nav-label">Gestión de Cuentas</span>
                        </a>
                        <a href="#" class="nav-item ${State.currentRoute === 'matriz' ? 'active' : ''}" onclick="App.navigate('matriz', true); return false;" data-tooltip="Matriz de Control">
                            <span class="nav-icon">${Icons.navMatriz()}</span>
                            <span class="nav-label">Matriz de Control</span>
                        </a>
                        <a href="#" class="nav-item ${State.currentRoute === 'bancos' ? 'active' : ''}" onclick="App.navigate('bancos', true); return false;" data-tooltip="Bancos">
                            <span class="nav-icon">${Icons.navBancos()}</span>
                            <span class="nav-label">Bancos</span>
                        </a>
                        <a href="#" class="nav-item ${State.currentRoute === 'finanzas' ? 'active' : ''}" onclick="App.navigate('finanzas', true); return false;" data-tooltip="Estados Financieros">
                            <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg></span>
                            <span class="nav-label">Estados Financieros</span>
                        </a>
                        ${user.role === 'admin' ? `
                        <a href="#" class="nav-item ${State.currentRoute === 'audit' ? 'active' : ''}" onclick="App.navigate('audit', true); return false;" data-tooltip="Auditoría">
                            <span class="nav-icon">${Icons.navAudit()}</span>
                            <span class="nav-label">Auditoría</span>
                        </a>
                        ` : ''}
                    </nav>

                    <!-- Footer -->
                    <div class="sidebar-footer">
                        <div class="sidebar-user" data-tooltip="${user.username || user.email.split('@')[0]}">
                            <div class="sidebar-avatar">
                                ${user.photoURL ? 
                                    `<img src="${user.photoURL}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;">` : 
                                    (user.username || user.email).charAt(0).toUpperCase()
                                }
                            </div>
                            <div class="sidebar-user-info">
                                <div class="sidebar-user-name">${user.username || user.email.split('@')[0]}</div>
                                <div class="sidebar-user-role">${user.role}</div>
                            </div>
                        </div>
                        <button class="btn btn-logout sidebar-logout-btn" onclick="App.handleLogout()" data-tooltip="Cerrar Sesión">
                            <span class="nav-icon">${Icons.logout()}</span>
                            <span class="nav-label">Cerrar Sesión</span>
                        </button>
                    </div>

                </aside>
                <main class="main-content-wrapper">
                    <header class="header">
                        <div class="header-title">
                            <h2 style="font-family: var(--font-heading); font-size: 1.2rem;">${this.getPageTitle()}</h2>
                        </div>
                        <div class="header-actions">
                            ${user.role === 'admin' ? `
                                <button class="btn-icon" onclick="App.toggleSettingsModal()" title="Configuración de Usuarios" style="display:flex;align-items:center;justify-content:center;">${Icons.settings()}</button>
                            ` : ''}
                            <button class="btn-icon" onclick="App.toggleTheme()" title="Cambiar Tema" style="display:flex;align-items:center;justify-content:center;">
                                ${State.theme === 'dark' ? Icons.sun() : Icons.moon()}
                            </button>
                        </div>
                    </header>
                    <div class="main-content animate-fadeIn">
                        ${content}
                    </div>
                </main>
            </div>
            ${this.settingsModal()}
            ${this.abonoModal()}
            ${this.detalleModal()}
            ${this.bancoModal()}
            ${this.editBancoModal()}
            ${this.transferModal ? this.transferModal() : ''}
            ${this.sriImportModal()}
            <div id="toast-container"></div>
        `;
    },

    sriImportModal() {
        return `
            <div id="sri-import-modal" class="modal-overlay ${State.showSriImportModal ? 'active' : ''}">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 900px; padding: 0; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh;">
                    <div style="background:linear-gradient(135deg, var(--danger) 0%, #7f1d1d 100%); color:white; padding: 20px 24px; display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="margin:0; font-size:1.25rem; display:flex; align-items:center; gap:10px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Previsualización de Importación (Compras)
                        </h3>
                        <button class="icon-btn" onclick="App.closeSRIImportModal()" style="color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.15);">X</button>
                    </div>
                    <div id="sri-import-content" style="padding:20px 24px; overflow-y:auto; flex:1;">
                        <!-- Renderizado por JS -->
                    </div>
                    <div style="padding: 16px 24px; background: rgba(0,0,0,0.02); border-top: 1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
                        <div id="sri-import-stats" style="font-size:0.85rem; color:var(--text-secondary); font-weight:500;"></div>
                        <div style="display:flex; gap:12px;">
                            <button class="btn btn-secondary" onclick="App.closeSRIImportModal()">Cancelar</button>
                            <button class="btn btn-primary" onclick="App.confirmSRIImport()">Confirmar e Importar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    detalleModal() {
        return `
            <!-- DETALLE MODAL -->
            <div id="detalle-modal" class="modal-overlay ${State.showDetalleModal ? 'active' : ''}">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 750px; padding: 0; overflow: hidden;">
                    <div id="detalle-modal-content">
                        <!-- Rendered by App -->
                    </div>
                </div>
            </div>
        `;
    },

    bancoDetalleContent(banco) {
        const bankInfo = this.getBankInfo(banco.nombre);
        return `
            <div style="padding: 30px; background: ${bankInfo.themeClass.includes('generic') ? 'var(--surface)' : 'var(--glass-bg)'};" class="${bankInfo.themeClass}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 24px;">
                    <div style="display:flex; align-items:center; gap: 16px;">
                        <div class="bank-logo-container" style="width: 50px; height: 50px; background: white; border-radius: 12px; padding: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            ${bankInfo.icon}
                        </div>
                        <div>
                            <h2 style="margin: 0; font-size: 1.5rem; color: var(--text-primary); text-shadow: 0 1px 2px rgba(0,0,0,0.1);">${banco.nombre}</h2>
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">Saldo Inicial: ${App.formatMoney(banco.saldo_inicial || 0)}</span>
                        </div>
                    </div>
                    <button class="icon-btn" onclick="App.closeDetalleModal()">${Icons.close()}</button>
                </div>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div class="glass-card" style="background: rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.05); padding: 20px;">
                        <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Saldo del Sistema</div>
                        <div id="saldo-sistema-valor" class="bank-balance" style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; letter-spacing: -1px;">
                            ${App.formatMoney(banco.saldo_actual || 0)}
                        </div>
                    </div>
                    
                    <div class="glass-card" style="background: rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.05); padding: 20px;">
                        <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Conciliación (Saldo Banco Real)</div>
                        <div style="display:flex; gap: 12px; align-items:center; margin-bottom: 12px;">
                            <input type="number" step="0.01" id="saldo-real-input" oninput="App.actualizarComparacion(${banco.saldo_actual})" placeholder="0.00" style="font-size: 1.1rem; padding: 8px; flex-grow:1; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 8px;">
                            <button class="btn btn-primary" onclick="App.guardarConciliacion('${banco.id}')">Ajustar</button>
                        </div>
                        <div id="conciliacion-status" style="display: flex; align-items: center; justify-content: space-between; font-weight: 600; font-size: 0.85rem; padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.05);">
                            <span id="conciliacion-label">INGRESE SALDO REAL</span>
                            <span id="conciliacion-diff">---</span>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px;">
                    <div class="glass-card" style="background: rgba(0,0,0,0.2); padding: 20px;">
                        <h3 style="margin: 0 0 16px 0; display:flex; align-items:center; gap: 8px; font-size: 1.1rem;">${Icons.docList ? Icons.docList(20) : '📄'} Historial de Movimientos</h3>
                        <div id="transacciones-list" style="max-height: 350px; overflow-y: auto; padding-right: 8px;">
                            <div style="text-align: center; color: var(--text-secondary); padding: 30px; background: rgba(0,0,0,0.05); border-radius: 8px;">
                                Cargando movimientos...
                            </div>
                        </div>
                        <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
                            <div style="display: flex; gap: 10px; margin-bottom: 12px; justify-content: center;">
                                <div style="display: flex; flex-direction: column;">
                                    <label style="font-size: 0.7rem; opacity: 0.7; margin-bottom: 2px;">Desde</label>
                                    <input type="date" id="export-desde" style="padding: 6px; font-size: 0.8rem; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 4px;">
                                </div>
                                <div style="display: flex; flex-direction: column;">
                                    <label style="font-size: 0.7rem; opacity: 0.7; margin-bottom: 2px;">Hasta</label>
                                    <input type="date" id="export-hasta" style="padding: 6px; font-size: 0.8rem; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 4px;">
                                </div>
                            </div>
                            <div style="display:flex; justify-content:center;">
                                <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 16px; display:flex; align-items:center; gap:8px;" onclick="App.exportBankHistoryPDF('${banco.id}')">
                                    ${Icons.export(14)} Descargar Historial (PDF)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card" style="background: rgba(255,255,255,0.02); padding: 20px; border: 1px solid rgba(255,255,255,0.05);">
                        <h3 id="form-movimiento-title" style="margin: 0 0 16px 0; font-size: 1.1rem;">Nuevo Movimiento</h3>
                        <form onsubmit="App.handleMovimientoSubmit(event, '${banco.id}')" style="display:grid; gap: 12px;">
                            <div class="form-group">
                                <label style="font-size: 0.75rem; opacity: 0.7;">Tipo de Movimiento</label>
                                <select id="mov-tipo" style="width: 100%; padding: 8px; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px;">
                                    <option value="ingreso">Ingreso (+)</option>
                                    <option value="egreso">Egreso (-)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.75rem; opacity: 0.7;">Fecha</label>
                                <input type="date" id="mov-fecha" required style="width: 100%; padding: 8px; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px;">
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.75rem; opacity: 0.7;">Monto ($)</label>
                                <input type="number" step="0.01" id="mov-monto" required placeholder="0.00" style="width: 100%; padding: 8px; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px;">
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.75rem; opacity: 0.7;">Descripción</label>
                                <input type="text" id="mov-desc" required placeholder="Ej. Pago de servicios..." style="width: 100%; padding: 8px; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px;">
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.75rem; opacity: 0.7;">Etiqueta (Opcional)</label>
                                <select id="mov-tag" style="width: 100%; padding: 8px; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px;">
                                    <option value="">Sin etiqueta</option>
                                    <option value="Impuestos">Impuestos</option>
                                    <option value="Servicios">Servicios</option>
                                    <option value="Nómina">Nómina</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Ajuste">Ajuste</option>
                                    <option value="Ventas">Ventas</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                            <button id="btn-movimiento-submit" type="submit" class="btn btn-primary" style="margin-top: 8px; width: 100%;">Registrar Movimiento</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    getBankInfo(nombre) {
        const n = nombre.toLowerCase();
        if (n.includes('caja')) return { icon: Icons.cash(24), themeClass: 'bank-theme-generic' };
        if (n.includes('pichincha')) return { icon: '<img src="Bancos/banco_pichincha.png?v=5" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-pichincha' };
        if (n.includes('guayaquil')) return { icon: '<img src="Bancos/banco_guayaquil.png?v=5" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-guayaquil' };
        if (n.includes('jep')) return { icon: '<img src="Bancos/cooperativa_jep.png?v=5" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-jep' };
        if (n.includes('jardín azuayo') || n.includes('jardin azuayo')) return { icon: '<img src="Bancos/cooperativa_jardin_azuayo.png?v=5" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-jardin' };
        if (n.includes('austro')) return { icon: '<img src="Bancos/banco_del_austro.png?v=5" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-austro' };
        if (n.includes('produbanco')) return { icon: Icons.bankProdubanco(24), themeClass: 'bank-theme-produbanco' };
        if (n.includes('pacifico')) return { icon: Icons.bankPacifico(24), themeClass: 'bank-theme-pacifico' };
        return { icon: Icons.bank(24), themeClass: 'bank-theme-generic' };
    },

    bancoModal() {
        return `
            <div id="banco-modal" class="modal-overlay ${State.showBancoModal ? 'active' : ''}">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 550px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                        <h3 style="margin: 0; display:flex; align-items:center; gap:8px;">${Icons.bank()} Nuevo Banco</h3>
                        <button class="icon-btn" onclick="App.closeBancoModal()">${Icons.close()}</button>
                    </div>
                    <form onsubmit="App.handleBancoSubmit(event)">
                        <div class="form-group">
                            <label>Selecciona el Banco</label>
                            <div class="bank-selection-grid">
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Banco Pichincha" onchange="App.toggleOtroBanco()" checked>
                                    <div class="bank-option-content">
                                        <img src="Bancos/banco_pichincha.png?v=5" alt="Pichincha">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Banco Guayaquil" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <img src="Bancos/banco_guayaquil.png?v=5" alt="Guayaquil">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Cooperativa JEP" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <img src="Bancos/cooperativa_jep.png?v=5" alt="JEP">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Cooperativa Jardín Azuayo" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <img src="Bancos/cooperativa_jardin_azuayo.png?v=5" alt="Jardín Azuayo">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Caja Chica" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <div class="otro-icon" style="color: #14b8a6;">${Icons.cash(24)}</div>
                                        <span>Caja Chica</span>
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Otro" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <div class="otro-icon">${Icons.bank(24)}</div>
                                        <span>Otro Banco</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" id="container-otro-banco">
                            <label>Nombre de la Cuenta *</label>
                            <input type="text" id="banco-nombre-manual" placeholder="Ej. Caja Chica, Banco Pichincha..." required value="Banco Pichincha">
                        </div>
                        <div class="form-group">
                            <label>Clasificación *</label>
                            <select id="banco-clasificacion" class="premium-select" required>
                                <option value="corriente">Activo Corriente (Efectivo y Equivalentes)</option>
                                <option value="no_corriente">Activo No Corriente (Inversiones a Largo Plazo)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Saldo Inicial ($)</label>
                            <input type="number" step="0.01" id="banco-saldo-inicial" required placeholder="0.00" value="0.00">
                        </div>
                        <div style="display:flex; justify-content:flex-end; gap: 12px; margin-top: 24px;">
                            <button type="button" class="btn btn-secondary" onclick="App.closeBancoModal()">Cancelar</button>
                            <button type="submit" class="btn btn-primary" id="banco-submit-btn">Guardar Banco</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    editBancoModal() {
        const banco = State.editingBanco || null;
        if (!banco) return `<div id="edit-banco-modal" class="modal-overlay"></div>`;
        return `
            <div id="edit-banco-modal" class="modal-overlay active">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 480px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                        <h3 style="margin: 0; display:flex; align-items:center; gap:8px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Editar Cuenta
                        </h3>
                        <button class="icon-btn" onclick="App.closeEditBancoModal()">${Icons.close()}</button>
                    </div>
                    <form onsubmit="App.handleEditBancoSubmit(event, '${banco.id}')">
                        <div class="form-group">
                            <label>Nombre del Banco / Cuenta</label>
                            <input type="text" id="edit-banco-nombre" required placeholder="Ej. Banco Pichincha, Caja Chica..." value="${banco.nombre}" style="width:100%;">
                        </div>
                        <div class="form-group">
                            <label>Número de Cuenta (Opcional)</label>
                            <input type="text" id="edit-banco-numero" placeholder="Ej. 2200xxxxxx" value="${banco.numero || ''}" style="width:100%;">
                        </div>
                        <div class="form-group">
                            <label>Clasificación *</label>
                            <select id="edit-banco-clasificacion" class="premium-select" required style="width:100%;">
                                <option value="corriente" ${banco.clasificacion !== 'no_corriente' ? 'selected' : ''}>Activo Corriente (Efectivo y Equivalentes)</option>
                                <option value="no_corriente" ${banco.clasificacion === 'no_corriente' ? 'selected' : ''}>Activo No Corriente (Inversiones a Largo Plazo)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Saldo Actual ($)</label>
                            <input type="number" step="0.01" id="edit-banco-saldo" required placeholder="0.00" value="${banco.saldo_actual || 0}" style="width:100%;">
                            <small style="color: var(--text-secondary); font-size: 0.78rem; margin-top: 4px; display:block;">&#9888; Modificar el saldo directamente sobreescribe el valor en el sistema. Se recomienda usar Conciliación para ajustes.</small>
                        </div>
                        <div style="display:flex; justify-content:flex-end; gap: 12px; margin-top: 24px;">
                            <button type="button" class="btn btn-secondary" onclick="App.closeEditBancoModal()">Cancelar</button>
                            <button type="submit" class="btn btn-primary" id="edit-banco-submit-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    modalEliminarBanco(banco) {
        return `
            <div id="confirm-delete-modal" class="modal-overlay active">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 450px; border: 1px solid rgba(255, 77, 77, 0.3);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #ff4d4d; display:flex; align-items:center; gap:8px;">
                            ${Icons.trash ? Icons.trash(20) : '🗑'} Eliminar Cuenta
                        </h3>
                        <button class="icon-btn" onclick="App.closeDeleteBancoModal()">${Icons.close()}</button>
                    </div>
                    
                    <div style="margin-bottom: 24px; text-align: center;">
                        <div style="background: rgba(255, 77, 77, 0.1); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                            <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
                                ¿Estás seguro que deseas eliminar la cuenta <strong>"${banco.nombre}"</strong>?
                            </p>
                            <p style="margin: 8px 0 0 0; color: #ff4d4d; font-size: 0.85rem; font-weight: 600;">
                                Esta acción no se puede deshacer y borrará todo el historial asociado.
                            </p>
                        </div>
                        
                        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px;">
                            Para confirmar, escribe la palabra <span style="color: var(--text-primary); font-weight: 700; letter-spacing: 1px;">ELIMINAR</span> abajo:
                        </p>
                        
                        <input type="text" id="delete-confirm-input" autocomplete="off" 
                            style="width: 100%; text-align: center; font-weight: 800; letter-spacing: 2px; padding: 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--input-bg); color: var(--text-primary); font-size: 1.1rem;"
                            placeholder="Escribe ELIMINAR aquí">
                    </div>

                    <div style="display:flex; gap: 12px;">
                        <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="App.closeDeleteBancoModal()">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="btn-final-delete" style="flex: 1; background: #ff4d4d; color: white; border: none; border-radius: 8px; font-weight: 600;" 
                            onclick="App.ejecutarEliminarBanco('${banco.id}')">Eliminar Definitivamente</button>
                    </div>
                </div>
            </div>
        `;
    },

    modalEliminarTarea(todoId, todoText) {
        return `
            <div id="confirm-delete-todo-modal" class="modal-overlay active">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 420px; border: 1px solid rgba(255, 77, 77, 0.3); padding: 24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #ff4d4d; display:flex; align-items:center; gap:8px; font-size:1.1rem; font-family:var(--font-heading);">
                            ${Icons.trash ? Icons.trash(18) : '🗑️'} Eliminar Tarea
                        </h3>
                        <button class="close-btn" onclick="App.closeDeleteTodoModal()" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; padding:4px; display:flex; align-items:center; justify-content:center;">
                            ${Icons.close()}
                        </button>
                    </div>
                    
                    <div style="margin-bottom: 24px; text-align: center;">
                        <div style="background: rgba(255, 77, 77, 0.08); padding: 16px; border-radius: 12px; border: 1px solid rgba(255, 77, 77, 0.15);">
                            <p style="margin: 0; font-size: 0.95rem; line-height: 1.5; color:var(--text-primary);">
                                ¿Estás seguro de que deseas eliminar esta tarea?
                            </p>
                            <p style="margin: 10px 0 0 0; color: var(--text-secondary); font-size: 0.85rem; font-style: italic; word-break: break-word;">
                                "${todoText}"
                            </p>
                        </div>
                    </div>

                    <div style="display:flex; gap: 12px;">
                        <button type="button" class="btn btn-secondary" style="flex: 1; padding: 10px; border-radius: 8px; font-weight: 600;" onclick="App.closeDeleteTodoModal()">Cancelar</button>
                        <button type="button" class="btn btn-danger" style="flex: 1; background: #ff4d4d; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; padding: 10px; transition: background 0.2s;" 
                            onmouseover="this.style.background='#e04343'" onmouseout="this.style.background='#ff4d4d'"
                            onclick="App.ejecutarEliminarTodo('${todoId}')">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    },

    transferModal() {
        const bancos = State.bancosData || [];
        const options = bancos.map(b => `<option value="${b.id}">${b.nombre} (${App.formatMoney(b.saldo_actual)})</option>`).join('');
        return `
            <div id="transfer-modal" class="modal-overlay ${State.showTransferModal ? 'active' : ''}">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 500px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                        <h3 style="margin: 0; display:flex; align-items:center; gap:8px;">${Icons.transfer ? Icons.transfer() : '⇄'} Transferencia Interna</h3>
                        <button class="icon-btn" onclick="App.closeTransferModal()">${Icons.close()}</button>
                    </div>
                    <form onsubmit="App.transferirEntreCuentas(event)">
                        <div class="form-group">
                            <label>Cuenta Origen</label>
                            <select id="transfer-origen" required style="width:100%; padding:8px; border-radius:6px; background:var(--input-bg); color:var(--text-primary); border:1px solid var(--border);">
                                <option value="">Seleccione origen...</option>
                                ${options}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Cuenta Destino</label>
                            <select id="transfer-destino" required style="width:100%; padding:8px; border-radius:6px; background:var(--input-bg); color:var(--text-primary); border:1px solid var(--border);">
                                <option value="">Seleccione destino...</option>
                                ${options}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Monto a Transferir ($)</label>
                            <input type="number" step="0.01" id="transfer-monto" required min="0.01" placeholder="0.00" style="width:100%; padding:8px; border-radius:6px; background:var(--input-bg); color:var(--text-primary); border:1px solid var(--border);">
                        </div>
                        <div class="form-group">
                            <label>Descripción / Motivo</label>
                            <input type="text" id="transfer-desc" placeholder="Ej. Reposición Caja Chica" required style="width:100%; padding:8px; border-radius:6px; background:var(--input-bg); color:var(--text-primary); border:1px solid var(--border);">
                        </div>
                        <div style="display:flex; justify-content:flex-end; gap: 12px; margin-top: 24px;">
                            <button type="button" class="btn btn-secondary" onclick="App.closeTransferModal()">Cancelar</button>
                            <button type="submit" class="btn btn-primary" id="transfer-submit-btn">Realizar Transferencia</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    bancos() {
        const totalLiquidez = (State.bancosData || []).reduce((acc, b) => acc + (b.saldo_actual || 0), 0);
        let cardsHtml = '';
        let optionsHtml = '<option value="">-- Seleccione una cuenta bancaria --</option>';
        
        if (State.bancosData && State.bancosData.length > 0) {
            let sortedBancos = [...State.bancosData].sort((a, b) => {
                const isCajaA = a.nombre.toLowerCase().includes('caja');
                const isCajaB = b.nombre.toLowerCase().includes('caja');
                if (isCajaA && !isCajaB) return -1;
                if (!isCajaA && isCajaB) return 1;
                return a.nombre.localeCompare(b.nombre);
            });

            const grupos = { BANCO: [], COOP: [], CAJA: [], OTRO: [] };
            sortedBancos.forEach(b => {
                const lowerName = b.nombre.toLowerCase();
                if (lowerName.includes('caja')) grupos.CAJA.push(b);
                else if (lowerName.includes('banco') || lowerName.includes('austro')) grupos.BANCO.push(b);
                else if (lowerName.includes('coop') || lowerName.includes('jep') || lowerName.includes('jardín') || lowerName.includes('jardin')) grupos.COOP.push(b);
                else grupos.OTRO.push(b);
            });

            const buildOptGroup = (label, arr) => {
                if (arr.length === 0) return '';
                return `<optgroup label="${label}">` + arr.map(b => `<option value="${b.id}" ${State.selectedBancoId === b.id ? 'selected' : ''}>${b.nombre}</option>`).join('') + `</optgroup>`;
            };

            optionsHtml += buildOptGroup('Bancos', grupos.BANCO);
            optionsHtml += buildOptGroup('Cooperativas', grupos.COOP);
            optionsHtml += buildOptGroup('Cajas', grupos.CAJA);
            optionsHtml += buildOptGroup('Otras Cuentas', grupos.OTRO);

            if (State.selectedBancoId) {
                const banco = sortedBancos.find(b => b.id === State.selectedBancoId);
                if (banco) {
                    const bankInfo = Views.getBankInfo(banco.nombre);
                    cardsHtml = `
                    <div class="glass-card bank-card ${bankInfo.themeClass}" style="cursor: pointer; position: relative; overflow: hidden; transition: all 0.3s ease; max-width: 500px; margin: 0 auto;">
                        <div class="bank-card-actions" onclick="event.stopPropagation()">
                            <button class="bank-action-btn bank-action-edit" onclick="App.showEditBancoModal('${banco.id}')" title="Editar">
                                ${Icons.edit ? Icons.edit(14) : '✎'}
                            </button>
                            <button class="bank-action-btn bank-action-delete" onclick="App.confirmarEliminarBanco('${banco.id}')" title="Eliminar">
                                ${Icons.trash ? Icons.trash(14) : '🗑'}
                            </button>
                        </div>
                        <div style="cursor: pointer;" onclick="App.openBancoDetail('${banco.id}')">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                                <h4 style="margin:0; font-size: 1.4rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); color: var(--text-primary);">${banco.nombre}</h4>
                                <div class="bank-logo-container" style="transform: scale(1.1);">
                                    ${bankInfo.icon}
                                </div>
                            </div>
                            <div class="bank-balance" style="font-family: var(--font-mono); font-size: 2.8rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 16px; text-align: center;">
                                ${State.hideAmounts ? '****' : App.formatMoney(banco.saldo_actual)}
                            </div>
                            <div style="font-size: 0.95rem; color: var(--text-secondary); display:flex; justify-content:space-between; align-items:center; padding-top: 16px; border-top: 1px solid var(--glass-border);">
                                <span style="font-weight: 500;">Ver conciliación y transacciones</span>
                                <div class="arrow-btn" style="background: rgba(var(--primary-rgb), 0.2);">${Icons.arrowRight()}</div>
                            </div>
                        </div>
                    </div>
                    `;
                }
            } else {
                cardsHtml = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
                    <div style="margin-bottom: 24px; animation: float 6s ease-in-out infinite;">
                        <img src="img/bancos-empty.png?v=2" alt="Bancos" style="width: 100%; max-width: 220px; height: auto; object-fit: contain; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4));">
                    </div>
                    <h3 style="margin: 0 0 12px 0; color: var(--text-primary); font-size: 1.4rem; font-weight: 700; letter-spacing: -0.5px;">Ninguna cuenta seleccionada</h3>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 1.05rem; max-width: 400px; line-height: 1.5;">Despliegue el menú superior y seleccione una cuenta bancaria para visualizar su saldo y empezar a gestionar sus transacciones.</p>
                </div>
                `;
            }
        } else {
            cardsHtml = `
                <div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 40px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 12px; background: rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 12px; opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    </div>
                    <div style="font-size: 1.1rem; color: var(--text-primary);">Aún no has registrado cuentas</div>
                    <div style="font-size: 0.9rem;">Haga clic en "Nuevo Banco" para empezar a registrar.</div>
                </div>
            `;
        }

        return `
            <div class="bancos-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; gap: 24px; flex-wrap: wrap;">
                <div class="header-info">
                    <h1 style="margin: 0; font-size: 2.2rem; font-weight: 800; background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px;">Control de Liquidez</h1>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 1rem; font-weight: 400;">Gestión independiente de activos líquidos y conciliación bancaria.</p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div class="total-liquidez-card glass-card" style="padding: 16px 24px; background: rgba(var(--primary-rgb), 0.1); border: 1px solid rgba(var(--primary-rgb), 0.2); min-width: 240px; position: relative; overflow: hidden; border-radius: 18px; backdrop-filter: blur(10px); box-shadow: var(--glass-shadow);">
                        <!-- Decoración sutil de fondo -->
                        <div style="position: absolute; top: -15px; right: -15px; opacity: 0.05; color: var(--primary); transform: rotate(-15deg);">
                            ${Icons.chart(100)}
                        </div>
                        
                        <div style="position: relative; z-index: 2;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <span style="color: var(--text-secondary); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700;">Saldo Disponible Total</span>
                                <button onclick="App.toggleHideAmounts()" title="Ocultar/Mostrar Saldos" style="background: none; border: none; padding: 4px; cursor: pointer; color: var(--text-secondary); opacity: 0.7; transition: opacity 0.2s; display: flex; align-items: center; justify-content: center; border-radius: 4px;" onmouseover="this.style.opacity=1; this.style.background='rgba(0,0,0,0.05)'" onmouseout="this.style.opacity=0.7; this.style.background='none'">
                                    ${State.hideAmounts ? Icons.eyeOff(16) : Icons.eye(16)}
                                </button>
                            </div>
                            <div style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); font-family: var(--font-mono); letter-spacing: -1px;">
                                ${State.hideAmounts ? '****' : App.formatMoney(totalLiquidez)}
                            </div>
                            <div style="display: flex; align-items: center; gap: 6px; margin-top: 6px; font-size: 0.75rem; color: var(--text-secondary); font-weight: 500;">
                                <span style="width: 7px; height: 7px; background: #4cd137; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px rgba(76, 209, 55, 0.4); animation: pulse 2s infinite;"></span>
                                Sistema Sincronizado
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-secondary" onclick="App.showTransferModal()" style="display:flex;align-items:center;gap:10px; height: 48px; padding: 0 24px; font-weight: 600; border-radius: 14px; box-shadow: 0 10px 20px -5px rgba(0,0,0, 0.1);">
                        ${Icons.transfer ? Icons.transfer(20) : '⇄'} Transferir
                    </button>
                    <button class="btn btn-primary" onclick="App.showAddBancoModal()" style="display:flex;align-items:center;gap:10px; height: 48px; padding: 0 24px; font-weight: 600; border-radius: 14px; box-shadow: 0 10px 20px -5px rgba(var(--primary-rgb), 0.3);">
                        ${Icons.plus(20)} Nuevo Banco / Caja
                    </button>
                </div>
            </div>

            <!-- Selector de Cuenta Bancaria -->
            <div style="display: flex; justify-content: center; margin-bottom: 40px;">
                <div class="search-container" style="position: relative; width: 100%; max-width: 500px;">
                    <div style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--primary);">
                        ${Icons.navCuentas(20)}
                    </div>
                    <select id="bancos-dropdown" onchange="App.selectBanco(event)" class="premium-select" style="width: 100%; padding: 16px 16px 16px 48px; border-radius: 14px; border: 1px solid rgba(var(--primary-rgb), 0.3); background: rgba(var(--bg-card-rgb), 0.8); color: var(--text-primary); outline: none; font-size: 1.1rem; font-weight: 500; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); backdrop-filter: blur(10px); appearance: none;">
                        ${optionsHtml}
                    </select>
                    <div style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); pointer-events: none;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                </div>
            </div>
            
            <div id="bancos-resumen-cards" style="display: block; margin-bottom: 30px;">
                ${cardsHtml}
            </div>

            <div id="bancos-detalle-view" style="display: none; animation: fadeIn 0.3s ease;">
                <!-- Detalle de transacciones y conciliación -->
            </div>
        `;
    },



    matriz() {
        return `
            <div class="glass-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px;">
                    <h3 style="margin: 0;">Matriz de Control Tributario</h3>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                        <span style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem;"><div style="width: 10px; height: 10px; border-radius: 50%; background: var(--success); flex-shrink:0;"></div> Al día</span>
                        <span style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem;"><div style="width: 10px; height: 10px; border-radius: 50%; background: var(--warning); flex-shrink:0;"></div> Atención (≤ 5 días / firma pronto)</span>
                        <span style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem;"><div style="width: 10px; height: 10px; border-radius: 50%; background: var(--danger); flex-shrink:0;"></div> Vencido (SRI o firma)</span>
                    </div>
                </div>

                <!-- Buscador Premium -->
                <div style="position: relative; margin-bottom: 20px; max-width: 420px;">
                    <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; display:flex;align-items:center;">${Icons.search()}</span>
                    <input
                        id="matriz-search-input"
                        type="text"
                        placeholder="Buscar por nombre o RUC..."
                        value="${App.escapeHTML(State.matrizSearch)}"
                        oninput="App.setMatrizSearch(this.value)"
                        style="padding-left: 42px; width: 100%; box-sizing: border-box; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-size: 0.9rem; height: 42px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;"
                        onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(var(--primary-rgb),0.15)';"
                        onblur="this.style.borderColor='var(--border-color)'; this.style.boxShadow='none';"
                    >
                    ${State.matrizSearch ? `<button onclick="App.setMatrizSearch('')" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; opacity:0.5; color:var(--text-primary);display:flex;align-items:center;">${Icons.close()}</button>` : ''}
                </div>

                <div class="table-container" style="overflow-x: auto; padding-bottom: 6px; margin: 0 2px;">
                    <table class="data-table" style="min-width: 940px; table-layout: fixed;">
                        <thead>
                            <tr>
                                <th style="width: 40px; text-align: center;">Est.</th>
                                <th>Cliente</th>
                                <th>RUC</th>
                                <th>Régimen</th>
                                <th style="text-align: center;">Día Máx.</th>
                                <th style="text-align: center;">Firma Expira</th>
                                <th style="text-align: center; width: 72px;">SUPER CIA</th>
                                <th style="text-align: center; width: 44px;">IVA</th>
                                <th style="text-align: center; width: 60px;">RENTA</th>
                                <th style="text-align: center; width: 44px;">ATS</th>
                                <th style="text-align: center; width: 44px;">ADI</th>
                                <th style="text-align: center; width: 38px;">GP</th>
                                <th style="text-align: center; width: 72px; word-break: keep-all;">REBEFICS</th>
                                <th style="text-align: center;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="matriz-table-body">
                            <!-- Rendereado por App.renderMatrizTable() -->
                        </tbody>
                    </table>
                </div>
                <div id="matriz-search-count" style="margin-top: 10px; font-size: 0.78rem; color: var(--text-secondary); text-align: right;"></div>
            </div>
        `;
    },

    getPageTitle() {
        const titles = {
            'dashboard': 'RESUMEN GENERAL',
            'clients': 'CARTERA DE CLIENTES',
            'sri': 'REGISTRO DE COMPRA Y VENTA',
            'cuentas': 'GESTIÓN DE CUENTAS',

            'matriz': 'MATRIZ DE CONTROL TRIBUTARIO',
            'bancos': 'CONTROL DE LIQUIDEZ'
        };
        return titles[State.currentRoute] || 'JF SYSTEM';
    },

    renderMiLiquidezWidget() {
        const sortedBancos = [...(State.bancosData || [])].sort((a, b) => {
            const isCajaA = a.nombre.toLowerCase().includes('caja');
            const isCajaB = b.nombre.toLowerCase().includes('caja');
            if (isCajaA && !isCajaB) return -1;
            if (!isCajaA && isCajaB) return 1;
            return a.nombre.localeCompare(b.nombre);
        });

        const totalLiquidez = sortedBancos.reduce((acc, b) => acc + (b.saldo_actual || 0), 0);

        const cardColors = {
            'bank-theme-pichincha': 'rgba(234, 179, 8, 0.1)',
            'bank-theme-guayaquil': 'rgba(219, 39, 119, 0.1)',
            'bank-theme-jep': 'rgba(5, 150, 105, 0.1)',
            'bank-theme-jardin': 'rgba(124, 58, 237, 0.1)',
            'bank-theme-austro': 'rgba(29, 78, 216, 0.1)',
            'bank-theme-generic': 'rgba(255, 255, 255, 0.05)'
        };

        const listHtml = sortedBancos.length === 0 
            ? `
            <div style="text-align:center; padding:24px 0; color:var(--text-secondary); font-size:0.82rem;">
                <div style="font-size:1.5rem; margin-bottom:8px;">🏦</div>
                Sin cuentas registradas.
                <button class="btn btn-secondary" onclick="App.showAddBancoModal()" style="font-size:0.72rem; padding:4px 8px; margin-top:8px; display:inline-block;">Agregar Cuenta</button>
            </div>`
            : sortedBancos.map(banco => {
                const bankInfo = this.getBankInfo(banco.nombre);
                let maskCta = 'N/D';
                if (banco.n_cuenta) {
                    const ctaClean = String(banco.n_cuenta).trim();
                    maskCta = ctaClean.length > 4 ? `•••• ${ctaClean.slice(-4)}` : ctaClean;
                } else if (banco.numero) {
                    const ctaClean = String(banco.numero).trim();
                    maskCta = ctaClean.length > 4 ? `•••• ${ctaClean.slice(-4)}` : ctaClean;
                }
                const formattedSaldo = State.hideAmounts ? '••••' : App.formatMoney(banco.saldo_actual || 0);

                return `
                <div class="liquidez-item" onclick="App.navigate('bancos'); App.openBancoDetail('${banco.id}')" style="display:flex; align-items:center; justify-content:space-between; padding:12px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); cursor:pointer; transition: all 0.2s ease; margin-bottom:8px;" onmouseover="this.style.background='rgba(255,255,255,0.06)'; this.style.borderColor='rgba(var(--primary-rgb),0.3)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='var(--border-color)';">
                    <div style="display:flex; align-items:center; gap:12px; min-width: 0; flex: 1;">
                        <div style="width:36px; height:36px; border-radius:8px; overflow:hidden; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; flex-shrink:0; border: 1px solid var(--border-color); padding: 4px;">
                            ${bankInfo.icon}
                        </div>
                        <div style="min-width: 0; flex: 1;">
                            <div style="font-weight:600; font-size:0.85rem; color:var(--text-primary); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${banco.nombre}</div>
                            <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">${banco.nombre.toLowerCase().includes('caja') ? 'Efectivo' : 'Cuenta'} • ${maskCta}</div>
                        </div>
                    </div>
                    <div style="font-family:var(--font-mono); font-size:0.9rem; font-weight:700; color:var(--text-primary); text-align:right; margin-left:12px;">
                        ${formattedSaldo}
                    </div>
                </div>
                `;
            }).join('');

        return `
        <div class="glass-card animate-stagger" style="animation-delay:0.3s; margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h3 style="margin:0; font-family:var(--font-heading); font-size:0.95rem; display:flex; align-items:center; gap:8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><path d="M8 7V5a2 2 0 0 0-4 0v2"/></svg>
                    MI LIQUIDEZ
                </h3>
                <span class="privacy-btn-sub" onclick="App.toggleHideAmounts()" style="cursor:pointer; display:flex; align-items:center; justify-content:center; padding:4px; border-radius:6px; background:rgba(255,255,255,0.05); color:var(--text-secondary); transition: all 0.2s;" onmouseover="this.style.color='var(--primary)'; this.style.background='rgba(255,255,255,0.1)';" onmouseout="this.style.color='var(--text-secondary)'; this.style.background='rgba(255,255,255,0.05)';">
                    ${State.hideAmounts 
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>` 
                        : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`}
                </span>
            </div>
            
            <div style="background:rgba(var(--primary-rgb),0.04); border:1px dashed rgba(var(--primary-rgb),0.18); border-radius:12px; padding:16px; margin-bottom:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                <span style="font-size:0.72rem; font-weight:600; letter-spacing:0.08em; color:var(--text-secondary); text-transform:uppercase; margin-bottom:4px;">TOTAL DISPONIBLE</span>
                <span style="font-family:var(--font-mono); font-size:1.75rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.5px; background:linear-gradient(135deg, var(--text-primary), rgba(var(--primary-rgb), 0.8)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">
                    ${State.hideAmounts ? '••••••' : App.formatMoney(totalLiquidez)}
                </span>
            </div>

            <div style="display:flex; flex-direction:column; max-height:260px; overflow-y:auto; padding-right:2px;">
                ${listHtml}
            </div>
        </div>
        `;
    },

    dashboard() {
        const meta = Store.get('dashboardMeta') || { totalRegistros: 0, mensual: {}, clientes: {} };
        const clients = (Store.get('clientes') || []).filter(c => c.status !== 'archived');

        const userName = State.currentUser?.displayName 
            ? State.currentUser.displayName.split(' ')[0] 
            : (State.currentUser?.email 
                ? State.currentUser.email.split('@')[0].split(/[\._-]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
                : 'Usuario');

        const userAvatar = State.currentUser?.photoURL 
            ? `<img src="${State.currentUser.photoURL}" alt="Perfil" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`
            : `<span style="font-size: 1.15rem; font-weight: 700; color: white;">${(userName || 'U').charAt(0).toUpperCase()}</span>`;

        const MESES = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

        const today = new Date();
        const currentDay = today.getDate();
        
        // Define dashboard period keys
        const dashYear = State.dashboardAnio || today.getFullYear();
        const dashMes = State.dashboardMes || (today.getMonth() + 1);
        const isAnnual = dashMes === 'all';
        
        let dashCurrentKey = isAnnual ? `${dashYear}` : `${dashYear}-${String(dashMes).padStart(2, '0')}`;
        let dashPrevKey = '';
        if (isAnnual) {
            dashPrevKey = `${dashYear - 1}`;
        } else {
            dashPrevKey = dashMes === 1
                ? `${dashYear - 1}-12`
                : `${dashYear}-${String(dashMes - 1).padStart(2, '0')}`;
        }

        // We use dashCurrentKey for personal dashboard below. 
        // For general system stats, we still want to show current calendar month by default, 
        // but let's align it all to the same filter!
        const curMonthMeta  = isAnnual ? (meta.mensual?.[dashCurrentKey] || { sales: 0, purchases: 0 }) /* Warning: meta.mensual is by YYYY-MM, so yearly meta needs aggregation here if we wanted global annual stats. */ : (meta.mensual?.[dashCurrentKey]  || { sales: 0, purchases: 0 });
        const prevMonthMeta = isAnnual ? { sales: 0, purchases: 0 } /* Skip prev annual comparison for simplicity */ : (meta.mensual?.[dashPrevKey] || { sales: 0, purchases: 0 });

        // Trend helpers
        const trendBadge = (cur, prev, invertGood = false) => {
            if (!prev || prev === 0) return '';
            const pct = ((cur - prev) / prev * 100).toFixed(1);
            const isUp = cur >= prev;
            const isGood = invertGood ? !isUp : isUp;
            const color = isGood ? 'var(--success)' : 'var(--danger)';
            const arrow = isUp ? '↑' : '↓';
            return `<span style="font-size:0.78rem; font-weight:600; color:${color}; background:${isGood ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}; padding:2px 8px; border-radius:20px;">${arrow} ${Math.abs(pct)}% vs mes ant.</span>`;
        };

        // Firmas por vencer (próximos 30 días)
        const expiringClients = clients.filter(c => {
            if (!c.firmaExpira) return false;
            const parts = c.firmaExpira.split('-');
            if (parts.length !== 3) return false;
            const exp = new Date(parts[0], parts[1] - 1, parts[2]);
            const diff = (exp - today) / (1000 * 60 * 60 * 24);
            return diff >= 0 && diff <= 30;
        });
        const expiringCount = expiringClients.length;

        // Obligaciones pendientes (<= 5 días)
        const pendingClients = clients.filter(c => {
            const diaMax = parseInt(c.diaMaximo) || 0;
            if (diaMax > 0) return (diaMax - currentDay) <= 5;
            return false;
        });
        const pendingDeadlinesCount = pendingClients.length;

        // Saldo total bancos
        const saldoTotal = (State.bancosData || []).reduce((a, b) => a + (b.saldo_actual || 0), 0);

        // Ventas y compras del mes
        const ventasMes = curMonthMeta.sales || 0;
        const comprasMes = curMonthMeta.purchases || 0;
        const prevVentas = prevMonthMeta.sales || 0;
        const prevCompras = prevMonthMeta.purchases || 0;

        // Próximos vencimientos (firmas + obligaciones, ordenados por urgencia)
        const proximosItems = [];
        expiringClients.forEach(c => {
            const parts = c.firmaExpira.split('-');
            const exp = new Date(parts[0], parts[1] - 1, parts[2]);
            const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
            proximosItems.push({ nombre: c.name, tipo: 'Firma', dias: diff, urgente: diff <= 7 });
        });
        pendingClients.forEach(c => {
            const diaMax = parseInt(c.diaMaximo);
            const diff = diaMax - currentDay;
            proximosItems.push({ nombre: c.name, tipo: 'Declaración', dias: diff, urgente: diff <= 2 });
        });
        proximosItems.sort((a, b) => a.dias - b.dias);

        // KPIs Dynamic Render
        let kpisHtml = '';
        const pendingTodosCount = (State.tareasData || []).filter(t => !t.completed).length;

        if (State.dashboardView === 'personal') {
            const jessicaStats = Store.getJessicaStatsForMonth(dashCurrentKey);
            const prevJessicaStats = isAnnual ? { sales: 0, purchases: 0 } : Store.getJessicaStatsForMonth(dashPrevKey);
            
            const honorarios = jessicaStats.sales || 0;
            const gastos = jessicaStats.purchases || 0;
            const neto = honorarios - gastos;
            
            const prevHonorarios = prevJessicaStats.sales || 0;
            const prevGastos = prevJessicaStats.purchases || 0;
            
            const jessicaCobrar = (State.cuentasCobrarData || []).filter(c => (parseFloat(c.pendiente) || 0) > 0);
            const jessicaPagar = (State.cuentasPagarData || []).filter(c => (parseFloat(c.pendiente) || 0) > 0);
            
            const totalPorCobrar = jessicaCobrar.reduce((sum, c) => sum + (parseFloat(c.pendiente) || 0), 0);
            const totalPorPagar = jessicaPagar.reduce((sum, c) => sum + (parseFloat(c.pendiente) || 0), 0);
            
            const monthLabel = isAnnual ? 'ANUAL' : MESES[dashMes].toUpperCase();
            
            kpisHtml = `
                <!-- Honorarios de Oficina -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.05s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #10b981, #059669);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(16,185,129,0.12);">${Icons.trendingUp ? Icons.trendingUp(18) : Icons.navSRI()}</div>
                            <span class="stat-label">HONORARIOS (${monthLabel})</span>
                        </div>
                        <div class="stat-num" data-counter="${honorarios}" data-counter-type="money" style="color: var(--success);">
                            ${State.hideAmounts ? '****' : App.formatMoney(honorarios)}
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-top: 12px; width: 100%; gap: 8px;">
                            <div style="flex-shrink: 0;">${trendBadge(honorarios, prevHonorarios)}</div>
                            <!-- Dashboard Period Selector inside Card Bottom -->
                            <div style="display: flex; align-items: center; gap: 4px; z-index: 2; flex-wrap: wrap;">
                                <select id="dash-mes-sel" class="premium-select" onchange="App.setDashboardPeriod()" style="font-size: 0.7rem; padding: 2px 20px 2px 6px; height: 26px; min-height: 26px; min-width: 0; border-radius: 6px; background: rgba(0,0,0,0.15) url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c026d3\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e') no-repeat right 4px center / 10px;">
                                    <option value="all" ${State.dashboardMes === 'all' ? 'selected' : ''}>Anual</option>
                                    ${MESES.map((m, i) => i > 0 ? `<option value="${i}" ${State.dashboardMes === i ? 'selected' : ''}>${m}</option>` : '').join('')}
                                </select>
                                <select id="dash-anio-sel" class="premium-select" onchange="App.setDashboardPeriod()" style="font-size: 0.7rem; padding: 2px 20px 2px 6px; height: 26px; min-height: 26px; min-width: 0; border-radius: 6px; background: rgba(0,0,0,0.15) url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c026d3\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e') no-repeat right 4px center / 10px;">
                                    ${[...Array(5)].map((_, i) => {
                                        const y = today.getFullYear() - i;
                                        return `<option value="${y}" ${State.dashboardAnio === y ? 'selected' : ''}>${y}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gastos de Oficina -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.1s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #f97316, #ef4444);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(249,115,22,0.12);">${Icons.trendingDown ? Icons.trendingDown(18) : Icons.navSRI()}</div>
                            <span class="stat-label">GASTOS (${monthLabel})</span>
                        </div>
                        <div class="stat-num" data-counter="${gastos}" data-counter-type="money" style="color: var(--danger);">
                            ${State.hideAmounts ? '****' : App.formatMoney(gastos)}
                        </div>
                        <div style="margin-top:6px;">${trendBadge(gastos, prevGastos, true)}</div>
                    </div>
                </div>

                <!-- Resultado Neto -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.15s;">
                    <div class="stat-bar" style="background: ${neto >= 0 ? 'linear-gradient(90deg, #0ea5e9, #6366f1)' : 'linear-gradient(90deg, #ef4444, #b91c1c)'};"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: ${neto >= 0 ? 'rgba(99,102,241,0.12)' : 'rgba(239,68,68,0.12)'};">⚖️</div>
                            <span class="stat-label">RESULTADO NETO</span>
                        </div>
                        <div class="stat-num" data-counter="${neto}" data-counter-type="money" style="color: ${neto >= 0 ? 'var(--primary)' : 'var(--danger)'};">
                            ${State.hideAmounts ? '****' : App.formatMoney(neto)}
                        </div>
                        <div style="margin-top:6px; font-size:0.75rem; color:var(--text-secondary);">Balance neto del periodo ${isAnnual ? 'anual seleccionado' : 'seleccionado'}</div>
                    </div>
                </div>

                <!-- Tareas Pendientes -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.2s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #a855f7, #ec4899);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(168,85,247,0.12);">📝</div>
                            <span class="stat-label">TAREAS PENDIENTES</span>
                        </div>
                        <div class="stat-num" data-counter="${pendingTodosCount}" data-counter-type="integer" style="color: #a855f7;">
                            ${pendingTodosCount}
                        </div>
                        <div style="margin-top:6px; font-size:0.75rem; color:var(--text-secondary);">Tareas por completar en tu lista</div>
                    </div>
                </div>

                <!-- Estado de Cuentas -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.25s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #3b82f6, #8b5cf6);"></div>
                    <div class="stat-body" style="padding-bottom: 12px;">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(59,130,246,0.12);">${Icons.navCuentas ? Icons.navCuentas(18) : '💸'}</div>
                            <span class="stat-label">ESTADO DE CUENTAS</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top: 10px; align-items:center;">
                            <div style="display:flex; flex-direction:column;">
                                <span style="font-size:0.65rem; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Por Cobrar</span>
                                <span class="stat-num" style="color: var(--success); font-size:1.15rem;">
                                    ${State.hideAmounts ? '****' : App.formatMoney(totalPorCobrar)}
                                </span>
                            </div>
                            <div style="width: 1px; height: 30px; background: rgba(255,255,255,0.1); margin: 0 10px;"></div>
                            <div style="display:flex; flex-direction:column;">
                                <span style="font-size:0.65rem; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Por Pagar</span>
                                <span class="stat-num" style="color: var(--danger); font-size:1.15rem;">
                                    ${State.hideAmounts ? '****' : App.formatMoney(totalPorPagar)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            kpisHtml = `
                <!-- Saldo Total Bancos -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.05s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #0ea5e9, #6366f1);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(99,102,241,0.12);">${Icons.bank ? Icons.bank(18) : Icons.navBancos()}</div>
                            <span class="stat-label">SALDO TOTAL BANCOS</span>
                        </div>
                        <div class="stat-num" data-counter="${saldoTotal}" data-counter-type="money" style="background: linear-gradient(135deg, #0ea5e9, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            ${State.hideAmounts ? '****' : App.formatMoney(saldoTotal)}
                        </div>
                        <div style="margin-top:6px;">${(State.bancosData||[]).length} cuenta${(State.bancosData||[]).length !== 1 ? 's' : ''} registrada${(State.bancosData||[]).length !== 1 ? 's' : ''}</div>
                    </div>
                </div>

                <!-- Ventas del Mes -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.1s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #22c55e, #16a34a);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(34,197,94,0.12);">${Icons.trendingUp ? Icons.trendingUp(18) : Icons.navSRI()}</div>
                            <span class="stat-label">VENTAS DEL MES</span>
                        </div>
                        <div class="stat-num" data-counter="${ventasMes}" data-counter-type="money" style="color: var(--success);">${State.hideAmounts ? '****' : App.formatMoney(ventasMes)}</div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-top: 12px; width: 100%; gap: 8px;">
                            <div style="flex-shrink: 0;">${trendBadge(ventasMes, prevVentas)}</div>
                            <!-- Dashboard Period Selector inside Card Bottom -->
                            <div style="display: flex; align-items: center; gap: 4px; z-index: 2; flex-wrap: wrap;">
                                <select id="dash-mes-sel" class="premium-select" onchange="App.setDashboardPeriod()" style="font-size: 0.7rem; padding: 2px 20px 2px 6px; height: 26px; min-height: 26px; min-width: 0; border-radius: 6px; background: rgba(0,0,0,0.15) url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c026d3\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e') no-repeat right 4px center / 10px;">
                                    <option value="all" ${State.dashboardMes === 'all' ? 'selected' : ''}>Anual</option>
                                    ${MESES.map((m, i) => i > 0 ? `<option value="${i}" ${State.dashboardMes === i ? 'selected' : ''}>${m}</option>` : '').join('')}
                                </select>
                                <select id="dash-anio-sel" class="premium-select" onchange="App.setDashboardPeriod()" style="font-size: 0.7rem; padding: 2px 20px 2px 6px; height: 26px; min-height: 26px; min-width: 0; border-radius: 6px; background: rgba(0,0,0,0.15) url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c026d3\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e') no-repeat right 4px center / 10px;">
                                    ${[...Array(5)].map((_, i) => {
                                        const y = today.getFullYear() - i;
                                        return `<option value="${y}" ${State.dashboardAnio === y ? 'selected' : ''}>${y}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compras del Mes -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.15s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #f97316, #ef4444);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(249,115,22,0.12);">${Icons.trendingDown ? Icons.trendingDown(18) : Icons.navSRI()}</div>
                            <span class="stat-label">COMPRAS DEL MES</span>
                        </div>
                        <div class="stat-num" data-counter="${comprasMes}" data-counter-type="money" style="color: var(--danger);">${State.hideAmounts ? '****' : App.formatMoney(comprasMes)}</div>
                        <div style="margin-top:6px;">${trendBadge(comprasMes, prevCompras, true)}</div>
                    </div>
                </div>

                <!-- Firmas por Vencer -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.2s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #a855f7, #ec4899);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(168,85,247,0.12);">${Icons.navMatriz()}</div>
                            <span class="stat-label">FIRMAS POR VENCER</span>
                        </div>
                        ${expiringCount === 0
                            ? `<div class="stat-num" style="color: var(--success); font-size: 1.6rem;">✓</div>
                               <div style="margin-top:6px; font-size:0.8rem; color:var(--success); font-weight:600;">Todo al día</div>`
                            : `<div class="stat-num" data-counter="${expiringCount}" data-counter-type="integer" style="color: var(--danger);">${expiringCount}</div>
                               <button class="btn btn-secondary" onclick="App.navigate('matriz')" style="font-size:0.75rem; padding:5px 10px; width:100%; margin-top:8px;">Revisar Matriz</button>`
                        }
                    </div>
                </div>

                <!-- Clientes Activos -->
                <div class="stat-card stat-card-hero animate-stagger" style="animation-delay: 0.25s;">
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background:rgba(255,255,255,0.18); filter:brightness(0) invert(1);">${Icons.navClients()}</div>
                            <span class="stat-label" style="color:rgba(255,255,255,0.72);">CLIENTES ACTIVOS</span>
                        </div>
                        <div class="stat-num" data-counter="${clients.length}" data-counter-type="integer" style="color:white; text-shadow:0 0 20px rgba(255,255,255,0.3);">${clients.length}</div>
                        <button class="btn" onclick="App.navigate('clients')" style="background:rgba(255,255,255,0.16); color:white; border:1.5px solid rgba(255,255,255,0.42); width:100%; margin-top:10px; font-size:0.75rem; padding:6px 12px; backdrop-filter:blur(8px);">Gestionar</button>
                    </div>
                </div>
            `;
        }

        let columnsHtml = '';
        if (State.dashboardView === 'personal') {
            columnsHtml = `
            <div class="form-grid" style="grid-template-columns: 1.2fr 1.8fr; gap: 24px; align-items: start;">
                <!-- COLUMNA IZQUIERDA (Liquidez + Tareas) -->
                <div style="display:flex; flex-direction:column; gap:20px;">
                    ${this.renderMiLiquidezWidget()}
                    
                    <!-- Widget: Tareas Pendientes -->
                    <div class="glass-card animate-stagger" style="animation-delay:0.35s;">
                        <h3 style="margin:0 0 16px; font-family:var(--font-heading); font-size:0.95rem; display:flex; align-items:center; justify-content:space-between; gap:8px;">
                            <span style="display:flex; align-items:center; gap:8px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                                TAREAS PENDIENTES
                            </span>
                            <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:normal;" id="todo-count">${pendingTodosCount} pendientes</span>
                        </h3>
                        <div style="display:flex; gap:8px; margin-bottom:12px;">
                            <input type="text" id="new-todo-input" placeholder="Nueva tarea..." style="flex:1; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:rgba(255,255,255,0.05); color:var(--text-primary); font-size:0.85rem;" onkeypress="if(event.key === 'Enter') App.addTodo()">
                            <button type="button" class="btn btn-primary" onclick="App.addTodo()" style="padding:8px 12px; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                        </div>
                        <div id="todo-list" style="display:flex; flex-direction:column; gap:8px; max-height:220px; overflow-y:auto; padding-right:4px;">
                            ${this.renderTodoList()}
                        </div>
                    </div>
                </div>

                <!-- COLUMNA DERECHA (Gráfica + Vencimientos) -->
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <!-- CHART con filtro de período -->
                    <div class="glass-card animate-stagger" style="animation-delay: 0.4s;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
                            <h3 style="margin:0; font-family:var(--font-heading); font-size:1rem; text-transform: uppercase;">
                                Evolución de Oficina (Honorarios vs Gastos)
                            </h3>
                            <div style="display:flex; gap:6px;">
                                ${['3M','6M','1A'].map(p => `
                                    <button id="chart-period-${p}" onclick="App.setChartPeriod('${p}')"
                                        class="btn btn-secondary"
                                        style="padding:4px 12px; font-size:0.75rem; font-weight:600; ${(State.chartPeriod||'6M') === p ? 'background:var(--primary); color:white; border-color:var(--primary);' : ''}">
                                        ${p}
                                    </button>`).join('')}
                            </div>
                        </div>
                        <div style="height:300px; position:relative;">
                            <canvas id="dashboardChart"></canvas>
                        </div>
                    </div>

                    <!-- NUEVO WIDGET: Top Clientes -->
                    <div class="glass-card animate-stagger" style="animation-delay: 0.42s;">
                        <h3 style="margin:0 0 16px; font-family:var(--font-heading); font-size:1rem; text-transform: uppercase;">
                            Top 5 Clientes por Ganancias
                        </h3>
                        <div style="height:250px; position:relative; display:flex; justify-content:center;">
                            <canvas id="topClientesChart"></canvas>
                        </div>
                    </div>

                    <!-- Widget: Próximos Vencimientos -->
                    <div class="glass-card animate-stagger" style="animation-delay: 0.45s;">
                        <h3 style="margin:0 0 16px; font-family:var(--font-heading); font-size:0.95rem; display:flex; align-items:center; gap:8px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            PRÓXIMOS VENCIMIENTOS
                        </h3>
                        ${proximosItems.length === 0
                            ? `<div style="text-align:center; padding:20px 0; color:var(--success);">
                                   <div style="font-size:1.8rem; margin-bottom:6px;">✓</div>
                                   <div style="font-size:0.85rem; font-weight:600;">Sin vencimientos próximos</div>
                               </div>`
                            : `<div style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto;">
                                ${proximosItems.slice(0, 6).map(item => `
                                    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:10px; background:${item.urgente ? 'rgba(239,68,68,0.08)' : 'rgba(var(--primary-rgb),0.05)'}; border-left:3px solid ${item.urgente ? 'var(--danger)' : 'var(--primary)'}; border: 1px solid var(--border-color);">
                                        <div>
                                            <div style="font-weight:600; font-size:0.82rem;">${item.nombre}</div>
                                            <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">${item.tipo}</div>
                                        </div>
                                        <span style="font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:12px; background:${item.urgente ? 'rgba(239,68,68,0.15)' : 'rgba(var(--primary-rgb),0.12)'}; color:${item.urgente ? 'var(--danger)' : 'var(--primary)'}; white-space:nowrap;">
                                            ${item.dias <= 0 ? 'Hoy' : item.dias === 1 ? 'Mañana' : `${item.dias}d`}
                                        </span>
                                    </div>
                                `).join('')}
                               </div>`
                        }
                    </div>
                </div>
            </div>
            `;
        } else {
            // Contable view (traditional columns: 2fr 1fr)
            columnsHtml = `
            <div class="form-grid" style="grid-template-columns: 2fr 1fr; gap: 24px; align-items: start;">
                <!-- COLUMNA IZQUIERDA (Gráfica) -->
                <div class="glass-card animate-stagger" style="animation-delay: 0.3s;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
                        <h3 style="margin:0; font-family:var(--font-heading); font-size:1rem; text-transform: uppercase;">
                            EVOLUCIÓN MENSUAL (VENTAS VS COMPRAS)
                        </h3>
                        <div style="display:flex; gap:6px;">
                            ${['3M','6M','1A'].map(p => `
                                <button id="chart-period-${p}" onclick="App.setChartPeriod('${p}')"
                                    class="btn btn-secondary"
                                    style="padding:4px 12px; font-size:0.75rem; font-weight:600; ${(State.chartPeriod||'6M') === p ? 'background:var(--primary); color:white; border-color:var(--primary);' : ''}">
                                    ${p}
                                </button>`).join('')}
                        </div>
                    </div>
                    <div style="height:300px; position:relative;">
                        <canvas id="dashboardChart"></canvas>
                    </div>
                </div>

                <!-- COLUMNA DERECHA (Límites RIMPE + Vencimientos + Tareas) -->
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <!-- Widget: Límites RIMPE -->
                    <div class="glass-card animate-stagger" style="animation-delay:0.35s;">
                        <h3 style="margin:0 0 16px; font-family:var(--font-heading); font-size:0.95rem;">LÍMITES RIMPE</h3>
                        <div style="display:flex; flex-direction:column; gap:12px; max-height:220px; overflow-y:auto;">
                            ${this.renderLimitAlerts()}
                        </div>
                    </div>

                    <!-- Widget: Próximos Vencimientos -->
                    <div class="glass-card animate-stagger" style="animation-delay:0.4s;">
                        <h3 style="margin:0 0 16px; font-family:var(--font-heading); font-size:0.95rem; display:flex; align-items:center; gap:8px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            PRÓXIMOS VENCIMIENTOS
                        </h3>
                        ${proximosItems.length === 0
                            ? `<div style="text-align:center; padding:20px 0; color:var(--success);">
                                   <div style="font-size:1.8rem; margin-bottom:6px;">✓</div>
                                   <div style="font-size:0.85rem; font-weight:600;">Sin vencimientos próximos</div>
                               </div>`
                            : `<div style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto;">
                                ${proximosItems.slice(0, 6).map(item => `
                                    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:10px; background:${item.urgente ? 'rgba(239,68,68,0.08)' : 'rgba(var(--primary-rgb),0.05)'}; border-left:3px solid ${item.urgente ? 'var(--danger)' : 'var(--primary)'}; border: 1px solid var(--border-color);">
                                        <div>
                                            <div style="font-weight:600; font-size:0.82rem;">${item.nombre}</div>
                                            <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">${item.tipo}</div>
                                        </div>
                                        <span style="font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:12px; background:${item.urgente ? 'rgba(239,68,68,0.15)' : 'rgba(var(--primary-rgb),0.12)'}; color:${item.urgente ? 'var(--danger)' : 'var(--primary)'}; white-space:nowrap;">
                                            ${item.dias <= 0 ? 'Hoy' : item.dias === 1 ? 'Mañana' : `${item.dias}d`}
                                        </span>
                                    </div>
                                `).join('')}
                               </div>`
                        }
                    </div>

                    <!-- Widget: Tareas Pendientes -->
                    <div class="glass-card animate-stagger" style="animation-delay:0.45s;">
                        <h3 style="margin:0 0 16px; font-family:var(--font-heading); font-size:0.95rem; display:flex; align-items:center; justify-content:space-between; gap:8px;">
                            <span style="display:flex; align-items:center; gap:8px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                                TAREAS PENDIENTES
                            </span>
                            <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:normal;" id="todo-count">${pendingTodosCount} pendientes</span>
                        </h3>
                        <div style="display:flex; gap:8px; margin-bottom:12px;">
                            <input type="text" id="new-todo-input" placeholder="Nueva tarea..." style="flex:1; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:rgba(255,255,255,0.05); color:var(--text-primary); font-size:0.85rem;" onkeypress="if(event.key === 'Enter') App.addTodo()">
                            <button type="button" class="btn btn-primary" onclick="App.addTodo()" style="padding:8px 12px; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                        </div>
                        <div id="todo-list" style="display:flex; flex-direction:column; gap:8px; max-height:220px; overflow-y:auto; padding-right:4px;">
                            ${this.renderTodoList()}
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        return `
            <!-- ── SMART BANNER ─────────────────────────────────────────── -->
            ${this.renderDashboardBanner()}

            <!-- ── SLEEK GREETING & SWITCH HEADER ────────────────────── -->
            <div class="glass-card animate-stagger" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; margin-bottom: 20px; border-radius: 14px; gap: 16px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, #c084fc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(99,102,241,0.3); overflow: hidden;">
                        ${userAvatar}
                    </div>
                    <div>
                        <h2 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">¡Hola, ${userName}!</h2>
                        <p style="margin: 2px 0 0; font-size: 0.78rem; color: var(--text-secondary);">${State.dashboardView === 'personal' ? 'Mi Oficina Personal' : 'Panel Contable de Clientes'}</p>
                    </div>
                </div>
                </div>

                <!-- Slidable Hybrid View Switch -->
                <div style="display: flex; background: rgba(0,0,0,0.15); padding: 4px; border-radius: 30px; border: 1px solid var(--border-color); position: relative; gap: 4px;">
                    <button onclick="App.setDashboardView('personal')" style="border: none; background: ${State.dashboardView === 'personal' ? 'var(--primary)' : 'transparent'}; color: ${State.dashboardView === 'personal' ? '#ffffff' : 'var(--text-secondary)'}; font-size: 0.8rem; font-weight: 700; padding: 8px 16px; border-radius: 20px; cursor: pointer; transition: all 0.25s; display: flex; align-items: center; gap: 6px;">
                        💼 Mi Oficina
                    </button>
                    <button onclick="App.setDashboardView('contable')" style="border: none; background: ${State.dashboardView === 'contable' ? 'var(--primary)' : 'transparent'}; color: ${State.dashboardView === 'contable' ? '#ffffff' : 'var(--text-secondary)'}; font-size: 0.8rem; font-weight: 700; padding: 8px 16px; border-radius: 20px; cursor: pointer; transition: all 0.25s; display: flex; align-items: center; gap: 6px;">
                        📊 Panel Clientes
                    </button>
                </div>
            </div>


            <!-- ── KPI CARDS ─────────────────────────────────────────────── -->
            <div class="dashboard-kpi-grid" style="margin-bottom: 28px;">
                ${kpisHtml}
            </div>

            <!-- ── MAIN CONTENT AREA ──────────────────────────────────────── -->
            ${columnsHtml}

            <!-- ── ACTIVIDAD RECIENTE ──────────────────────────────────── -->
            <div class="glass-card animate-stagger" style="margin-top:24px; animation-delay:0.5s;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
                    <h3 style="margin:0; font-family:var(--font-heading); font-size:1rem; display:flex; align-items:center; gap:8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        ACTIVIDAD RECIENTE
                    </h3>
                    <button class="btn btn-secondary" onclick="App.navigate('sri')" style="font-size:0.75rem; padding:5px 12px;">Ver todo →</button>
                </div>
                <div id="recent-activity-list">${this.renderRecentActivity()}</div>
            </div>
        `;
    },

    renderTodoList() {
        const todos = State.tareasData || [];
        if (todos.length === 0) {
            return `
            <div style="text-align:center; padding:20px 0; color:var(--text-secondary); font-size:0.82rem;">
                No tienes tareas pendientes. ¡Buen trabajo!
            </div>`;
        }
        return todos.map(todo => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:10px; background:rgba(var(--primary-rgb),0.05); border:1px solid var(--border-color); transition: all 0.2s;">
                <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:0;">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="App.toggleTodo('${todo.id}', this.checked)" style="width:16px; height:16px; cursor:pointer; accent-color:var(--primary);">
                    <span style="font-size:0.82rem; font-weight:500; text-decoration:${todo.completed ? 'line-through' : 'none'}; color:${todo.completed ? 'var(--text-secondary)' : 'var(--text-primary)'}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; transition: all 0.2s;">
                        ${App.escapeHTML(todo.text)}
                    </span>
                </div>
                <button onclick="App.deleteTodo('${todo.id}')" title="Eliminar" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:0.9rem; padding:4px; opacity:0.6; transition: opacity 0.15s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">
                    ✕
                </button>
            </div>
        `).join('');
    },

    renderDashboardBanner() {
        const clients   = (Store.get('clientes') || []).filter(c => c.status !== 'archived');
        const meta      = Store.get('dashboardMeta') || {};
        const today     = new Date();
        const currentDay   = today.getDate();
        const currentMonth = today.getMonth() + 1;
        const currentYear  = today.getFullYear();
        const monthKey     = `${currentYear}-${String(currentMonth).padStart(2,'0')}`;
        const prevMonthKey = currentMonth === 1
            ? `${currentYear - 1}-12`
            : `${currentYear}-${String(currentMonth - 1).padStart(2,'0')}`;

        // ─ Priority 1: Firma vence hoy o mañana ─────────────────────────────
        const criticalFirmas = clients.filter(c => {
            if (!c.firmaExpira) return false;
            const [y, m, d] = c.firmaExpira.split('-');
            const diff = Math.ceil((new Date(y, m-1, d) - today) / 864e5);
            return diff >= 0 && diff <= 1;
        });
        if (criticalFirmas.length > 0) {
            const isToday = criticalFirmas[0].firmaExpira === today.toISOString().split('T')[0];
            const txt = criticalFirmas.length === 1
                ? `La firma de <strong>${criticalFirmas[0].name}</strong> vence <strong>${isToday ? 'hoy' : 'mañana'}</strong>. Acción inmediata requerida.`
                : `<strong>${criticalFirmas.length} firmas</strong> vencen hoy o mañana. Revisión urgente.`;
            return this._banner('danger', '🔴', txt, 'matriz');
        }

        // ─ Priority 2: 2+ firmas vencen esta semana ─────────────────────────
        const weekFirmas = clients.filter(c => {
            if (!c.firmaExpira) return false;
            const [y, m, d] = c.firmaExpira.split('-');
            const diff = Math.ceil((new Date(y, m-1, d) - today) / 864e5);
            return diff >= 2 && diff <= 7;
        });
        if (weekFirmas.length >= 2) {
            return this._banner('warning', '⚠️',
                `<strong>${weekFirmas.length} firmas</strong> vencen esta semana. Revisa la matriz de control.`, 'matriz');
        }

        // ─ Priority 3: Declaración en los próximos 2 días ───────────────────
        const urgentDecl = clients.filter(c => {
            const diaMax = parseInt(c.diaMaximo) || 0;
            if (!diaMax) return false;
            const diff = diaMax - currentDay;
            return diff >= 0 && diff <= 2;
        });
        if (urgentDecl.length > 0) {
            const names = urgentDecl.map(c => c.name).slice(0, 2).join(', ');
            const extra = urgentDecl.length > 2 ? ` y ${urgentDecl.length - 2} más` : '';
            return this._banner('warning', '📋',
                `Declaración próxima: <strong>${names}${extra}</strong>. Fecha límite en los próximos 2 días.`, 'sri');
        }

        // ─ Priority 4: Ventas positivas vs mes anterior ──────────────────────
        const curSales  = meta.mensual?.[monthKey]?.sales || 0;
        const prevSales = meta.mensual?.[prevMonthKey]?.sales || 0;
        if (curSales > 0 && prevSales > 0 && curSales > prevSales) {
            const pct = ((curSales - prevSales) / prevSales * 100).toFixed(1);
            return this._banner('success', '📈',
                `¡Buen ritmo! Las ventas de este mes superan al anterior en <strong>${pct}%</strong>. Sigue así.`, null);
        }

        // ─ Priority 5: Todo al día ───────────────────────────────────────────
        const mNames = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        return this._banner('celebration', '🔔',
            `¡Todo al día en <strong>${mNames[currentMonth]} ${currentYear}</strong>! Sin alertas pendientes, excelente trabajo.`, null);
    },

    _banner(type, emoji, message, navTarget) {
        const s = {
            danger:  { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)',  accent: '#ef4444' },
            warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', accent: '#f59e0b' },
            success: { bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.3)',  accent: '#22c55e' },
            info:    { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)', accent: '#3b82f6' },
            celebration: { 
                bg: 'rgba(239, 68, 68, 0.12)', 
                border: 'rgba(239, 68, 68, 0.4)', 
                accent: '#ef4444',
                extraStyle: 'color: #ef4444; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.1);'
            }
        }[type] || {};
        const actionBtn = navTarget
            ? `<button class="btn btn-secondary" onclick="App.navigate('${navTarget}')" style="font-size:0.74rem; padding:4px 12px; flex-shrink:0; white-space:nowrap;">Ver &rarr;</button>`
            : '';
        return `<div class="dashboard-banner" style="background:${s.bg}; border:1px solid ${s.border}; border-left:4px solid ${s.accent}; border-radius:12px; padding:13px 18px; margin-bottom:20px; display:flex; align-items:center; gap:12px; transition: all 0.3s ease; ${s.extraStyle || ''}">
            <span style="font-size:1.15rem; flex-shrink:0; filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));">${emoji}</span>
            <p style="margin:0; flex:1; font-size:1.15rem; line-height:1.55; color:var(--text-primary);">${message}</p>
            ${actionBtn}
            <button onclick="this.closest('.dashboard-banner').style.display='none'" title="Cerrar" style="background:none; border:none; cursor:pointer; color:var(--text-secondary); font-size:1rem; flex-shrink:0; padding:0 4px; line-height:1; opacity:0.6; transition:opacity 0.15s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">✕</button>
        </div>`;
    },

    renderRecentActivity() {
        const registros = Store.get('sri_registros') || [];
        const clients = Store.get('clientes') || [];
        const meses = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

        const sorted = [...registros]
            .filter(r => !r.anulada)
            .sort((a, b) => {
                if (a.fecha && b.fecha) return new Date(b.fecha) - new Date(a.fecha);
                if (b.anio !== a.anio) return (b.anio || 0) - (a.anio || 0);
                return (b.mes || 0) - (a.mes || 0);
            })
            .slice(0, 8);

        if (sorted.length === 0) {
            return `<div style="text-align:center; padding:24px 0; color:var(--text-secondary); font-size:0.88rem;">Sin transacciones recientes registradas.</div>`;
        }

        const rows = sorted.map(r => {
            const client = clients.find(c => c.id === r.clientId);
            const name = r.tipo === 'compra'
                ? (r.proveedor || client?.name || 'Proveedor')
                : (client?.name || 'Cliente');
            const isVenta = r.tipo === 'venta';
            const amount = (r.subt15 || 0) + (r.subt0 || 0) + (r.subt5 || 0) + (r.iva || 0);
            const fecha = r.fecha
                ? new Date(r.fecha + 'T00:00:00').toLocaleDateString('es-EC', { day: '2-digit', month: 'short' })
                : (r.mes ? `${meses[r.mes]} ${r.anio || ''}` : '—');
            const iconColor = isVenta ? 'var(--success)' : 'var(--danger)';
            const iconBg   = isVenta ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';
            const icon     = isVenta
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`;

            return `
            <div class="activity-row" style="display:flex; align-items:center; gap:14px; padding:11px 0; border-bottom:1px solid var(--glass-border);">
                <div style="width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:${iconBg}; color:${iconColor};">${icon}</div>
                <div style="flex:1; min-width:0;">
                    <div style="font-weight:600; font-size:0.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${name}</div>
                    <div style="font-size:0.73rem; color:var(--text-secondary); margin-top:2px;">${isVenta ? 'Venta' : 'Compra'}${r.numero ? ' &bull; Fact. #' + r.numero : ''}</div>
                </div>
                <div style="text-align:right; flex-shrink:0;">
                    <div style="font-weight:700; font-size:0.9rem; color:${iconColor};">${isVenta ? '+' : '-'}${State.hideAmounts ? '****' : App.formatMoney(amount)}</div>
                    <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">${fecha}</div>
                </div>
            </div>`;
        }).join('');

        return `<div style="display:grid; grid-template-columns:1fr 1fr; gap:0 32px;">${rows}</div>`;
    },

    renderLimitAlerts() {
        const clients = (Store.get('clientes') || []).filter(c => c.status !== 'archived');
        const meta = Store.get('dashboardMeta') || { totalRegistros: 0, mensual: {}, clientes: {} };
        const currentYear = new Date().getFullYear().toString();

        return clients.map(c => {
            const sales = meta.clientes[c.id]?.[currentYear]?.sales || 0;
            
            const limit = LIMITS[c.regime] || Infinity;
            if (limit === Infinity) return '';

            const percent = Math.min((sales / limit) * 100, 100);
            const statusClass = percent > 90 ? 'danger' : percent > 70 ? 'warning' : '';

            return `
                <div style="padding: 16px; background: rgba(var(--primary-rgb), 0.05); border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 700; font-size: 0.85rem;">${c.name}</span>
                        <span style="font-size: 0.8rem; opacity: 0.7;">${percent.toFixed(1)}%</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar ${statusClass}" style="width: ${percent}%"></div>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">
                        ${App.formatMoney(sales)} / ${App.formatMoney(limit)}
                    </div>
                </div>
            `;
        }).join('');
    },

    renderSRISummary() {
        const mes = State.sriMes;
        const anio = State.sriAnio;
        const all = Store.get('sri_registros').filter(r =>
            r.clientId === State.currentClientId && r.tipo &&
            r.mes === mes && r.anio === anio
        );
        let ventas  = all.filter(r => r.tipo === 'venta' && !r.anulada);
        let compras = all.filter(r => r.tipo === 'compra');

        const searchV = App.removeAccents((State.sriSearch_venta || '').toLowerCase());
        const searchC = App.removeAccents((State.sriSearch_compra || '').toLowerCase());

        if (searchV) {
            ventas = ventas.filter(r => App.removeAccents(`${r.factura || ''} ${r.clienteNombre || ''} ${r.rucCedula || ''}`.toLowerCase()).includes(searchV));
        }
        if (searchC) {
            compras = compras.filter(r => App.removeAccents(`${r.factura || ''} ${r.proveedor || ''} ${r.ruc || ''}`.toLowerCase()).includes(searchC));
        }
        const totalVentas   = ventas.reduce((s, r)  => s + (r.subt15||0) + (r.subt0||0), 0);
        const totalCompras  = compras.reduce((s, r) => s + (r.subt15||0) + (r.subt0||0) + (r.subt5||0), 0);
        const ivaVentas     = ventas.reduce((s, r)  => s + (r.iva||0), 0);
        const ivaCompras    = compras.reduce((s, r) => s + (r.iva||0), 0);
        const balance = ivaVentas - ivaCompras;
        const fmt = n => App.formatMoney(n);
        return `
            <div class="stat-card" style="border-top: 3px solid var(--success);">
                <div class="stat-body" style="padding: 14px 18px;">
                    <div class="stat-label">VENTAS NETAS (${mes}/${anio})</div>
                    <div class="stat-num" style="font-size:1.6rem; color: var(--success);">${fmt(totalVentas)}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">IVA: ${fmt(ivaVentas)}</div>
                </div>
            </div>
            <div class="stat-card" style="border-top: 3px solid var(--danger);">
                <div class="stat-body" style="padding: 14px 18px;">
                    <div class="stat-label">COMPRAS NETAS (${mes}/${anio})</div>
                    <div class="stat-num" style="font-size:1.6rem; color: var(--danger);">${fmt(totalCompras)}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">IVA: ${fmt(ivaCompras)}</div>
                </div>
            </div>
            <div class="stat-card" style="border-top: 3px solid var(--primary);">
                <div class="stat-body" style="padding: 14px 18px;">
                    <div class="stat-label">BALANCE IVA</div>
                    <div class="stat-num" style="font-size:1.6rem; color:${balance > 0 ? 'var(--danger)' : (balance < 0 ? 'var(--success)' : 'var(--text-secondary)')}">${fmt(balance)}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">${balance > 0 ? 'A pagar' : (balance < 0 ? 'A favor' : 'Al día')}</div>
                </div>
            </div>
        `;
    },

    sri() {
        const MESES = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const now = new Date();
        const clients = Store.get('clientes') || [];
        const selectedClient = clients.find(c => c.id === State.currentClientId);
        const isAdmin = Store.getUserRole() === 'admin';

        if (!State.currentClientId) {
            // Calculate global stats for selected month from Store.dashboardMeta
            const meta = Store.get('dashboardMeta') || { mensual: {} };
            const key = `${State.sriAnio}-${String(State.sriMes).padStart(2, '0')}`;
            const monthMeta = meta.mensual?.[key] || { sales: 0, purchases: 0 };
            const balance = (monthMeta.sales || 0) - (monthMeta.purchases || 0);

            return `
                <div class="sri-dashboard-welcome">
                    <!-- Global Monthly Summary -->
                    <div class="sri-welcome-header animate-fadeIn">
                        <div class="welcome-text">
                            <h1>Gestión de Compra y Venta</h1>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">Resumen global del sistema para el período seleccionado.</p>
                        </div>
                        <div class="welcome-period-selector">
                            <select id="sri-mes-sel" class="premium-select" onchange="App.setSRIPeriod()">
                                ${MESES.map((m, i) => i > 0 ? `<option value="${i}" ${State.sriMes === i ? 'selected' : ''}>${m}</option>` : '').join('')}
                            </select>
                            <select id="sri-anio-sel" class="premium-select" onchange="App.setSRIPeriod()">
                                ${[...Array(5)].map((_, i) => {
                                    const y = now.getFullYear() - i;
                                    return `<option value="${y}" ${State.sriAnio === y ? 'selected' : ''}>${y}</option>`;
                                }).join('')}
                            </select>
                        </div>
                    </div>



                    <!-- Search Container -->
                    <div class="sri-search-section glass-card animate-fadeIn" style="animation-delay: 0.1s;">
                        <div class="search-header">
                            <div class="search-icon">${Icons.search(28)}</div>
                            <div class="search-header-text">
                                <h2>Selección de Cliente</h2>
                                <p>Busca por nombre o RUC para gestionar contabilidad y registros del SRI.</p>
                            </div>
                        </div>
                        
                        <div class="sri-autocomplete-container">
                            <div class="search-box-wrapper">
                                <span class="search-main-icon">${Icons.search(18)}</span>
                                <input type="text" 
                                    id="sri-client-search" 
                                    placeholder="Nombre del cliente o RUC..." 
                                    autocomplete="off"
                                    oninput="App.filterSriClients(this.value)"
                                    onfocus="App.filterSriClients(this.value)"
                                    onblur="setTimeout(() => { const el = document.getElementById('sri-client-suggestions'); if(el) el.style.display = 'none'; }, 200)">
                                <ul id="sri-client-suggestions" class="autocomplete-list"></ul>
                            </div>
                        </div>

                        <div class="recent-clients-section">
                            <h3>Clientes Registrados</h3>
                            <div class="recent-grid">
                                ${this.renderRecentSriClients()}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        const mesOpts  = MESES.slice(1).map((m,i) => `<option value="${i+1}" ${State.sriMes===i+1?'selected':''}>${m}</option>`).join('');
        const anioOpts = [now.getFullYear(), now.getFullYear()-1, now.getFullYear()-2].map(y => `<option value="${y}" ${State.sriAnio===y?'selected':''}>${y}</option>`).join('');

        const ventaForm = isAdmin ? `
        <form id="sri-form-ventas" onsubmit="App.handleSRISubmit(event,'venta')" class="glass-card animate-fadeIn" style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                <h4 style="margin:0;color:var(--success);font-size:0.95rem;">${Icons.navClients()} Nuevo Registro de Venta</h4>
                <button type="button" class="btn btn-secondary" onclick="App.resetSRIForm('ventas')" style="font-size:0.75rem;padding:5px 12px;">Limpiar</button>
            </div>
            <div class="form-grid" style="grid-template-columns:repeat(auto-fill,minmax(175px,1fr));">
                <div class="form-group"><label>N° Factura *</label><input type="text" id="venta-factura" placeholder="001-001-000000001" required></div>
                <div class="form-group"><label>Cliente / Razón Social</label><input type="text" id="venta-cliente" placeholder="Nombre comprador"></div>
                <div class="form-group"><label>RUC / Cédula</label><input type="text" id="venta-ruc" placeholder="0000000000001"></div>
                <div class="form-group"><label>Fecha *</label><input type="date" id="venta-fecha" required></div>
                <div class="form-group"><label>Subtotal 15%</label><input type="number" step="0.01" min="0" id="venta-subt15" placeholder="0.00" oninput="App.calculateVentaIVA()"></div>
                <div class="form-group"><label>Subtotal 0%</label><input type="number" step="0.01" min="0" id="venta-subt0" placeholder="0.00" oninput="App.calculateVentaIVA()"></div>
                <div class="form-group"><label>IVA (calculado)</label><input type="text" id="venta-iva" readonly style="background:rgba(var(--success-rgb,34,197,94),0.06);font-weight:700;color:var(--success);"></div>
                <div class="form-group"><label>Total (calculado)</label><input type="text" id="venta-total" readonly style="background:rgba(var(--primary-rgb),0.06);font-weight:800;color:var(--primary);"></div>
            </div>
            <div style="display:flex;align-items:center;gap:16px;margin-top:8px;flex-wrap:wrap;">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.85rem;font-weight:500;text-transform:none;letter-spacing:0;">
                    <input type="checkbox" id="venta-anulada" style="width:auto;padding:0;"> Marcar como ANULADA
                </label>
                <button type="submit" class="btn btn-primary" style="margin-left:auto;">Guardar Venta</button>
            </div>
        </form>` : '';

        const compraForm = isAdmin ? `
        <form id="sri-form-compras" onsubmit="App.handleSRISubmit(event,'compra')" class="glass-card animate-fadeIn" style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                <h4 style="margin:0;color:var(--danger);font-size:0.95rem;">${Icons.navMatriz()} Nuevo Registro de Compra</h4>
                <div style="display:flex; gap:10px;">
                    <button type="button" class="btn btn-secondary" onclick="App.openSRIImportModal('compra')" style="font-size:0.75rem;padding:5px 12px;display:flex;align-items:center;gap:6px;border-color:var(--danger);color:var(--danger);">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Importar TXT
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="App.resetSRIForm('compras')" style="font-size:0.75rem;padding:5px 12px;">Limpiar</button>
                </div>
            </div>
            <div class="form-grid" style="grid-template-columns:repeat(auto-fill,minmax(175px,1fr));">
                <div class="form-group"><label>N° Factura *</label><input type="text" id="compra-factura" placeholder="002-017-000000001" required></div>
                <div class="form-group"><label>Proveedor / Razón Social</label><input type="text" id="compra-proveedor" placeholder="Nombre proveedor"></div>
                <div class="form-group"><label>RUC</label><input type="text" id="compra-ruc" placeholder="0000000000001"></div>
                <div class="form-group"><label>Fecha *</label><input type="date" id="compra-fecha" required></div>
                <div class="form-group"><label>Subtotal 15%</label><input type="number" step="0.01" min="0" id="compra-subt15" placeholder="0.00" oninput="App.calculateCompraIVA()"></div>
                <div class="form-group"><label>Subtotal 0%</label><input type="number" step="0.01" min="0" id="compra-subt0" placeholder="0.00" oninput="App.calculateCompraIVA()"></div>
                <div class="form-group"><label>Subtotal 5%</label><input type="number" step="0.01" min="0" id="compra-subt5" placeholder="0.00" oninput="App.calculateCompraIVA()"></div>
                <div class="form-group"><label>IVA (calculado)</label><input type="text" id="compra-iva" readonly style="background:rgba(239,68,68,0.06);font-weight:700;color:var(--danger);"></div>
                <div class="form-group"><label>Total (calculado)</label><input type="text" id="compra-total" readonly style="background:rgba(239,68,68,0.04);font-weight:800;color:var(--danger);"></div>
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:8px;">
                <button type="submit" class="btn btn-primary">Guardar Compra</button>
            </div>
        </form>` : '';

        const adminVentasCols = isAdmin ? '<th style="width:60px;">Acc.</th>' : '';
        const adminComprasCols = isAdmin ? '<th style="width:60px;">Acc.</th>' : '';

        return `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
                <div class="glass-card" style="flex:1;min-width:260px;padding:14px 22px;display:flex;align-items:center;gap:16px;">
                    <div style="width:46px;height:46px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${Icons.sriClientAvatar()}</div>
                    <div>
                        <div style="font-weight:800;font-size:1rem;">${selectedClient.name}</div>
                        <div style="font-size:0.78rem;color:var(--text-secondary);">RUC: ${selectedClient.ruc} &nbsp;|&nbsp; Régimen: ${selectedClient.regime}</div>
                    </div>
                </div>
                <div class="glass-card" style="padding:10px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;">
                    <span style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);">PERÍODO:</span>
                    <select id="sri-mes-sel" onchange="App.setSRIPeriod()" style="width:auto;padding:6px 10px;font-size:0.84rem;">${mesOpts}</select>
                    <select id="sri-anio-sel" onchange="App.setSRIPeriod()" style="width:auto;padding:6px 10px;font-size:0.84rem;">${anioOpts}</select>
                </div>
                <button class="btn btn-secondary" onclick="App.navigate('sri',true)" style="flex-shrink:0;">← Volver</button>
            </div>

            <div id="sri-summary" class="form-grid" style="margin-bottom:24px;grid-template-columns:repeat(3,1fr);">
                ${this.renderSRISummary()}
            </div>

            <div class="sri-tabs">
                <button id="tab-ventas" class="sri-tab ${State.sriActiveTab==='ventas'?'sri-tab-active':''}" onclick="App.switchSRITab('ventas')">${Icons.navClients()} Ventas</button>
                <button id="tab-compras" class="sri-tab ${State.sriActiveTab==='compras'?'sri-tab-active':''}" onclick="App.switchSRITab('compras')">${Icons.navMatriz()} Compras</button>
                <button id="tab-conciliado" class="sri-tab ${State.sriActiveTab==='conciliado'?'sri-tab-active':''}" onclick="App.switchSRITab('conciliado')">${Icons.navSRI()} Conciliado</button>
            </div>

            <div id="sri-panel-ventas" class="sri-panel" style="display:${State.sriActiveTab==='ventas'?'block':'none'};">
                ${ventaForm}
                <div style="margin-bottom: 12px;">
                    <input type="text" placeholder="🔍 Buscar factura, cliente o RUC/Cédula..." 
                           oninput="App.setSRISearch(this.value, 'venta')" 
                           value="${State.sriSearch_venta || ''}"
                           style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-card); color: var(--text-color);">
                </div>
                ${State.sriActiveTab === 'ventas' && State.sriSelectedIds && State.sriSelectedIds.size > 0 ? `
                <div class="sri-action-bar animate-fadeIn" style="margin-bottom: 16px; background: var(--bg-card); padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-color);">
                    <span style="font-weight: 600; color: var(--text-color);">${State.sriSelectedIds.size} seleccionada(s)</span>
                    <button class="btn" onclick="App.deleteSelectedSRIRows()" style="background: var(--danger); color: white; padding: 6px 16px; display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        Eliminar
                    </button>
                </div>
                ` : ''}
                <div class="table-container animate-fadeIn">
                    <table>
                        <thead style="position: sticky; top: 0; background: var(--bg-card); z-index: 10; box-shadow: 0 1px 0 var(--border-color);">
                            <tr>
                                <th style="width: 40px; text-align: center;"><input type="checkbox" id="sri-select-all-ventas" onchange="App.toggleAllSRIRows('venta', this.checked)" ${State.sriSelectAllVenta ? 'checked' : ''}></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('factura', 'venta')">N° Factura ${App.getSRISortIcon('factura', 'venta')}</div></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('nombre', 'venta')">Cliente ${App.getSRISortIcon('nombre', 'venta')}</div></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('ruc', 'venta')">RUC/Cédula ${App.getSRISortIcon('ruc', 'venta')}</div></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('fecha', 'venta')">Fecha ${App.getSRISortIcon('fecha', 'venta')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('subt15', 'venta')">Subt 15% ${App.getSRISortIcon('subt15', 'venta')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('subt0', 'venta')">Subt 0% ${App.getSRISortIcon('subt0', 'venta')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('iva', 'venta')">IVA ${App.getSRISortIcon('iva', 'venta')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('total', 'venta')">Total ${App.getSRISortIcon('total', 'venta')}</div></th>
                                <th>Estado</th>${adminVentasCols}
                            </tr>
                        </thead>
                        <tbody id="sri-ventas-body"></tbody>
                        <tfoot id="sri-ventas-foot"></tfoot>
                    </table>
                </div>
            </div>

            <div id="sri-panel-compras" class="sri-panel" style="display:${State.sriActiveTab==='compras'?'block':'none'};">
                ${compraForm}
                <div style="margin-bottom: 12px;">
                    <input type="text" placeholder="🔍 Buscar factura, proveedor o RUC..." 
                           oninput="App.setSRISearch(this.value, 'compra')" 
                           value="${State.sriSearch_compra || ''}"
                           style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-card); color: var(--text-color);">
                </div>
                ${State.sriActiveTab === 'compras' && State.sriSelectedIds && State.sriSelectedIds.size > 0 ? `
                <div class="sri-action-bar animate-fadeIn" style="margin-bottom: 16px; background: var(--bg-card); padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-color);">
                    <span style="font-weight: 600; color: var(--text-color);">${State.sriSelectedIds.size} seleccionada(s)</span>
                    <button class="btn" onclick="App.deleteSelectedSRIRows()" style="background: var(--danger); color: white; padding: 6px 16px; display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        Eliminar
                    </button>
                </div>
                ` : ''}
                <div class="table-container animate-fadeIn">
                    <table>
                        <thead style="position: sticky; top: 0; background: var(--bg-card); z-index: 10; box-shadow: 0 1px 0 var(--border-color);">
                            <tr>
                                <th style="width: 40px; text-align: center;"><input type="checkbox" id="sri-select-all-compras" onchange="App.toggleAllSRIRows('compra', this.checked)" ${State.sriSelectAllCompra ? 'checked' : ''}></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('factura', 'compra')">N° Factura ${App.getSRISortIcon('factura', 'compra')}</div></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('nombre', 'compra')">Proveedor ${App.getSRISortIcon('nombre', 'compra')}</div></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('ruc', 'compra')">RUC ${App.getSRISortIcon('ruc', 'compra')}</div></th>
                                <th><div style="cursor: pointer; display: flex; align-items: center;" onclick="App.setSRISort('fecha', 'compra')">Fecha ${App.getSRISortIcon('fecha', 'compra')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('subt15', 'compra')">Subt 15% ${App.getSRISortIcon('subt15', 'compra')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('subt0', 'compra')">Subt 0% ${App.getSRISortIcon('subt0', 'compra')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('subt5', 'compra')">Subt 5% ${App.getSRISortIcon('subt5', 'compra')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('iva', 'compra')">IVA ${App.getSRISortIcon('iva', 'compra')}</div></th>
                                <th style="text-align:right;"><div style="cursor: pointer; display: flex; align-items: center; justify-content: flex-end;" onclick="App.setSRISort('total', 'compra')">Total ${App.getSRISortIcon('total', 'compra')}</div></th>
                                ${adminComprasCols}
                            </tr>
                        </thead>
                        <tbody id="sri-compras-body"></tbody>
                        <tfoot id="sri-compras-foot"></tfoot>
                    </table>
                </div>
            </div>

            <div id="sri-panel-conciliado" class="sri-panel animate-fadeIn" style="display:${State.sriActiveTab==='conciliado'?'block':'none'};">
                <div id="conciliado-content"><!-- renderizado por App.renderConciliadoPanel() --></div>
            </div>
        `;

    },

    cuentas() {
        return `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
                <div>
                    <h3 style="margin: 0;">Gestión de Cuentas</h3>
                    <p style="color: var(--text-secondary); margin: 0; font-size: 0.85rem;">Control de deudas a favor y obligaciones de la empresa.</p>
                </div>
            </div>

            <div class="sri-tabs" style="margin-bottom: 24px;">
                <button id="tab-cuentas-cobrar" class="sri-tab cuentas-tab ${State.cuentasActiveTab==='cobrar'?'sri-tab-active':''}" onclick="App.switchCuentasTab('cobrar')">${Icons.navClients()} Cuentas por Cobrar</button>
                <button id="tab-cuentas-pagar" class="sri-tab cuentas-tab ${State.cuentasActiveTab==='pagar'?'sri-tab-active':''}" onclick="App.switchCuentasTab('pagar')">${Icons.navMatriz()} Cuentas por Pagar</button>
            </div>

            <!-- CUENTAS POR COBRAR -->
            <div id="cuentas-panel-cobrar" class="sri-panel animate-fadeIn" style="display:${State.cuentasActiveTab==='cobrar'?'block':'none'};">
                <div style="display:flex; justify-content:flex-end; margin-bottom:16px;">
                    <button id="btn-toggle-form-cobrar" class="btn btn-primary" onclick="App.toggleCuentaForm('cobrar')" style="display:flex; align-items:center; gap:8px;">
                        ${State.showCobrarForm ? Icons.close(18) : Icons.plus(18)} ${State.showCobrarForm ? 'Cerrar Formulario' : 'Nuevo Registro'}
                    </button>
                </div>

                <div id="form-container-cobrar" class="glass-card animate-fadeIn" style="display:${State.showCobrarForm ? 'block' : 'none'}; margin-bottom:20px; border-left: 4px solid var(--success);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                        <h4 style="margin:0;color:var(--success);font-size:0.95rem;">${State.editingCuentasCobrarId ? 'Editar' : 'Nuevo Registro de'} Cuenta por Cobrar</h4>
                    </div>
                    
                    <div id="cobrar-monto-card" class="glass-card animate-fadeIn" style="background:linear-gradient(135deg, rgba(var(--primary-rgb),0.1), rgba(var(--success-rgb),0.1)); border:1px solid rgba(var(--primary-rgb),0.2); margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; padding:20px;">
                        <div>
                            <p style="margin:0; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:var(--text-secondary);">Monto Inicial de la Deuda</p>
                            <div style="display:flex; align-items:baseline; gap:8px;">
                                <span style="font-size:1.8rem; font-weight:800; color:var(--primary);">$</span>
                                <input type="number" id="cobrar-monto" step="0.01" value="0.00" 
                                    style="background:transparent; border:none; color:var(--primary); font-size:1.8rem; font-weight:800; width:300px; outline:none;" 
                                    ${State.editingCuentasCobrarId ? 'disabled' : ''} 
                                    oninput="App.calculateCuentasCobrar()"
                                    placeholder="0.00">
                            </div>
                        </div>
                        <button type="button" class="icon-btn" onclick="App.toggleMontoEdit('cobrar')" style="background:rgba(var(--primary-rgb),0.1); padding:10px; border-radius:12px;">
                            ${Icons.edit(20)}
                        </button>
                    </div>

                    <form id="form-cuentas-cobrar" onsubmit="event.preventDefault(); App.saveCuentaCobrar()" style="margin-top:30px;">
                        <div class="form-grid" style="grid-template-columns:repeat(4, 1fr); gap:24px;">
                            <div class="form-group"><label>Fecha *</label><input type="date" id="cobrar-fecha" required></div>
                            
                            <div class="form-group" style="position:relative;">
                                <label>Cliente / Deudor *</label>
                                <input type="text" id="cobrar-cliente" placeholder="Nombre del cliente" required autocomplete="off" oninput="App.showClientSuggestions('cobrar', this.value)">
                                <input type="hidden" id="cobrar-cliente-id">
                                <ul id="cobrar-client-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; right:0; max-height:200px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 100;"></ul>
                            </div>
                            
                            <div class="form-group"><label>Concepto</label><input type="text" id="cobrar-concepto" placeholder="Ej. Factura 001, Servicios"></div>

                            <div class="form-group">
                                <label>Clasificación *</label>
                                <select id="cobrar-clasificacion" class="premium-select" required>
                                    <option value="CORRIENTE">Activo Corriente (Corto Plazo)</option>
                                    <option value="NO_CORRIENTE">Activo No Corriente (Largo Plazo)</option>
                                </select>
                            </div>
                            
                            <div style="grid-column: span 4; display: flex; gap: 24px; align-items: flex-start; flex-wrap: nowrap;">
                                <div class="form-group" id="cobrar-has-abono-group" style="margin-bottom:0; display:flex; flex-direction:column; flex-shrink: 0;">
                                    <label style="margin-bottom:8px;">&nbsp;</label>
                                    <label class="checkbox-container" style="display:flex; align-items:center; gap:8px; cursor:pointer; background:rgba(var(--primary-rgb),0.05); padding:6px 12px; border-radius:10px; width:fit-content; border:1px solid rgba(var(--primary-rgb),0.1); transition: var(--transition); height:45px; margin-bottom:0;">
                                        <input type="checkbox" id="cobrar-has-abono" ${State.hasCobrarAbono ? 'checked' : ''} onchange="App.toggleAbonoFields('cobrar', this.checked)" style="width:18px; height:18px;">
                                        <span style="font-weight:600; color:var(--primary); font-size:0.85rem; white-space: nowrap;">¿Abono Inicial?</span>
                                    </label>
                                </div>

                                <div id="cobrar-metodo-group" class="form-group animate-fadeIn" style="display:${State.hasCobrarAbono ? 'flex' : 'none'}; flex-direction:column; align-items:center; margin-bottom:0; flex-shrink: 0;">
                                    <label style="margin-bottom:8px; text-align:center;">Método de Pago</label>
                                    <div style="display:flex; gap:10px;">
                                        <label class="custom-method-select">
                                            <input type="checkbox" name="cobrar-metodo" value="Efectivo" checked onclick="App.handleMethodCheck('cobrar', 'Efectivo')">
                                            <span class="method-box">
                                                ${Icons.cash(18)}
                                                <span>Efect.</span>
                                            </span>
                                        </label>
                                        <label class="custom-method-select">
                                            <input type="checkbox" name="cobrar-metodo" value="Transferencia" onclick="App.handleMethodCheck('cobrar', 'Transferencia')">
                                            <span class="method-box">
                                                ${Icons.transfer(18)}
                                                <span>Transf.</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div id="cobrar-banco-container" class="form-group animate-fadeIn" style="display:none; position:relative; width:280px; flex-shrink: 0; margin-bottom:0;">
                                    <label style="margin-bottom:8px;">Banco (Búsqueda) *</label>
                                    <div style="position:relative;">
                                        <span id="cobrar-banco-icon" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--primary); line-height:0;">${Icons.bank(14)}</span>
                                        <input type="text" id="cobrar-banco-search" style="padding-left:35px; height:45px;" placeholder="Buscar banco..." autocomplete="off" oninput="App.filterBanks('cobrar', this.value)" onfocus="App.filterBanks('cobrar', this.value)">
                                    </div>
                                    <ul id="cobrar-banco-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; width:max-content; max-height:150px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 10;"></ul>
                                    <input type="hidden" id="cobrar-banco-selected">
                                </div>

                                <div id="cobrar-abono-group" class="form-group animate-fadeIn" style="display:${State.hasCobrarAbono ? 'block' : 'none'}; flex-shrink: 0; margin-bottom:0; width: 180px;">
                                    <label style="margin-bottom:8px;">Monto del Abono</label>
                                    <input type="number" step="0.01" min="0" id="cobrar-abono" style="height:45px;" placeholder="0.00" oninput="App.calculateCuentasCobrar()" ${State.editingCuentasCobrarId ? 'disabled' : ''}>
                                </div>

                                <div class="form-group" id="cobrar-pendiente-group" style="margin-bottom:0; width: 180px; flex-shrink: 0;">
                                    <label style="margin-bottom:8px;">Deuda Pendiente</label>
                                    <input type="text" id="cobrar-pendiente" readonly style="background:rgba(var(--primary-rgb),0.06);font-weight:800;color:var(--primary); width:100%; height:45px;">
                                </div>
                            </div>
                        </div>
                        <div style="display:flex;justify-content:flex-end;margin-top:16px;gap:8px;">
                            ${State.editingCuentasCobrarId ? `<button type="button" class="btn btn-secondary" onclick="App.cancelEditCuentaCobrar()">Cancelar Edición</button>` : ''}
                            <button type="submit" class="btn btn-primary">${State.editingCuentasCobrarId ? 'Actualizar' : 'Guardar'} Cuenta por Cobrar</button>
                        </div>
                    </form>
                </div>
                
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap;">
                        <h4 style="margin:0;">Listado de Cuentas por Cobrar</h4>
                        <div style="display:flex; gap: 8px; flex:1; justify-content:flex-end;">
                            <div style="position:relative; width:100%; max-width:250px;">
                                <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--text-secondary);">${Icons.search(14)}</span>
                                <input type="text" placeholder="Buscar cliente..." 
                                    style="padding:8px 12px 8px 35px; font-size:0.85rem;" 
                                    value="${State.cobrarSearch}"
                                    oninput="App.setCobrarSearch(this.value)">
                            </div>
                            <button class="btn btn-secondary" onclick="App.exportSelectedReports('cobrar')" style="display:flex;align-items:center;gap:6px;padding:6px 12px;font-size:0.75rem;" title="Exportar seleccionados">
                                ${Icons.pdf(14)} Exportar PDF
                            </button>
                            ${State.selectedCuentasCobrar.length > 0 ? `
                                <button class="btn btn-danger animate-fadeIn" onclick="App.deleteSelectedCuentas('cobrar')" style="display:flex;align-items:center;gap:6px;padding:6px 12px;font-size:0.75rem; background:var(--danger); border:none;">
                                    ${Icons.delete(14)} Eliminar (${State.selectedCuentasCobrar.length})
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:40px;"><input type="checkbox" ${State.cuentasCobrarData.length > 0 && State.selectedCuentasCobrar.length === State.cuentasCobrarData.length ? 'checked' : ''} onchange="App.toggleAllCuentas('cobrar', this.checked)"></th>
                                    <th>Cliente</th>
                                    <th>Concepto</th>
                                    <th>Fecha</th>
                                    <th style="text-align:right;">Monto Inicial</th>
                                    <th style="text-align:right;">Pendiente</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="cuentas-cobrar-body">
                                ${App.renderCuentasCobrarTable()}
                            </tbody>
                        </table>
                    </div>
                    <div id="pagination-cobrar" style="margin-top:20px; display:flex; justify-content:center; gap:8px;">
                        ${App.renderPagination('cobrar')}
                    </div>
                </div>
            </div>

            <!-- CUENTAS POR PAGAR -->
            <div id="cuentas-panel-pagar" class="sri-panel animate-fadeIn" style="display:${State.cuentasActiveTab==='pagar'?'block':'none'};">
                <div style="display:flex; justify-content:flex-end; margin-bottom:16px;">
                    <button id="btn-toggle-form-pagar" class="btn btn-danger" onclick="App.toggleCuentaForm('pagar')" style="display:flex; align-items:center; gap:8px;">
                        ${State.showPagarForm ? Icons.close(18) : Icons.plus(18)} ${State.showPagarForm ? 'Cerrar Formulario' : 'Nuevo Registro'}
                    </button>
                </div>

                <div id="form-container-pagar" class="glass-card animate-fadeIn" style="display:${State.showPagarForm ? 'block' : 'none'}; margin-bottom:20px; border-left: 4px solid var(--danger);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                        <h4 style="margin:0;color:var(--danger);font-size:0.95rem;">${State.editingCuentasPagarId ? 'Editar' : 'Nuevo Registro de'} Cuenta por Pagar</h4>
                    </div>
                    
                    <div id="pagar-monto-card" class="glass-card animate-fadeIn" style="background:linear-gradient(135deg, rgba(var(--danger-rgb),0.1), rgba(var(--primary-rgb),0.1)); border:1px solid rgba(var(--danger-rgb),0.2); margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; padding:20px;">
                        <div>
                            <p style="margin:0; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:var(--text-secondary);">Monto Inicial de la Obligación</p>
                            <div style="display:flex; align-items:baseline; gap:8px;">
                                <span style="font-size:1.8rem; font-weight:800; color:var(--danger);">$</span>
                                <input type="number" id="pagar-monto" step="0.01" value="0.00" 
                                    style="background:transparent; border:none; color:var(--danger); font-size:1.8rem; font-weight:800; width:300px; outline:none;" 
                                    ${State.editingCuentasPagarId ? 'disabled' : ''} 
                                    oninput="App.calculateCuentasPagar()"
                                    placeholder="0.00">
                            </div>
                        </div>
                        <button type="button" class="icon-btn" onclick="App.toggleMontoEdit('pagar')" style="background:rgba(var(--danger-rgb),0.1); padding:10px; border-radius:12px;">
                            ${Icons.edit(20)}
                        </button>
                    </div>

                    <form id="form-cuentas-pagar" onsubmit="event.preventDefault(); App.saveCuentaPagar()" style="margin-top:30px;">
                        <div class="form-grid" style="grid-template-columns:repeat(4, 1fr); gap:24px;">
                            <div class="form-group"><label>Fecha *</label><input type="date" id="pagar-fecha" required></div>
                            
                            <div class="form-group" style="position:relative;">
                                <label>Proveedor / Acreedor *</label>
                                <input type="text" id="pagar-proveedor" placeholder="Nombre del proveedor" required autocomplete="off" oninput="App.showClientSuggestions('pagar', this.value)">
                                <input type="hidden" id="pagar-proveedor-id">
                                <ul id="pagar-client-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; width:max-content; max-height:200px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 100;"></ul>
                            </div>
                            
                            <div class="form-group"><label>Concepto</label><input type="text" id="pagar-concepto" placeholder="Ej. Compra de insumos, Alquiler"></div>
                            
                            <div class="form-group">
                                <label>Clasificación *</label>
                                <select id="pagar-clasificacion" class="premium-select" required>
                                    <option value="CORRIENTE">Pasivo Corriente (Corto Plazo)</option>
                                    <option value="NO_CORRIENTE">Pasivo No Corriente (Largo Plazo)</option>
                                </select>
                            </div>

                            <div style="grid-column: span 4; display: flex; gap: 24px; align-items: flex-start; flex-wrap: nowrap;">
                                <div class="form-group" id="pagar-has-abono-group" style="margin-bottom:0; display:flex; flex-direction:column; flex-shrink: 0;">
                                    <label style="margin-bottom:8px;">&nbsp;</label>
                                    <label class="checkbox-container" style="display:flex; align-items:center; gap:8px; cursor:pointer; background:rgba(var(--danger-rgb),0.05); padding:6px 12px; border-radius:10px; width:fit-content; border:1px solid rgba(var(--danger-rgb),0.1); transition: var(--transition); height:45px; margin-bottom:0;">
                                        <input type="checkbox" id="pagar-has-abono" ${State.hasPagarAbono ? 'checked' : ''} onchange="App.toggleAbonoFields('pagar', this.checked)" style="width:18px; height:18px;">
                                        <span style="font-weight:600; color:var(--danger); font-size:0.85rem; white-space: nowrap;">¿Abono Inicial?</span>
                                    </label>
                                </div>

                                <div id="pagar-metodo-group" class="form-group animate-fadeIn" style="display:${State.hasPagarAbono ? 'flex' : 'none'}; flex-direction:column; align-items:center; margin-bottom:0; flex-shrink: 0;">
                                    <label style="margin-bottom:8px; text-align:center;">Método de Pago</label>
                                    <div style="display:flex; gap:10px;">
                                        <label class="custom-method-select">
                                            <input type="checkbox" name="pagar-metodo" value="Efectivo" checked onclick="App.handleMethodCheck('pagar', 'Efectivo')">
                                            <span class="method-box danger">
                                                ${Icons.cash(18)}
                                                <span>Efect.</span>
                                            </span>
                                        </label>
                                        <label class="custom-method-select">
                                            <input type="checkbox" name="pagar-metodo" value="Transferencia" onclick="App.handleMethodCheck('pagar', 'Transferencia')">
                                            <span class="method-box danger">
                                                ${Icons.transfer(18)}
                                                <span>Transf.</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div id="pagar-banco-container" class="form-group animate-fadeIn" style="display:none; position:relative; width:280px; flex-shrink: 0; margin-bottom:0;">
                                    <label style="margin-bottom:8px;">Banco (Búsqueda) *</label>
                                    <div style="position:relative;">
                                        <span id="pagar-banco-icon" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--danger); line-height:0;">${Icons.bank(14)}</span>
                                        <input type="text" id="pagar-banco-search" style="padding-left:35px; height:45px;" placeholder="Buscar banco..." autocomplete="off" oninput="App.filterBanks('pagar', this.value)" onfocus="App.filterBanks('pagar', this.value)">
                                    </div>
                                    <ul id="pagar-banco-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; width:max-content; max-height:150px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 10;"></ul>
                                    <input type="hidden" id="pagar-banco-selected">
                                </div>

                                <div id="pagar-abono-group" class="form-group animate-fadeIn" style="display:${State.hasPagarAbono ? 'block' : 'none'}; flex-shrink: 0; margin-bottom:0; width: 180px;">
                                    <label style="margin-bottom:8px;">Monto del Abono</label>
                                    <input type="number" step="0.01" min="0" id="pagar-abono" style="height:45px;" placeholder="0.00" oninput="App.calculateCuentasPagar()" ${State.editingCuentasPagarId ? 'disabled' : ''}>
                                </div>

                                <div class="form-group" id="pagar-pendiente-group" style="margin-bottom:0; width: 180px; flex-shrink: 0;">
                                    <label style="margin-bottom:8px;">Saldo Restante</label>
                                    <input type="text" id="pagar-pendiente" readonly style="background:rgba(var(--danger-rgb),0.06);font-weight:800;color:var(--danger); width:100%; height:45px;">
                                </div>
                            </div>
                        </div>
                        <div style="display:flex;justify-content:flex-end;margin-top:16px;gap:8px;">
                            ${State.editingCuentasPagarId ? `<button type="button" class="btn btn-secondary" onclick="App.cancelEditCuentaPagar()">Cancelar Edición</button>` : ''}
                            <button type="submit" class="btn btn-danger">${State.editingCuentasPagarId ? 'Actualizar' : 'Guardar'} Cuenta por Pagar</button>
                        </div>
                    </form>
                </div>
                
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap;">
                        <h4 style="margin:0;">Listado de Cuentas por Pagar</h4>
                        <div style="display:flex; gap: 8px; flex:1; justify-content:flex-end;">
                            <div style="position:relative; width:100%; max-width:250px;">
                                <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--text-secondary);">${Icons.search(14)}</span>
                                <input type="text" placeholder="Buscar proveedor..." 
                                    style="padding:8px 12px 8px 35px; font-size:0.85rem;" 
                                    value="${State.pagarSearch}"
                                    oninput="App.setPagarSearch(this.value)">
                            </div>
                            <button class="btn btn-secondary" onclick="App.exportSelectedReports('pagar')" style="display:flex;align-items:center;gap:6px;padding:6px 12px;font-size:0.75rem;" title="Exportar seleccionados">
                                ${Icons.pdf(14)} Exportar PDF
                            </button>
                            ${State.selectedCuentasPagar.length > 0 ? `
                                <button class="btn btn-danger animate-fadeIn" onclick="App.deleteSelectedCuentas('pagar')" style="display:flex;align-items:center;gap:6px;padding:6px 12px;font-size:0.75rem; background:var(--danger); border:none;">
                                    ${Icons.delete(14)} Eliminar (${State.selectedCuentasPagar.length})
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:40px;"><input type="checkbox" ${State.cuentasPagarData.length > 0 && State.selectedCuentasPagar.length === State.cuentasPagarData.length ? 'checked' : ''} onchange="App.toggleAllCuentas('pagar', this.checked)"></th>
                                    <th>Proveedor</th>
                                    <th>Concepto</th>
                                    <th>Fecha</th>
                                    <th style="text-align:right;">Monto Inicial</th>
                                    <th style="text-align:right;">Pendiente</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="cuentas-pagar-body">
                                ${App.renderCuentasPagarTable()}
                            </tbody>
                        </table>
                    </div>
                    <div id="pagination-pagar" style="margin-top:20px; display:flex; justify-content:center; gap:8px;">
                        ${App.renderPagination('pagar')}
                    </div>
                </div>
            </div>
        `;
    },

    settingsModal() {
        return `
            <div id="settings-modal" class="modal-overlay ${State.showSettingsModal ? 'active' : ''}">
                <div class="modal-content glass" style="max-width: 500px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div>
                            <h2 style="font-family: var(--font-heading); font-size: 1.1rem; margin: 0;">GESTIÓN DE ACCESO</h2>
                            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0;">Autorice correos de Google y asigne roles.</p>
                        </div>
                        <button class="btn-icon" onclick="App.toggleSettingsModal()" style="display:flex;align-items:center;justify-content:center;">${Icons.close()}</button>
                    </div>
                    
                    <form onsubmit="App.handleUserSubmit(event)" style="margin-bottom: 32px; padding: 20px; background: rgba(var(--primary-rgb), 0.05); border-radius: var(--radius-md);">
                        <div class="form-group">
                            <label>Correo de Google a autorizar</label>
                            <input type="email" id="user-email" placeholder="ejemplo@gmail.com" required>
                        </div>
                        <div class="form-group">
                            <label>Rol Inicial</label>
                            <select id="user-role">
                                <option value="lector">Lector (Solo ver)</option>
                                <option value="admin">Administrador (Todo)</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Autorizar Acceso</button>
                    </form>

                    <div style="max-height: 300px; overflow-y: auto;">
                        <h4 style="font-size: 0.8rem; margin-bottom: 16px; letter-spacing: 1px; opacity: 0.7;">USUARIOS CON ACCESO</h4>
                        <div id="users-list" style="display: flex; flex-direction: column; gap: 12px;">
                            <!-- Rendered by App -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    abonoModal() {
        if (State.currentRoute !== 'cuentas') return '';
        return `
            <div id="abono-modal" class="modal-overlay ${State.showAbonoModal ? 'active' : ''}" style="z-index: 10005 !important;">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 500px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                        <h3 style="margin:0;color:var(--primary);">Registrar Abono</h3>
                        <button class="close-btn" onclick="App.closeAbonoModal()">
                            ${Icons.close()}
                        </button>
                    </div>
                    <form id="form-abono" onsubmit="event.preventDefault(); App.saveAbono()">
                        <div class="form-group" style="margin-bottom:12px;">
                            <label>Fecha y Hora del Abono *</label>
                            <input type="datetime-local" id="abono-fecha" required>
                        </div>
                        <div class="form-group" style="margin-bottom:12px;">
                            <label>Monto a Abonar *</label>
                            <input type="number" step="0.01" min="0.01" id="abono-monto" placeholder="0.00" required>
                        </div>
                        <div class="form-group" style="margin-bottom:12px;">
                            <label style="text-align:center; display:block;">Método de Pago</label>
                            <div style="display:flex;gap:12px;margin-top:8px;">
                                <label class="custom-method-select" style="max-width:130px;">
                                    <input type="checkbox" name="abono-metodo" value="Efectivo" checked onclick="App.handleMethodCheck('abono', 'Efectivo')">
                                    <span class="method-box">
                                        ${Icons.cash(18)}
                                        <span>Efect.</span>
                                    </span>
                                </label>
                                <label class="custom-method-select" style="max-width:130px;">
                                    <input type="checkbox" name="abono-metodo" value="Transferencia" onclick="App.handleMethodCheck('abono', 'Transferencia')">
                                    <span class="method-box">
                                        ${Icons.transfer(18)}
                                        <span>Transf.</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group" id="abono-banco-container" style="display:none; position:relative; margin-bottom:12px;">
                            <label>Banco (Búsqueda) *</label>
                            <div style="position:relative;">
                                <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--primary);">${Icons.bank(14)}</span>
                                <input type="text" id="abono-banco-search" style="padding-left:35px;" placeholder="Buscar banco..." autocomplete="off" oninput="App.filterBanks('abono', this.value)" onfocus="App.filterBanks('abono', this.value)">
                            </div>
                            <ul id="abono-banco-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; right:0; max-height:150px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 10;"></ul>
                            <input type="hidden" id="abono-banco-selected">
                        </div>
                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:24px;">
                            <button type="submit" class="btn btn-primary" style="flex:1;">Guardar Abono</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    clients() {
        // Si hay una ficha abierta, mostrarla
        if (State.currentFichaClientId) {
            const c = Store.get('clientes').find(cl => cl.id === State.currentFichaClientId);
            if (c) return this.clientFicha(c);
        }
        return `
            <div class="glass-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                    <h3 style="margin: 0;">Cartera de Clientes</h3>
                    ${Store.getUserRole() === 'admin' ? `<button class="btn btn-primary" onclick="App.toggleClientForm(true)" style="display:inline-flex;align-items:center;gap:8px;">${Icons.addPerson()} Nuevo Cliente</button>` : ''}
                </div>

                <!-- Ocultar lista y controles si el formulario está abierto -->
                ${!State.showClientForm ? `
                <!-- Tabs de Navegación -->
                <div style="display: flex; gap: 4px; margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
                    <button 
                        id="tab-client-active" 
                        class="sri-tab ${State.clientTab === 'active' ? 'sri-tab-active' : ''}" 
                        onclick="App.switchClientsTab('active')"
                    >
                        <span style="display:inline-flex;align-items:center;gap:8px;">${Icons.user(16)} Activos</span>
                    </button>
                    <button 
                        id="tab-client-archived" 
                        class="sri-tab ${State.clientTab === 'archived' ? 'sri-tab-active' : ''}" 
                        onclick="App.switchClientsTab('archived')"
                    >
                        <span style="display:inline-flex;align-items:center;gap:8px;">${Icons.archive(16)} Archivados</span>
                    </button>
                </div>

                <!-- Controles: Buscador y Leyenda -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
                    <!-- Buscador Premium -->
                    <div style="position: relative; width: 100%; max-width: 420px;">
                        <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; display:flex;align-items:center;">${Icons.search()}</span>
                        <input
                            id="client-search-input"
                            type="text"
                            placeholder="Buscar por nombre o RUC..."
                            value="${App.escapeHTML(State.clientSearch)}"
                            oninput="App.setClientSearch(this.value)"
                            style="padding-left: 42px; width: 100%; box-sizing: border-box; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-size: 0.9rem; height: 42px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;"
                            onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(var(--primary-rgb),0.15)';"
                            onblur="this.style.borderColor='var(--border-color)'; this.style.boxShadow='none';"
                        >
                        ${State.clientSearch ? `<button onclick="App.setClientSearch('')" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; opacity:0.5; color:var(--text-primary);display:flex;align-items:center;">${Icons.close()}</button>` : ''}
                    </div>
                </div>
                ` : ''}

                ${State.showClientForm ? this.clientForm() : ''}

                ${!State.showClientForm ? `
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th><div style="cursor: pointer; display: flex; align-items: center; gap: 6px; user-select: none;" onclick="App.toggleClientSort()" title="Ordenar alfabéticamente">Cliente <span style="font-size: 0.8em; opacity: 0.7;">${State.clientSortAsc ? '▼' : '▲'}</span></div></th>
                                <th>RUC / CÉDULA</th>
                                <th>Régimen</th>
                                <th>Forma</th>
                                <th>Fecha de Declaración</th>
                                <th style="text-align:center;">Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clients-table-body">
                            <!-- Rendered by App -->
                        </tbody>
                    </table>
                </div>
                <div id="clients-search-count" style="margin-top: 10px; font-size: 0.78rem; color: var(--text-secondary); text-align: right;"></div>
                ` : ''}
            </div>
        `;
    },

    clientForm() {
        const conf = Store.get('configuraciones');
        const editingClient = State.clientEditingId ? Store.get('clientes').find(c => c.id === State.clientEditingId) : null;
        
        const name      = editingClient ? editingClient.name : '';
        const ruc       = editingClient ? editingClient.ruc : '';
        const regime    = editingClient ? editingClient.regime : '';
        const tipo      = editingClient && editingClient.tipo ? editingClient.tipo : 'P. Natural';
        const frecuencia = editingClient && editingClient.frecuencia ? editingClient.frecuencia : 'Mensual';
        const claveSRI  = editingClient && editingClient.claveSRI ? editingClient.claveSRI : '';
        const arrastreInicial = editingClient && editingClient.arrastreInicial ? editingClient.arrastreInicial : 0;

        // Obligaciones tributarias (Sí/No)
        const oblSuperCia = editingClient ? (editingClient.oblSuperCia || 'No') : 'No';
        const superCiaUser = editingClient ? (editingClient.superCiaUser || '') : '';
        const superCiaPass = editingClient ? (editingClient.superCiaPass || '') : '';
        const oblIVA      = editingClient ? (editingClient.oblIVA      || 'No') : 'No';
        const oblRenta    = editingClient ? (editingClient.oblRenta    || 'No') : 'No';
        const oblATS      = editingClient ? (editingClient.oblATS      || 'No') : 'No';
        const oblADI      = editingClient ? (editingClient.oblADI      || 'No') : 'No';
        const oblGP       = editingClient ? (editingClient.oblGP       || 'No') : 'No';
        const oblRebefics = editingClient ? (editingClient.oblRebefics || 'No') : 'No';

        // Contacto y Acceso
        const correo      = editingClient && editingClient.correo ? editingClient.correo : '';
        const telefono    = editingClient && editingClient.telefono ? editingClient.telefono : '';
        const direccion   = editingClient && editingClient.direccion ? editingClient.direccion : '';
        const contrasena  = editingClient && editingClient.contrasena ? editingClient.contrasena : '';

        // Facturación
        const factUsuario = editingClient ? (editingClient.factUsuario || '') : '';
        const factClave   = editingClient ? (editingClient.factClave || '') : '';
        const factNumComp = editingClient ? (editingClient.factNumComp || '') : '';
        const factEmitido = editingClient ? (editingClient.factEmitido || '') : '';
        const factCaduca  = editingClient ? (editingClient.factCaduca || '') : '';

        // Firma Digital
        const firmaClave   = editingClient ? (editingClient.firmaClave || '') : '';
        const firmaEmision = editingClient ? (editingClient.firmaEmision || '') : '';
        const firmaCaduca  = editingClient ? (editingClient.firmaCaduca || '') : '';
        const firmaTiempo  = editingClient ? (editingClient.firmaTiempo || '1') : '1';

        // Helper: genera un select Sí/No con el valor pre-seleccionado
        const siNo = (id, val) => `
            <select id="${id}">
                <option value="Si" ${val === 'Si' ? 'selected' : ''}>Sí</option>
                <option value="No" ${val === 'No' ? 'selected' : ''}>No</option>
            </select>`;

        return `
            <div class="glass-card animate-fadeIn" style="margin-bottom: 24px; background: rgba(var(--primary-rgb), 0.03);">
                <form onsubmit="App.handleClientSubmit(event)">
                    <div style="margin-bottom: 15px; font-weight: bold; color: var(--primary); font-family: var(--font-heading);">
                        <span style="display:inline-flex;align-items:center;gap:8px;">${editingClient ? Icons.edit(16) : Icons.addPerson()} ${editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}</span>
                    </div>

                    <!-- TABS -->
                    <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; flex-wrap: wrap;">
                        <button type="button" id="tab-btn-tributario" class="btn" style="background: var(--primary); color: white; border-radius: 6px; padding: 6px 12px; font-size: 0.85rem;" onclick="App.switchClientFormTab('tributario')">Datos Tributarios</button>
                        <button type="button" id="tab-btn-personal" class="btn" style="background: transparent; color: var(--text-secondary); border-radius: 6px; padding: 6px 12px; font-size: 0.85rem;" onclick="App.switchClientFormTab('personal')">Contacto y Acceso</button>
                        <button type="button" id="tab-btn-facturacion" class="btn" style="background: transparent; color: var(--text-secondary); border-radius: 6px; padding: 6px 12px; font-size: 0.85rem;" onclick="App.switchClientFormTab('facturacion')">Facturación</button>
                        <button type="button" id="tab-btn-firma" class="btn" style="background: transparent; color: var(--text-secondary); border-radius: 6px; padding: 6px 12px; font-size: 0.85rem;" onclick="App.switchClientFormTab('firma')">Firma Digital</button>
                    </div>

                    <div id="tab-tributario" style="display: block;">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Razón Social</label>
                                <input type="text" id="client-name" value="${App.escapeHTML(name)}" required>
                            </div>
                            <div class="form-group">
                                <label>RUC (13 dígitos)</label>
                                <input type="text" id="client-ruc" maxlength="13" value="${App.escapeHTML(ruc)}" required>
                            </div>
                            <div class="form-group">
                                <label>Régimen Tributario</label>
                                <select id="client-regime">
                                    ${conf.regimenes.map(o => `<option value="${o}" ${regime === o ? 'selected' : ''}>${o}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Forma</label>
                                <select id="client-frecuencia">
                                    <option value="Mensual" ${frecuencia === 'Mensual' ? 'selected' : ''}>Mensual</option>
                                    <option value="Anual" ${frecuencia === 'Anual' ? 'selected' : ''}>Anual</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Tipo de Contribuyente</label>
                                <select id="client-tipo">
                                    <option value="P. Natural" ${tipo === 'P. Natural' ? 'selected' : ''}>P. Natural</option>
                                    <option value="Sociedad" ${tipo === 'Sociedad' ? 'selected' : ''}>Sociedad</option>
                                    <option value="Tercera Edad" ${tipo === 'Tercera Edad' ? 'selected' : ''}>Tercera Edad</option>
                                    <option value="Discapacidad" ${tipo === 'Discapacidad' ? 'selected' : ''}>Discapacidad</option>
                                    <option value="Trabajador Público" ${tipo === 'Trabajador Público' ? 'selected' : ''}>Trabajador Público</option>
                                    <option value="Otro" ${tipo === 'Otro' ? 'selected' : ''}>Otro</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Clave SRI</label>
                                <div style="position: relative;">
                                    <input type="password" id="client-clave-sri" value="${App.escapeHTML(claveSRI)}" style="padding-right: 88px;">
                                    <div style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); display: flex; gap: 4px;">
                                        <button type="button" class="btn-icon" style="width:34px;height:34px;opacity:0.6;display:flex;align-items:center;justify-content:center;" onclick="App.copyToClipboard('client-clave-sri')" title="Copiar contraseña">${Icons.copy(16)}</button>
                                        <button type="button" class="btn-icon" style="width:34px;height:34px;opacity:0.6;display:flex;align-items:center;justify-content:center;" onclick="App.togglePasswordVis('client-clave-sri')" title="Mostrar/Ocultar">${Icons.eye(16)}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Arrastre IVA Inicial ($)</label>
                                <input type="number" step="0.01" min="0" id="client-arrastre-inicial" value="${arrastreInicial}" placeholder="0.00">
                            </div>
                        </div>

                        <!-- Actividades Económicas -->
                        <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border-color);">
                            <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; color: var(--text-secondary); margin-bottom: 14px;">ACTIVIDADES ECONÓMICAS</div>
                            <div id="client-activities-list" style="max-height: 150px; overflow-y: auto; margin-bottom: 10px; padding-right: 5px; max-width: 600px;"></div>
                            <div style="display: flex; gap: 10px; align-items: center; max-width: 600px;">
                                <input type="text" id="new-activity-name" placeholder="Ej. Venta de repuestos..." style="flex: 1;">
                                <select id="new-activity-tarifa" style="width: 100px;">
                                    <option value="0%">0%</option>
                                    <option value="5%">5%</option>
                                    <option value="15%" selected>15%</option>
                                </select>
                                <button type="button" class="btn btn-primary" onclick="App.addClientActivity()" style="padding: 0 12px; height: 38px;">${Icons.plus(16)}</button>
                            </div>
                        </div>

                        <!-- Obligaciones Tributarias -->
                        <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border-color);">
                            <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; color: var(--text-secondary); margin-bottom: 14px;">OBLIGACIONES TRIBUTARIAS</div>
                            <div class="form-grid">
                                <div class="form-group"><label>SUPER CIA</label><select id="client-super-cia" onchange="App.toggleSuperCiaFields(this.value, 'client')"><option value="Si" ${oblSuperCia==='Si'?'selected':''}>Sí</option><option value="No" ${oblSuperCia==='No'?'selected':''}>No</option></select></div>
                                <div class="form-group"><label>IVA</label>${siNo('client-iva', oblIVA)}</div>
                                <div class="form-group"><label>RENTA</label>${siNo('client-renta', oblRenta)}</div>
                                <div class="form-group"><label>ATS</label>${siNo('client-ats', oblATS)}</div>
                                <div class="form-group"><label>ADI</label>${siNo('client-adi', oblADI)}</div>
                                <div class="form-group"><label>GP</label>${siNo('client-gp', oblGP)}</div>
                                <div class="form-group"><label>REBEFICS</label>${siNo('client-rebefics', oblRebefics)}</div>
                            </div>
                        </div>
                        <div id="client-super-cia-container" style="display: ${oblSuperCia === 'Si' ? 'block' : 'none'}; margin-top: 15px; padding: 16px; background: rgba(var(--primary-rgb), 0.04); border-radius: 12px; border: 1px solid rgba(var(--primary-rgb), 0.15);">
                            <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 1px; color: var(--text-secondary); margin-bottom: 12px;">CREDENCIALES SUPER CIA</div>
                            <div style="display: flex; gap: 15px; max-width: 600px;">
                                <div class="form-group" style="flex: 1;"><label>Usuario</label><input type="text" id="client-super-cia-user" value="${App.escapeHTML(superCiaUser)}"></div>
                                <div class="form-group" style="flex: 1;"><label>Contraseña</label><div style="position:relative;"><input type="password" id="client-super-cia-pass" value="${App.escapeHTML(superCiaPass)}" style="padding-right:78px;"><div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;"><button type="button" class="pw-action-btn" onclick="App.copyToClipboard('client-super-cia-pass')">${Icons.copy(14)}</button><button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('client-super-cia-pass')">${Icons.eye(14)}</button></div></div></div>
                            </div>
                        </div>
                    </div>

                    <div id="tab-personal" style="display: none;">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email" id="client-correo" value="${App.escapeHTML(correo)}" placeholder="ejemplo@correo.com">
                            </div>
                            <div class="form-group">
                                <label>Contraseña (App/Portal)</label>
                                <div style="position: relative;">
                                    <input type="password" id="client-contrasena" value="${App.escapeHTML(contrasena)}" style="padding-right: 88px;">
                                    <div style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); display: flex; gap: 4px;">
                                        <button type="button" class="btn-icon" style="width:34px;height:34px;opacity:0.6;display:flex;align-items:center;justify-content:center;" onclick="App.copyToClipboard('client-contrasena')" title="Copiar contraseña">${Icons.copy(16)}</button>
                                        <button type="button" class="btn-icon" style="width:34px;height:34px;opacity:0.6;display:flex;align-items:center;justify-content:center;" onclick="App.togglePasswordVis('client-contrasena')" title="Mostrar/Ocultar">${Icons.eye(16)}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Teléfono</label>
                                <input type="text" id="client-telefono" value="${App.escapeHTML(telefono)}" placeholder="Ej. 0999999999">
                            </div>
                            <div class="form-group">
                                <label>Dirección</label>
                                <input type="text" id="client-direccion" value="${App.escapeHTML(direccion)}" placeholder="Ej. Av. Principal y Secundaria">
                            </div>
                        </div>
                    </div>

                    <div id="tab-facturacion" style="display: none;">
                        <div class="form-grid">
                            <div class="form-group"><label>Usuario/RUC</label><input type="text" id="client-fact-usuario" value="${App.escapeHTML(factUsuario)}"></div>
                            <div class="form-group">
                                <label>Clave</label>
                                <div style="position:relative;">
                                    <input type="password" id="client-fact-clave" value="${App.escapeHTML(factClave)}" style="padding-right:78px;">
                                    <div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;">
                                        <button type="button" class="pw-action-btn" onclick="App.copyToClipboard('client-fact-clave')">${Icons.copy(14)}</button>
                                        <button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('client-fact-clave')">${Icons.eye(14)}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group"><label>N° Comprobantes</label><input type="text" id="client-fact-num" value="${App.escapeHTML(factNumComp)}"></div>
                            <div class="form-group"><label>Fecha Emisión</label><input type="date" id="client-fact-emi" value="${factEmitido}"></div>
                            <div class="form-group"><label>Fecha Caducidad</label><input type="date" id="client-fact-cad" value="${factCaduca}"></div>
                        </div>
                    </div>

                    <div id="tab-firma" style="display: none;">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Clave de Firma</label>
                                <div style="position:relative;">
                                    <input type="password" id="client-firma-clave" value="${App.escapeHTML(firmaClave)}" style="padding-right:78px;">
                                    <div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;">
                                        <button type="button" class="pw-action-btn" onclick="App.copyToClipboard('client-firma-clave')">${Icons.copy(14)}</button>
                                        <button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('client-firma-clave')">${Icons.eye(14)}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group"><label>Fecha Emisión</label><input type="date" id="client-firma-emi" value="${firmaEmision}"></div>
                            <div class="form-group"><label>Fecha Caducidad</label><input type="date" id="client-firma-cad" value="${firmaCaduca}"></div>
                            <div class="form-group"><label>Tiempo Vigencia (Años)</label><input type="number" id="client-firma-tiempo" value="${firmaTiempo}" min="1"></div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
                        <button type="button" class="btn btn-secondary" onclick="App.toggleClientForm(false)">Cancelar</button>
                        <button type="submit" class="btn btn-primary">${editingClient ? 'Guardar Cambios' : 'Registrar Cliente'}</button>
                    </div>
                </form>
            </div>
        `;
    },

    confirmModal(title, message, onConfirm, onCancel) {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-card">
                <div class="confirm-title">${title}</div>
                <div class="confirm-message">${message}</div>
                <div class="confirm-actions">
                    <button class="btn btn-secondary" id="confirm-cancel">Cancelar</button>
                    <button class="btn btn-primary" id="confirm-ok">Aceptar</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => overlay.classList.add('active'), 10);

        const close = (result) => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                if (result) onConfirm();
                else if (onCancel) onCancel();
            }, 300);
        };

        overlay.querySelector('#confirm-ok').onclick = () => close(true);
        overlay.querySelector('#confirm-cancel').onclick = () => close(false);
    },

    // ─── FICHA DE CLIENTE ────────────────────────────────────────────────────────
    clientFicha(c) {
        const today = new Date();

        // ── Helpers de estado visual ──────────────────────────────────────────────
        const statusDot = (expiresStr) => {
            if (!expiresStr) return `<span title="Sin datos" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:rgba(150,150,150,0.4);"></span>`;
            const diff = Math.ceil((new Date(expiresStr) - today) / 86400000);
            const color = diff < 0 ? 'var(--danger)' : diff <= 30 ? 'var(--warning)' : 'var(--success)';
            const label = diff < 0 ? 'Vencida' : `${diff}d restantes`;
            return `<span title="${label}" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color};"></span>`;
        };
        const formatDate = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('es-EC', {day:'2-digit',month:'short',year:'numeric'}) : '—';

        // Helper: campo de contraseña en modo lectura con botones copiar/revelar
        const pwDisplay = (idPrefix, val) => {
            if (!val) return `<span style="font-family:var(--font-mono);color:var(--text-secondary);">—</span>`;
            const safe = App.escapeHTML(val);
            const btnBase = 'background:none;border:none;cursor:pointer;padding:2px 4px;border-radius:4px;transition:all 0.15s;opacity:0.45;font-size:0.82rem;line-height:1;';
            const btnHover = `onmouseover="this.style.opacity='1';this.style.background='rgba(var(--primary-rgb),0.1)'" onmouseout="this.style.opacity='0.45';this.style.background='none'"`;
            return `<span style="display:inline-flex;align-items:center;gap:3px;">
                <span id="${idPrefix}-disp" style="font-family:var(--font-mono);letter-spacing:2px;font-size:0.9rem;">••••••••</span>
                <span id="${idPrefix}-raw" style="display:none;">${safe}</span>
                <button type="button" title="Copiar" ${btnHover} onclick="App.copyRaw('${idPrefix}-raw')" style="${btnBase}">${Icons.copy(14)}</button>
                <button type="button" title="Mostrar/Ocultar" ${btnHover} onclick="App.toggleDisplay('${idPrefix}-disp','${idPrefix}-raw')" style="${btnBase}">${Icons.eye(14)}</button>
            </span>`;
        };
        const pill = (val) => {
            const ok = val === 'Si';
            return `<span style="padding:2px 8px;border-radius:20px;font-size:0.75rem;font-weight:600;background:${ok?'rgba(var(--success-rgb,52,211,153),0.15)':'rgba(150,150,150,0.1)'};color:${ok?'var(--success)':'var(--text-secondary)'};">${ok?'Sí':'No'}</span>`;
        };

        // ── Datos de las 3 secciones ─────────────────────────────────────────────
        const isEditing  = State.fichaEditingSection;
        const editSRI    = isEditing === 'sri';
        const editFact   = isEditing === 'facturacion';
        const editFirma  = isEditing === 'firma';

        // Facturación
        const factUsuario = c.factUsuario || '';
        const factClave   = c.factClave   || '';
        const factNumComp = c.factNumComp  || '';
        const factEmitido = c.factEmitido || '';
        const factCaduca  = c.factCaduca  || '';

        // Firma
        const firmaUsuario = c.firmaUsuario || '';
        const firmaClave   = c.firmaClave   || '';
        const firmaEmision = c.firmaEmision || '';
        const firmaCaduca  = c.firmaCaduca  || '';
        const firmaTiempo  = c.firmaTiempo  || '2';

        const conf = Store.get('configuraciones');
        const isAdmin = Store.getUserRole() === 'admin';

        // ── Formulario SRI (edit) ──────────────────────────────────────────────
        const siNo = (id, val) => `<select id="${id}"><option value="Si" ${val==='Si'?'selected':''}>Sí</option><option value="No" ${val==='No'?'selected':''}>No</option></select>`;

        const sriFormHTML = editSRI ? `
            <form onsubmit="App.handleFichaSRISubmit(event)" style="margin-top:16px;">
                <div class="form-grid" style="grid-template-columns: repeat(auto-fill, minmax(180px,1fr));">
                    <div class="form-group"><label>Razón Social</label><input type="text" id="fich-name" value="${App.escapeHTML(c.name)}" required></div>
                    <div class="form-group"><label>RUC</label><input type="text" id="fich-ruc" maxlength="13" value="${App.escapeHTML(c.ruc)}" required></div>
                    <div class="form-group"><label>Régimen</label><select id="fich-regime">${conf.regimenes.map(o=>`<option value="${o}" ${c.regime===o?'selected':''}>${o}</option>`).join('')}</select></div>
                    <div class="form-group"><label>Forma</label><select id="fich-frecuencia"><option value="Mensual" ${c.frecuencia==='Mensual'?'selected':''}>Mensual</option><option value="Anual" ${c.frecuencia==='Anual'?'selected':''}>Anual</option></select></div>
                    <div class="form-group"><label>Tipo</label><select id="fich-tipo"><option value="P. Natural" ${c.tipo==='P. Natural'?'selected':''}>P. Natural</option><option value="Sociedad" ${c.tipo==='Sociedad'?'selected':''}>Sociedad</option><option value="Tercera Edad" ${c.tipo==='Tercera Edad'?'selected':''}>Tercera Edad</option><option value="Discapacidad" ${c.tipo==='Discapacidad'?'selected':''}>Discapacidad</option><option value="Trabajador Público" ${c.tipo==='Trabajador Público'?'selected':''}>Trabajador Público</option><option value="Otro" ${c.tipo==='Otro'?'selected':''}>Otro</option></select></div>
                    <div class="form-group"><label>Clave SRI</label><div style="position:relative;"><input type="password" id="fich-clave-sri" value="${App.escapeHTML(c.claveSRI||'')}" style="padding-right:78px;"><div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;"><button type="button" class="pw-action-btn" onclick="App.copyToClipboard('fich-clave-sri')">${Icons.copy(14)}</button><button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('fich-clave-sri')">${Icons.eye(14)}</button></div></div></div>
                </div>
                <div style="border-top:1px solid var(--border-color);margin:14px 0 10px;padding-top:12px;font-size:0.72rem;font-weight:700;letter-spacing:1px;color:var(--text-secondary);">OBLIGACIONES TRIBUTARIAS</div>
                <div class="form-grid" style="grid-template-columns: repeat(auto-fill, minmax(120px,1fr));">
                    <div class="form-group"><label>SUPER CIA</label><select id="fich-super-cia" onchange="App.toggleSuperCiaFields(this.value, 'fich')"><option value="Si" ${c.oblSuperCia==='Si'?'selected':''}>Sí</option><option value="No" ${c.oblSuperCia==='No'?'selected':''}>No</option></select></div>
                    <div class="form-group"><label>IVA</label>${siNo('fich-iva', c.oblIVA||'No')}</div>
                    <div class="form-group"><label>RENTA</label>${siNo('fich-renta', c.oblRenta||'No')}</div>
                    <div class="form-group"><label>ATS</label>${siNo('fich-ats', c.oblATS||'No')}</div>
                    <div class="form-group"><label>ADI</label>${siNo('fich-adi', c.oblADI||'No')}</div>
                    <div class="form-group"><label>GP</label>${siNo('fich-gp', c.oblGP||'No')}</div>
                    <div class="form-group"><label>REBEFICS</label>${siNo('fich-rebefics', c.oblRebefics||'No')}</div>
                </div>
                <div id="fich-super-cia-container" style="display: ${c.oblSuperCia === 'Si' ? 'block' : 'none'}; margin-top: 15px; padding: 16px; background: rgba(var(--primary-rgb), 0.04); border-radius: 12px; border: 1px solid rgba(var(--primary-rgb), 0.15);">
                    <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 1px; color: var(--text-secondary); margin-bottom: 12px;">CREDENCIALES SUPER CIA</div>
                    <div style="display: flex; gap: 15px; max-width: 600px;">
                        <div class="form-group" style="flex: 1;"><label>Usuario</label><input type="text" id="fich-super-cia-user" value="${App.escapeHTML(c.superCiaUser||'')}"></div>
                        <div class="form-group" style="flex: 1;"><label>Contraseña</label><div style="position:relative;"><input type="password" id="fich-super-cia-pass" value="${App.escapeHTML(c.superCiaPass||'')}" style="padding-right:78px;"><div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;"><button type="button" class="pw-action-btn" onclick="App.copyToClipboard('fich-super-cia-pass')">${Icons.copy(14)}</button><button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('fich-super-cia-pass')">${Icons.eye(14)}</button></div></div></div>
                    </div>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px;">
                    <button type="button" class="btn btn-secondary" onclick="App.setFichaSection(null)">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar SRI</button>
                </div>
            </form>` : '';

        // ── Formulario Facturación (edit) ─────────────────────────────────────
        const factFormHTML = editFact ? `
            <form onsubmit="App.handleFichaFacturacionSubmit(event)" style="margin-top:16px;">
                <div class="form-grid" style="grid-template-columns: repeat(auto-fill, minmax(180px,1fr));">
                    <div class="form-group"><label>Usuario</label><input type="text" id="fact-usuario" value="${App.escapeHTML(factUsuario)}"></div>
                    <div class="form-group"><label>Clave</label><div style="position:relative;"><input type="password" id="fact-clave" value="${App.escapeHTML(factClave)}" style="padding-right:78px;"><div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;"><button type="button" class="pw-action-btn" onclick="App.copyToClipboard('fact-clave')">${Icons.copy(14)}</button><button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('fact-clave')">${Icons.eye(14)}</button></div></div></div>
                    <div class="form-group"><label>N° Comprobantes</label><input type="text" id="fact-num-comp" value="${App.escapeHTML(factNumComp)}"></div>
                    <div class="form-group"><label>Fecha Emisión</label><input type="date" id="fact-emitido" value="${factEmitido}"></div>
                    <div class="form-group"><label>Fecha Caducidad</label><input type="date" id="fact-caduca" value="${factCaduca}"></div>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px;">
                    <button type="button" class="btn btn-secondary" onclick="App.setFichaSection(null)">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Facturación</button>
                </div>
            </form>` : '';

        // ── Formulario Firma (edit) ───────────────────────────────────────────
        const firmaFormHTML = editFirma ? `
            <form onsubmit="App.handleFichaFirmaSubmit(event)" style="margin-top:16px;">
                <div class="form-grid" style="grid-template-columns: repeat(auto-fill, minmax(180px,1fr));">
                    <div class="form-group"><label>Clave</label><div style="position:relative;"><input type="password" id="firma-clave" value="${App.escapeHTML(firmaClave)}" style="padding-right:78px;"><div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;"><button type="button" class="pw-action-btn" onclick="App.copyToClipboard('firma-clave')">${Icons.copy(14)}</button><button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('firma-clave')">${Icons.eye(14)}</button></div></div></div>
                    <div class="form-group"><label>Fecha Emisión</label><input type="date" id="firma-emision" value="${firmaEmision}"></div>
                    <div class="form-group"><label>Fecha Caducidad</label><input type="date" id="firma-caduca" value="${firmaCaduca}"></div>
                    <div class="form-group"><label>Vigencia (años)</label><select id="firma-tiempo"><option value="1" ${firmaTiempo==='1'?'selected':''}>1 año</option><option value="2" ${firmaTiempo==='2'?'selected':''}>2 años</option></select></div>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px;">
                    <button type="button" class="btn btn-secondary" onclick="App.setFichaSection(null)">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Firma</button>
                </div>
            </form>` : '';

        // ── Vista display de cada sección ─────────────────────────────────────
        const oblList = [
            ['SUPER CIA', c.oblSuperCia], ['IVA', c.oblIVA], ['RENTA', c.oblRenta],
            ['ATS', c.oblATS], ['ADI', c.oblADI], ['GP', c.oblGP], ['REBEFICS', c.oblRebefics]
        ];

        const sriDisplay = !editSRI ? `
            <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:12px;">
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">RÉGIMEN</div><div style="font-weight:600;">${App.escapeHTML(c.regime||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">FORMA</div><div style="font-weight:600;">${App.escapeHTML(c.frecuencia||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">DÍA MÁX.</div><div style="font-weight:700;font-family:var(--font-mono);">${c.diaMaximo||'—'}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CLAVE SRI</div><div style="font-weight:600;">${pwDisplay('sri-clave', c.claveSRI)}</div></div>
            </div>
            ${c.actividades && c.actividades.length > 0 ? `
            <div style="margin-top:16px;">
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">ACTIVIDADES ECONÓMICAS</div>
                <div style="max-height:120px;overflow-y:auto;padding-right:5px;">
                    ${c.actividades.map(act => `
                        <div style="display:flex; align-items:center; gap:8px; padding:4px 0; border-bottom:1px solid var(--border-color);">
                            <span style="font-size:0.65rem; font-weight:700; background:var(--primary); color:white; padding:2px 6px; border-radius:4px;">${act.tarifa}</span>
                            <span style="font-size:0.7rem;">${App.escapeHTML(act.name)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            ${c.oblSuperCia === 'Si' ? `
            <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:16px;padding:12px 16px;background:rgba(var(--primary-rgb),0.04);border-radius:8px;border:1px solid rgba(var(--primary-rgb),0.15);">
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">USUARIO SUPER CIA</div><div style="font-weight:600;">${App.escapeHTML(c.superCiaUser||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CLAVE SUPER CIA</div><div style="font-weight:600;">${pwDisplay('sri-super-cia-pass', c.superCiaPass)}</div></div>
            </div>
            ` : ''}
            <div style="border-top:1px solid var(--border-color);margin-top:14px;padding-top:12px;display:flex;flex-wrap:wrap;gap:10px;">
                ${oblList.map(([k,v])=>`<div style="text-align:center;"><div style="font-size:0.65rem;color:var(--text-secondary);margin-bottom:4px;">${k}</div>${pill(v)}</div>`).join('')}
            </div>` : '';

        const factDisplay = !editFact ? `
            <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:12px;">
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">USUARIO</div><div style="font-weight:600;">${App.escapeHTML(factUsuario||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CLAVE</div><div style="font-weight:600;">${pwDisplay('fact-clave', factClave)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">N° COMPROBANTES</div><div style="font-weight:600;">${App.escapeHTML(factNumComp||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">EMISIÓN</div><div style="font-weight:600;">${formatDate(factEmitido)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CADUCIDAD</div><div style="font-weight:600;display:flex;align-items:center;gap:6px;">${formatDate(factCaduca)} ${statusDot(factCaduca)}</div></div>
            </div>` : '';

        const firmaDisplay = !editFirma ? `
            <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:12px;">
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CLAVE</div><div style="font-weight:600;">${pwDisplay('firma-clave', firmaClave)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">EMISIÓN</div><div style="font-weight:600;">${formatDate(firmaEmision)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CADUCIDAD</div><div style="font-weight:600;display:flex;align-items:center;gap:6px;">${formatDate(firmaCaduca)} ${statusDot(firmaCaduca)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">VIGENCIA</div><div style="font-weight:600;">${firmaTiempo ? firmaTiempo + ' año(s)' : '—'}</div></div>
            </div>` : '';

        const sectionCard = (icon, title, accent, sectionKey, displayHTML, formHTML) => {
            const active = isEditing === sectionKey;
            const isEditable = sectionKey !== 'contacto';
            return `
            <div class="glass-card animate-fadeIn" style="border-left: 3px solid ${accent}; margin-bottom: 16px; padding: 20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="font-size:1.3rem;">${icon}</span>
                        <span style="font-weight:700;font-size:0.95rem;color:${accent};">${title}</span>
                    </div>
                    ${isAdmin && !active && isEditable ? `<button class="btn btn-secondary" style="padding:4px 14px;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;" onclick="App.setFichaSection('${sectionKey}')">${Icons.edit(14)} Editar</button>` : ''}
                </div>
                ${displayHTML}
                ${formHTML || ''}
            </div>`;
        };

        const contactoDisplay = `
            <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:12px;">
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CORREO</div><div style="font-weight:600;">${App.escapeHTML(c.correo||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">TELÉFONO</div><div style="font-weight:600;">${App.escapeHTML(c.telefono||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">DIRECCIÓN</div><div style="font-weight:600;">${App.escapeHTML(c.direccion||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CONTRASEÑA</div><div style="font-weight:600;">${pwDisplay('contacto-pass', c.contrasena)}</div></div>
            </div>`;

        return `
            <div class="animate-fadeIn">
                <!-- Header de la ficha -->
                <div class="glass-card" style="margin-bottom:16px;background:linear-gradient(135deg,rgba(var(--primary-rgb),0.08),rgba(var(--primary-rgb),0.02));">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
                        <div>
                            <button onclick="App.closeFicha()" style="display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,rgba(var(--primary-rgb),0.1),rgba(var(--primary-rgb),0.04));border:1px solid rgba(var(--primary-rgb),0.2);border-radius:var(--radius-md);color:var(--primary);font-size:0.82rem;font-weight:600;padding:7px 15px;cursor:pointer;margin-bottom:14px;transition:all 0.2s;letter-spacing:0.3px;" onmouseover="this.style.background='rgba(var(--primary-rgb),0.18)';this.style.borderColor='rgba(var(--primary-rgb),0.45)';this.style.transform='translateX(-3px)';" onmouseout="this.style.background='linear-gradient(135deg,rgba(var(--primary-rgb),0.1),rgba(var(--primary-rgb),0.04))';this.style.borderColor='rgba(var(--primary-rgb),0.2)';this.style.transform='translateX(0)';"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Volver a Cartera</button>
                            <h2 style="margin:0 0 6px;font-size:1.5rem;">${App.escapeHTML(c.name)}</h2>
                            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                                <span style="font-family:var(--font-mono);color:var(--text-secondary);font-size:0.9rem;">${App.escapeHTML(c.ruc)}</span>
                                <span class="badge" style="background:rgba(var(--primary-rgb),0.15);color:var(--primary);padding:3px 10px;border-radius:20px;font-size:0.78rem;font-weight:600;">${App.escapeHTML(c.regime||'—')}</span>
                                <span class="badge" style="background:rgba(100,100,100,0.1);color:var(--text-secondary);padding:3px 10px;border-radius:20px;font-size:0.78rem;">${App.escapeHTML(c.frecuencia||'Mensual')}</span>
                            </div>
                        </div>
                        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
                            <div style="display:flex;align-items:center;gap:8px;font-size:0.82rem;">
                                ${statusDot(firmaCaduca)} <span style="color:var(--text-secondary);">Firma: ${formatDate(firmaCaduca)}</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;font-size:0.82rem;">
                                ${statusDot(factCaduca)} <span style="color:var(--text-secondary);">Facturación: ${formatDate(factCaduca)}</span>
                            </div>
                            <div style="font-size:0.82rem;color:var(--text-secondary);">Día máx.: <strong style="font-family:var(--font-mono);">${c.diaMaximo||'—'}</strong></div>
                        </div>
                    </div>
                </div>

                <!-- Sección Contacto -->
                ${sectionCard(Icons.navClients ? Icons.navClients() : '👤', 'Perfil / Contacto', '#3b82f6', 'contacto', contactoDisplay, '')}

                <!-- Sección SRI -->
                ${sectionCard(Icons.sectionSRI(),'Datos SRI','var(--primary)','sri', sriDisplay, sriFormHTML)}

                <!-- Sección Facturación -->
                ${sectionCard(Icons.sectionFacturacion(),'Facturación Electrónica','#0d9488','facturacion', factDisplay, factFormHTML)}

                <!-- Sección Firma Digital -->
                ${sectionCard(Icons.sectionFirma(),'Firma Digital','#8b5cf6','firma', firmaDisplay, firmaFormHTML)}
            </div>
        `;
    },



    renderRecentSriClients() {
        const clients = (Store.get('clientes') || []).filter(c => c.status !== 'archived');
        // Sort alphabetically and show up to 6 clients
        const recent = [...clients]
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            .slice(0, 6);

        if (recent.length === 0) {
            return `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 20px; font-size: 0.85rem;">No hay clientes registrados aún.</div>`;
        }

        return recent.map(c => {
            const initials = (c.name || '?').charAt(0).toUpperCase();
            const hasRUC = c.ruc && c.ruc.length > 0;
            return `
                <div class="recent-client-card" onclick="App.selectClient('${c.id}')">
                    <div class="recent-name" title="${App.escapeHTML(c.name)}">${App.escapeHTML(c.name)}</div>
                    <div class="recent-ruc">${hasRUC ? App.escapeHTML(c.ruc) : '<em style="opacity:0.5;">Sin RUC</em>'}</div>
                </div>
            `;
        }).join('');
    },

    auditLogs() {
        return `
            <div class="audit-container animate-fadeIn">
                <div class="audit-filters">
                    <div class="audit-filter-group">
                        <label>Desde</label>
                        <input type="date" id="audit-filter-start" onchange="App.handleAuditFilterChange()">
                    </div>
                    <div class="audit-filter-group">
                        <label>Hasta</label>
                        <input type="date" id="audit-filter-end" onchange="App.handleAuditFilterChange()">
                    </div>
                    <div class="audit-filter-group">
                        <label>Módulo</label>
                        <select id="audit-filter-module" onchange="App.handleAuditFilterChange()">
                            <option value="all">Todos los Módulos</option>
                            <option value="SRI">Compra y Venta (SRI)</option>
                            <option value="CLIENTES">Clientes</option>
                            <option value="BANCOS">Bancos / Finanzas</option>
                            <option value="CUENTAS">Gestión de Cuentas</option>
                            <option value="ROLES">Seguridad / Roles</option>
                        </select>
                    </div>
                    <div class="audit-filter-group" style="flex: 0.5; min-width: 120px;">
                        <button class="btn btn-secondary" style="width: 100%; height: 42px;" onclick="App.resetAuditFilters()">
                            Reiniciar
                        </button>
                    </div>
                </div>

                <div id="audit-logs-timeline" class="audit-timeline">
                    <!-- Logs will be rendered here by App.renderAuditLogs -->
                    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        ${Icons.loading(32)}
                        <p style="margin-top: 12px;">Cargando registros de auditoría...</p>
                    </div>
                </div>

                <div id="audit-load-more" style="text-align: center; margin-top: 30px; display: none;">
                    <button class="btn btn-secondary" onclick="App.loadMoreAuditLogs()">
                        Cargar más registros
                    </button>
                </div>
            </div>
        `;
    },

    auditLogList(logs) {
        if (!logs || logs.length === 0) {
            return `
                <div style="text-align: center; padding: 60px; background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-color); margin-top: 20px;">
                    <div style="opacity: 0.3; margin-bottom: 16px;">${Icons.navAudit ? Icons.navAudit(48) : '📋'}</div>
                    <h3 style="color: var(--text-secondary);">No se encontraron registros</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Prueba ajustando los filtros de búsqueda.</p>
                </div>
            `;
        }

        return logs.map(log => {
            const date = log.timestamp?.toDate ? log.timestamp.toDate() : (log.timestamp instanceof Date ? log.timestamp : new Date());
            const timeStr = date.toLocaleString('es-EC', { 
                day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
            });
            const actionClass = `action-${(log.action || 'default').toLowerCase()}`;
            const detailsJson = log.details ? JSON.stringify(log.details, null, 2) : null;
            const logId = log.id ? log.id.substring(0, 8) : '---';

            return `
                <div class="audit-card ${actionClass}">
                    <div class="audit-header">
                        <div class="audit-user">
                            <div class="audit-avatar" style="background: var(--primary-gradient); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; border: none; box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);">
                                ${log.userName ? log.userName.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                                <div class="audit-username">${App.escapeHTML(log.userName || log.userId || 'Sistema')}</div>
                                <div class="audit-time">${timeStr}</div>
                            </div>
                        </div>
                        <div class="audit-module-badge">${log.module}</div>
                    </div>
                    <div class="audit-body">
                        <div class="audit-description">${App.escapeHTML(log.description || 'Sin descripción')}</div>
                        </div>
                        ${detailsJson ? `
                            <button class="audit-details-btn" onclick="App.toggleAuditDetails(this)">
                                ${Icons.chevronDown ? Icons.chevronDown(12) : '▼'} Ver detalles técnicos
                            </button>
                            <pre class="audit-details-json">${App.escapeHTML(detailsJson)}</pre>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },
    estadosFinancieros() {
        // 1. Efectivo y Equivalentes
        const bancosRaw = State.bancosData || [];
        const bancosCorrientes = [];
        const bancosNoCorrientes = [];
        const cajas = [];
        
        let totalBancosCorrientes = 0;
        let totalBancosNoCorrientes = 0;
        let totalCajas = 0;
        
        bancosRaw.forEach(b => {
            if (b.nombre.toLowerCase().includes('caja')) {
                cajas.push(b);
                totalCajas += b.saldo_actual || 0;
            } else {
                if (b.clasificacion === 'no_corriente') {
                    bancosNoCorrientes.push(b);
                    totalBancosNoCorrientes += b.saldo_actual || 0;
                } else {
                    bancosCorrientes.push(b);
                    totalBancosCorrientes += b.saldo_actual || 0;
                }
            }
        });
        
        const totalEfectivo = totalBancosCorrientes + totalCajas;
        
        let bancosHTML = bancosCorrientes.map(b => `
            <div class="fin-row sub-row">
                <span class="fin-label">${b.nombre}</span>
                <span class="fin-value">${App.formatMoney(b.saldo_actual || 0)}</span>
            </div>
        `).join('');
        if (!bancosHTML) bancosHTML = '<div class="fin-row sub-row"><span class="fin-label" style="color:var(--text-secondary);font-style:italic;">Sin bancos corrientes</span><span></span></div>';

        let bancosNoCorrientesHTML = bancosNoCorrientes.map(b => `
            <div class="fin-row sub-row">
                <span class="fin-label">${b.nombre}</span>
                <span class="fin-value">${App.formatMoney(b.saldo_actual || 0)}</span>
            </div>
        `).join('');
        if (!bancosNoCorrientesHTML) bancosNoCorrientesHTML = '<div class="fin-row sub-row"><span class="fin-label" style="color:var(--text-secondary);font-style:italic;">Sin inversiones a largo plazo</span><span></span></div>';
        
        let cajasHTML = cajas.map(c => `
            <div class="fin-row sub-row">
                <span class="fin-label">${c.nombre}</span>
                <span class="fin-value">${App.formatMoney(c.saldo_actual || 0)}</span>
            </div>
        `).join('');

        // 2. Cuentas por Cobrar (Activos)
        const cuentasCobrar = State.cuentasCobrarData || [];
        const cobrarC_PorCliente = {}; // Corriente
        const cobrarNC_PorCliente = {}; // No Corriente
        
        cuentasCobrar.forEach(c => {
            const p = parseFloat(c.pendiente) || 0;
            if (p > 0) {
                const nombre = c.cliente || 'S/N';
                if (c.clasificacion === 'NO_CORRIENTE') {
                    cobrarNC_PorCliente[nombre] = (cobrarNC_PorCliente[nombre] || 0) + p;
                } else {
                    cobrarC_PorCliente[nombre] = (cobrarC_PorCliente[nombre] || 0) + p;
                }
            }
        });
        
        let totalCobrarCorriente = 0;
        let cobrarCorrienteHTML = '';
        for (const [cli, monto] of Object.entries(cobrarC_PorCliente)) {
            totalCobrarCorriente += monto;
            cobrarCorrienteHTML += `
                <div class="fin-row sub-row">
                    <span class="fin-label">${cli}</span>
                    <span class="fin-value">${App.formatMoney(monto)}</span>
                </div>
            `;
        }
        if (!cobrarCorrienteHTML) cobrarCorrienteHTML = '<div class="fin-row sub-row"><span class="fin-label" style="color:var(--text-secondary);font-style:italic;">Sin cuentas por cobrar (Corto Plazo)</span><span></span></div>';

        let totalCobrarNoCorriente = 0;
        let cobrarNoCorrienteHTML = '';
        for (const [cli, monto] of Object.entries(cobrarNC_PorCliente)) {
            totalCobrarNoCorriente += monto;
            cobrarNoCorrienteHTML += `
                <div class="fin-row sub-row">
                    <span class="fin-label">${cli}</span>
                    <span class="fin-value">${App.formatMoney(monto)}</span>
                </div>
            `;
        }
        if (!cobrarNoCorrienteHTML) cobrarNoCorrienteHTML = '<div class="fin-row sub-row"><span class="fin-label" style="color:var(--text-secondary);font-style:italic;">Sin cuentas por cobrar (Largo Plazo)</span><span></span></div>';

        const totalActivoCorriente = totalEfectivo + totalCobrarCorriente;
        const totalActivoNoCorriente = totalCobrarNoCorriente + totalBancosNoCorrientes;
        const totalActivos = totalActivoCorriente + totalActivoNoCorriente;

        // 3. Cuentas por Pagar (Pasivos)
        const cuentasPagar = State.cuentasPagarData || [];
        const pagarC_PorCliente = {}; // Corriente
        const pagarNC_PorCliente = {}; // No Corriente
        
        cuentasPagar.forEach(c => {
            const p = parseFloat(c.pendiente) || 0;
            if (p > 0) {
                const nombre = c.proveedor || c.cliente || 'S/N';
                if (c.clasificacion === 'NO_CORRIENTE') {
                    pagarNC_PorCliente[nombre] = (pagarNC_PorCliente[nombre] || 0) + p;
                } else {
                    pagarC_PorCliente[nombre] = (pagarC_PorCliente[nombre] || 0) + p;
                }
            }
        });

        let totalPagarCorriente = 0;
        let pagarCorrienteHTML = '';
        for (const [cli, monto] of Object.entries(pagarC_PorCliente)) {
            totalPagarCorriente += monto;
            pagarCorrienteHTML += `
                <div class="fin-row sub-row">
                    <span class="fin-label">${cli}</span>
                    <span class="fin-value">${App.formatMoney(monto)}</span>
                </div>
            `;
        }
        if (!pagarCorrienteHTML) pagarCorrienteHTML = '<div class="fin-row sub-row"><span class="fin-label" style="color:var(--text-secondary);font-style:italic;">Sin cuentas por pagar (Corto Plazo)</span><span></span></div>';

        let totalPagarNoCorriente = 0;
        let pagarNoCorrienteHTML = '';
        for (const [cli, monto] of Object.entries(pagarNC_PorCliente)) {
            totalPagarNoCorriente += monto;
            pagarNoCorrienteHTML += `
                <div class="fin-row sub-row">
                    <span class="fin-label">${cli}</span>
                    <span class="fin-value">${App.formatMoney(monto)}</span>
                </div>
            `;
        }
        if (!pagarNoCorrienteHTML) pagarNoCorrienteHTML = '<div class="fin-row sub-row"><span class="fin-label" style="color:var(--text-secondary);font-style:italic;">Sin cuentas por pagar (Largo Plazo)</span><span></span></div>';

        const totalPasivoCorriente = totalPagarCorriente;
        const totalPasivoNoCorriente = totalPagarNoCorriente;
        const totalPasivos = totalPasivoCorriente + totalPasivoNoCorriente;

        // 4. Patrimonio (Manual input from dashboardMeta)
        const capitalManual = Store.dashboardMeta?.capital || 0;
        const capital = capitalManual;

        // 5. Cuadre
        const sumaPasivoPatrimonio = totalPasivos + capital;
        const diferencia = totalActivos - sumaPasivoPatrimonio;
        const estaCuadrado = Math.abs(diferencia) < 0.01;
        const cuadreText = estaCuadrado ? 'CUADRADO' : `DESCUADRE POR: ${App.formatMoney(diferencia)}`;
        const cuadreClass = estaCuadrado ? 'cuadre-ok' : 'cuadre-error';

        return `
            <style>
                .fin-header { margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
                .fin-title { font-size: 1.5rem; font-weight: 800; color: #c084fc; margin: 0; text-transform: uppercase; }
                .fin-subtitle { color: #e9d5ff; font-size: 0.85rem; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;}

                .fin-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                
                @media (max-width: 900px) {
                    .fin-grid { grid-template-columns: 1fr; }
                }

                .fin-col {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .fin-group {
                    background: rgba(var(--primary-rgb), 0.02);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .fin-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 16px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }
                [data-theme="dark"] .fin-row {
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .fin-row:last-child { border-bottom: none; }

                /* Colores solicitados: Naranja, Verde, Fucsia */
                .fin-row.main-header.activo {
                    background: linear-gradient(135deg, rgba(242, 86, 0, 0.15), rgba(0, 210, 58, 0.15));
                    font-weight: 800; font-size: 1.1rem; color: #F25600; 
                }
                .fin-row.main-header.pasivo {
                    background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.15));
                    font-weight: 800; font-size: 1.1rem; color: #c2410c; 
                }
                .fin-row.main-header.patrimonio {
                    background: linear-gradient(135deg, rgba(217, 70, 239, 0.15), rgba(192, 38, 211, 0.15));
                    font-weight: 800; font-size: 1.1rem; color: #a21caf; 
                }

                .fin-row.sub-header {
                    font-weight: 700;
                    font-size: 0.95rem;
                }
                .fin-row.sub-header.activo-sub { 
                    background: rgba(0, 0, 0, 0.1); 
                    color: #008B27; 
                }
                .fin-row.sub-header.pasivo-sub { background: rgba(0, 0, 0, 0.1); color: #ea580c; }
                .fin-row.sub-header.patrimonio-sub { background: rgba(0, 0, 0, 0.1); color: #c026d3; }

                [data-theme="dark"] .fin-row.main-header.activo,
                [data-theme="dark"] .fin-row.main-header.pasivo,
                [data-theme="dark"] .fin-row.main-header.patrimonio,
                [data-theme="dark"] .fin-row.sub-header.activo-sub,
                [data-theme="dark"] .fin-row.sub-header.pasivo-sub,
                [data-theme="dark"] .fin-row.sub-header.patrimonio-sub { 
                    background: transparent;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                }
                
                .bg-coral, [data-theme="dark"] .bg-coral { background: #FF6F61 !important; color: white !important; -webkit-text-fill-color: white !important; text-shadow: none !important; border: none !important; border-radius: 6px; margin-bottom: 2px;}
                .bg-turquesa, [data-theme="dark"] .bg-turquesa { background: #0d9488 !important; color: white !important; -webkit-text-fill-color: white !important; text-shadow: none !important; border: none !important; border-radius: 6px; margin-bottom: 2px;}
                .bg-naranja, [data-theme="dark"] .bg-naranja { background: #E34C0D !important; color: white !important; -webkit-text-fill-color: white !important; text-shadow: none !important; border: none !important; border-radius: 6px; margin-bottom: 2px;}
                .bg-verde, [data-theme="dark"] .bg-verde { background: #10b981 !important; color: white !important; -webkit-text-fill-color: white !important; text-shadow: none !important; border: none !important; border-radius: 6px; margin-bottom: 2px;}
                .bg-crema, [data-theme="dark"] .bg-crema { background: #FDF5E6 !important; color: #000000 !important; -webkit-text-fill-color: #000000 !important; text-shadow: none !important; border: none !important; border-radius: 6px; margin-bottom: 2px;}
                .bg-blanco, [data-theme="dark"] .bg-blanco { background: #FFFFFF !important; color: #000000 !important; -webkit-text-fill-color: #000000 !important; text-shadow: none !important; border: none !important; border-radius: 6px; margin-bottom: 2px;}
                [data-theme="dark"] .bg-blanco .fin-value, [data-theme="dark"] .bg-blanco .fin-label, .bg-blanco .fin-value, .bg-blanco .fin-label { color: #000000 !important; -webkit-text-fill-color: #000000 !important; }
                
                /* Ensure specific header values are white as requested */
                .bg-naranja .fin-value, .bg-verde .fin-value,
                [data-theme="dark"] .bg-naranja .fin-value, [data-theme="dark"] .bg-verde .fin-value {
                    color: #FFFFFF !important;
                    -webkit-text-fill-color: #FFFFFF !important;
                }
                [data-theme="dark"] .bg-crema .fin-value, .bg-crema .fin-value {
                    color: #000000 !important;
                    -webkit-text-fill-color: #000000 !important;
                }



                [data-theme="dark"] .fin-row.main-header.pasivo { color: #fb923c; }
                [data-theme="dark"] .fin-row.main-header.patrimonio { color: #e879f9; }
                [data-theme="dark"] .fin-row.sub-header.pasivo-sub { color: #fdba74; }
                [data-theme="dark"] .fin-row.sub-header.patrimonio-sub { color: #f0abfc; }

                .fin-row.sub-row {
                    padding-left: 32px;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }
                .fin-row.sub-row:hover {
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .fin-label { text-transform: uppercase; letter-spacing: 0.5px; }
                .fin-value { font-family: monospace; font-size: 1rem; color: var(--text-primary); font-weight: 600;}
                
                .cuadre-ok { background: #F59E0B; color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
                .cuadre-error { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }

                [data-theme="dark"] .fin-value {
                    color: #ffffff !important;
                    -webkit-text-fill-color: #ffffff !important;
                    text-shadow: none !important;
                }

                .fin-total-box {
                    padding: 16px;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.2rem;
                    color: white;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .fin-total-box.activo-total { background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); }
                [data-theme="dark"] .fin-total-box.activo-total { background: linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9)); box-shadow: inset 0 0 20px rgba(255, 60, 0, 0.05); }
                
                .fin-total-box.general-total { background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); }
                [data-theme="dark"] .fin-total-box.general-total { background: linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9)); box-shadow: inset 0 0 20px rgba(192, 38, 211, 0.05); }

                .cuadre-badge {
                    margin-top: 16px;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 800;
                    text-align: center;
                    letter-spacing: 2px;
                    font-size: 0.9rem;
                    color: white;
                }
                .cuadre-ok { background: #F59E0B !important; color: white !important; }
                .cuadre-error { background: linear-gradient(135deg, #e11d48, #be123c); }
                
                .fin-scrollable-list {
                    max-height: 250px;
                    overflow-y: auto;
                }
                
                /* --- PRINT STYLES --- */
                @media print {
                    @page { margin: 0.5cm; } 
                    body { background: white !important; margin: 0 !important; padding: 0 !important; font-size: 11px; }
                    .sidebar, .header, .fin-header button { display: none !important; }
                    .dashboard-layout { display: block !important; padding: 0 !important; margin: 0 !important; }
                    .main-content-wrapper, .main-content { 
                        margin: 0 !important; 
                        padding: 1cm !important; 
                        width: 100% !important; 
                        max-width: none !important; 
                        box-sizing: border-box;
                    }
                    /* Mantener la cuadrícula lado a lado */
                    .fin-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
                    .fin-col { margin-bottom: 0 !important; display: flex !important; }
                    
                    .fin-group { border: 1px solid #ddd; margin-bottom: 15px !important; break-inside: avoid; page-break-inside: avoid; }
                    
                    .fin-row.main-header, .fin-row.sub-header, .fin-total-box, .cuadre-badge,
                    .fin-row.main-header.activo, .fin-row.main-header.pasivo, .fin-row.main-header.patrimonio,
                    .fin-total-box.activo-total, .fin-total-box.general-total, .cuadre-ok, .cuadre-error {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    /* Ajustar tamaños para impresión */
                    .fin-row .fin-label, .fin-total-box .fin-label, .txt-color-1, .txt-color-2, .txt-color-3 { color: #000000 !important; -webkit-text-fill-color: #000000 !important; text-shadow: none !important; }
                    .fin-row .fin-value, .fin-total-box .fin-value, .fin-value { color: #000000 !important; -webkit-text-fill-color: #000000 !important; font-weight: bold !important; text-shadow: none !important; }
                    .fin-header { margin-bottom: 15px !important; }
                    .fin-title { font-size: 1.2rem !important; color: #6b21a8 !important; }
                    .fin-subtitle { font-size: 0.8rem !important; color: #8b5cf6 !important; }
                    .fin-row { padding: 8px 12px !important; }
                    .fin-row.sub-row { padding-left: 24px !important; }
                    .fin-label { font-size: 0.85rem !important; }
                    .fin-value { font-size: 0.95rem !important; }
                    
                    .fin-total-box { padding: 12px !important; font-size: 1.1rem !important; margin-top: 10px !important; }
                    .fin-scrollable-list { max-height: none !important; overflow: visible !important; }
                    .fin-row { break-inside: avoid; page-break-inside: avoid; }
                    .cuadre-badge { font-size: 0.8rem !important; padding: 6px 12px !important; }
                    
                    .print-only { display: block !important; }
                    .screen-only { display: none !important; }
                }
            </style>

            <div class="fin-header animate-fadeInDown" style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="${window.location.origin + window.location.pathname.replace('index.html', '')}logo.png" style="height: 55px; object-fit: contain;">
                    <div>
                        <h2 class="fin-title print-only" style="display:none;">JESSICA MABEL FAREZ MARCA</h2>
                        <h2 class="fin-title screen-only">Estado de Situación Financiera</h2>
                        <p class="fin-subtitle print-only" style="display:none;">Estado de Situación Financiera estructurado automáticamente.</p>
                        <p class="fin-subtitle screen-only">Balance General estructurado automáticamente según normativas contables.</p>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:15px;">
                    <div class="screen-only" style="display:flex; align-items:center; gap:8px; background: rgba(0,0,0,0.2); padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">CAPITAL:</span>
                        <input type="number" id="capitalInput" value="${capitalManual}" step="0.01" style="width: 120px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: var(--text-primary); padding: 5px 8px; border-radius: 4px; font-weight: bold; outline: none;">
                        <button class="btn btn-primary" onclick="Views.saveCapital()" style="padding: 6px 12px; font-size: 0.8rem; background: #0d9488; border: none;">Guardar</button>
                    </div>
                    <button class="btn btn-secondary" onclick="window.print()" style="display:flex; align-items:center; gap:8px;">
                        ${Icons.pdf ? Icons.pdf(18) : 'PDF'} Exportar Reporte
                    </button>
                </div>
            </div>

            <div class="fin-grid animate-fadeInUp">
                
                <!-- COLUMNA IZQUIERDA: ACTIVOS -->
                <div class="fin-col">
                    
                    <div class="fin-group">
                        <div class="fin-row main-header activo bg-naranja">
                            <span class="fin-label">ACTIVO CORRIENTE</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalActivoCorriente)}</span>
                        </div>
                        
                        <div class="fin-row sub-header activo-sub bg-crema">
                            <span class="fin-label">EFECTIVO Y EQUIVALENTES (Bancos)</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalBancosCorrientes)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${bancosHTML}
                        </div>

                        <div class="fin-row sub-header activo-sub bg-crema">
                            <span class="fin-label">CAJA GENERAL</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalCajas)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${cajasHTML}
                        </div>
                        
                        <div class="fin-row sub-header activo-sub bg-crema">
                            <span class="fin-label">CUENTAS POR COBRAR (CORTO PLAZO)</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalCobrarCorriente)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${cobrarCorrienteHTML}
                        </div>
                    </div>

                    <div class="fin-group">
                        <div class="fin-row main-header activo bg-naranja">
                            <span class="fin-label">ACTIVO NO CORRIENTE</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalActivoNoCorriente)}</span>
                        </div>
                        
                        <div class="fin-row sub-header activo-sub bg-crema">
                            <span class="fin-label">CUENTAS POR COBRAR (LARGO PLAZO)</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalCobrarNoCorriente)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${cobrarNoCorrienteHTML}
                        </div>
                        
                        <div class="fin-row sub-header activo-sub bg-crema">
                            <span class="fin-label">INVERSIONES Y DEPÓSITOS (Largo Plazo)</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalBancosNoCorrientes)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${bancosNoCorrientesHTML}
                        </div>
                    </div>

                    <div class="fin-total-box bg-verde">
                        <span class="fin-label">TOTAL ACTIVOS</span>
                        <span class="fin-value" style="color:inherit;">${App.formatMoney(totalActivos)}</span>
                    </div>

                </div>

                <!-- COLUMNA DERECHA: PASIVOS Y PATRIMONIO -->
                <div class="fin-col">
                    
                    <div class="fin-group">
                        <div class="fin-row main-header pasivo bg-naranja">
                            <span class="fin-label">PASIVO CORRIENTE</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalPasivoCorriente)}</span>
                        </div>
                        
                        <div class="fin-row sub-header pasivo-sub bg-crema">
                            <span class="fin-label">CUENTAS POR PAGAR (CORTO PLAZO)</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalPagarCorriente)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${pagarCorrienteHTML}
                        </div>
                    </div>
                    
                    <div class="fin-group">
                        <div class="fin-row main-header pasivo bg-naranja">
                            <span class="fin-label">PASIVO NO CORRIENTE</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalPasivoNoCorriente)}</span>
                        </div>
                        
                        <div class="fin-row sub-header pasivo-sub bg-crema">
                            <span class="fin-label">CUENTAS POR PAGAR (LARGO PLAZO)</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(totalPagarNoCorriente)}</span>
                        </div>
                        <div class="fin-scrollable-list">
                            ${pagarNoCorrienteHTML}
                        </div>
                    </div>

                    <!-- TOTAL PASIVOS -->
                    <div class="fin-row main-header bg-verde" style="margin-bottom:16px;">
                        <span class="fin-label">TOTAL PASIVO</span>
                        <span class="fin-value" style="color:inherit;">${App.formatMoney(totalPasivos)}</span>
                    </div>

                    <div class="fin-group">
                        <div class="fin-row main-header bg-naranja">
                            <span class="fin-label">PATRIMONIO NETO</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(capital)}</span>
                        </div>
                        
                        <div class="fin-row sub-header bg-crema">
                            <span class="fin-label">CAPITAL</span>
                            <span class="fin-value" style="color:inherit;">${App.formatMoney(capital)}</span>
                        </div>
                    </div>

                    <div style="flex:1;"></div>

                    <div class="fin-total-box bg-blanco">
                        <span class="fin-label">TOTAL PASIVO Y PATRIMONIO</span>
                        <span class="fin-value" style="color:inherit;">${App.formatMoney(sumaPasivoPatrimonio)}</span>
                    </div>

                    <div class="cuadre-badge ${cuadreClass}">
                        ${cuadreText}
                    </div>

                </div>

            </div>
        `;
    },

    saveCapital: async () => {
        const el = document.getElementById('capitalInput');
        if(el) {
            await Store.saveCapital(el.value);
            if(window.App && typeof window.App.notify === 'function') {
                App.notify('Capital guardado exitosamente', 'success');
            }
        }
    }

};

if (typeof window !== 'undefined') {
    window.Views = Views;
}
