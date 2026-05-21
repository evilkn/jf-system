const Views = {
    renderOptions(options) {
        return options.map(o => `<option value="${o}">${o}</option>`).join('');
    },

    splash() {
        return `
            <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-main); color: var(--text-primary); transition: background 0.3s ease;">
                <div style="margin-bottom: 24px; filter: drop-shadow(0 0 10px rgba(var(--primary-rgb), 0.3));">
                    <img src="logo.png" alt="JF Logo" class="logo-glow splash-logo" style="height: 110px;">
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
                        <img src="logo.png" alt="JF Logo" class="logo-glow" style="height: 80px; margin-bottom: 16px;">
                        <h1 style="font-family: var(--font-heading); font-size: 1.5rem; letter-spacing: 2px;">JF <span style="color: var(--primary);">SYSTEM</span></h1>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Sistema Administrativo Premium</p>
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

                    <!-- Brand -->
                    <div class="sidebar-brand">
                        <img src="logo.png" alt="Logo" class="logo-glow sidebar-logo" style="height: 60px;">
                        <div class="sidebar-brand-text">JF <span>SYSTEM</span></div>
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
            <div id="toast-container"></div>
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
                        <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; display:flex; justify-content:center;">
                            <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 16px; display:flex; align-items:center; gap:8px;" onclick="App.exportBankHistoryPDF('${banco.id}')">
                                ${Icons.export(14)} Descargar Historial (PDF)
                            </button>
                        </div>
                    </div>

                    <div class="glass-card" style="background: rgba(255,255,255,0.02); padding: 20px; border: 1px solid rgba(255,255,255,0.05);">
                        <h3 style="margin: 0 0 16px 0; font-size: 1.1rem;">Nuevo Movimiento</h3>
                        <form onsubmit="App.handleMovimientoSubmit(event, '${banco.id}')" style="display:grid; gap: 12px;">
                            <div class="form-group">
                                <label style="font-size: 0.75rem; opacity: 0.7;">Tipo de Movimiento</label>
                                <select id="mov-tipo" style="width: 100%; padding: 8px; background: var(--input-bg); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px;">
                                    <option value="ingreso">Ingreso (+)</option>
                                    <option value="egreso">Egreso (-)</option>
                                </select>
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
                            <button type="submit" class="btn btn-primary" style="margin-top: 8px; width: 100%;">Registrar Movimiento</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    getBankInfo(nombre) {
        const n = nombre.toLowerCase();
        if (n.includes('caja')) return { icon: Icons.cash(24), themeClass: 'bank-theme-generic' };
        if (n.includes('pichincha')) return { icon: '<img src="Bancos/banco_pichincha.png" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-pichincha' };
        if (n.includes('guayaquil')) return { icon: '<img src="Bancos/banco_guayaquil.png" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-guayaquil' };
        if (n.includes('jep')) return { icon: '<img src="Bancos/cooperativa_jep.png" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-jep' };
        if (n.includes('jardín azuayo') || n.includes('jardin azuayo')) return { icon: '<img src="Bancos/cooperativa_jardin_azuayo.png" style="width:100%; height:100%; object-fit:contain; border-radius:8px;">', themeClass: 'bank-theme-jardin' };
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
                                        <img src="Bancos/banco_pichincha.png" alt="Pichincha">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Banco Guayaquil" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <img src="Bancos/banco_guayaquil.png" alt="Guayaquil">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Cooperativa JEP" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <img src="Bancos/cooperativa_jep.png" alt="JEP">
                                    </div>
                                </label>
                                <label class="bank-option">
                                    <input type="radio" name="banco_seleccion" value="Cooperativa Jardín Azuayo" onchange="App.toggleOtroBanco()">
                                    <div class="bank-option-content">
                                        <img src="Bancos/cooperativa_jardin_azuayo.png" alt="Jardín Azuayo">
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
                        <div class="form-group" id="container-otro-banco" style="display:none;">
                            <label>Escribe el nombre del Banco/Cuenta</label>
                            <input type="text" id="banco-nombre-manual" placeholder="Ej. Caja Chica, Produbanco...">
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
        if (State.bancosData && State.bancosData.length > 0) {
            let sortedBancos = [...State.bancosData].sort((a, b) => {
                const isCajaA = a.nombre.toLowerCase().includes('caja');
                const isCajaB = b.nombre.toLowerCase().includes('caja');
                if (isCajaA && !isCajaB) return -1;
                if (!isCajaA && isCajaB) return 1;
                return a.nombre.localeCompare(b.nombre);
            });
            cardsHtml = sortedBancos.map(banco => {
                const bankInfo = Views.getBankInfo(banco.nombre);
                return `
                <div class="glass-card bank-card ${bankInfo.themeClass}" style="cursor: pointer; position: relative; overflow: hidden;">
                    <!-- Card action buttons overlay -->
                    <div class="bank-card-actions" onclick="event.stopPropagation()">
                        <button class="bank-action-btn bank-action-edit" onclick="App.showEditBancoModal('${banco.id}')" title="Editar">
                            ${Icons.edit ? Icons.edit(14) : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'}
                        </button>
                        <button class="bank-action-btn bank-action-delete" onclick="App.confirmarEliminarBanco('${banco.id}')" title="Eliminar">
                            ${Icons.trash ? Icons.trash(14) : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>'}
                        </button>
                    </div>
                    <!-- Clickable area -->
                    <div style="cursor: pointer;" onclick="App.openBancoDetail('${banco.id}')">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                            <h4 style="margin:0; font-size: 1.2rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); color: var(--text-primary);">${banco.nombre}</h4>
                            <div class="bank-logo-container">
                                ${bankInfo.icon}
                            </div>
                        </div>
                        <div class="bank-balance" style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 8px;">
                            ${State.hideAmounts ? '****' : App.formatMoney(banco.saldo_actual)}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); display:flex; justify-content:space-between; align-items:center; padding-top: 16px; border-top: 1px solid var(--glass-border);">
                            <span style="font-weight: 500;">Ver conciliación y transacciones</span>
                            <div class="arrow-btn">${Icons.arrowRight()}</div>
                        </div>
                    </div>
                </div>
            `}).join('');

        } else {
            cardsHtml = `
                <div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 40px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 12px; background: rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 12px; opacity: 0.5;">${Icons.bank()}</div>
                    <div style="font-size: 1.1rem; margin-bottom: 8px; color: var(--text-primary);">Aún no hay bancos registrados</div>
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
            
            <div id="bancos-resumen-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px;">
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

    dashboard() {
        const meta = Store.get('dashboardMeta') || { totalRegistros: 0, mensual: {}, clientes: {} };
        const clients = Store.get('clientes') || [];

        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();
        const prevMonthKey = currentMonth === 1
            ? `${currentYear - 1}-12`
            : `${currentYear}-${String(currentMonth - 1).padStart(2, '0')}`;
        const currentMonthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

        const curMonthMeta  = meta.mensual?.[currentMonthKey]  || { sales: 0, purchases: 0 };
        const prevMonthMeta = meta.mensual?.[prevMonthKey] || { sales: 0, purchases: 0 };

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

        return `
            <!-- ── SMART BANNER ─────────────────────────────────────────── -->
            ${this.renderDashboardBanner()}

            <!-- ── QUICK ACTIONS ─────────────────────────────────────────── -->
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="font-size:0.78rem; font-weight:600; letter-spacing:0.08em; color:var(--text-secondary); text-transform:uppercase;">Acciones rápidas</div>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button class="btn btn-primary dash-quick-btn" onclick="App.navigate('sri')" title="Ir a SRI">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Nueva Transacción
                    </button>
                    <button class="btn btn-secondary dash-quick-btn" onclick="App.showTransferModal()" title="Transferencia bancaria">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                        Transferencia
                    </button>
                    <button class="btn btn-secondary dash-quick-btn" onclick="App.showAddBancoModal()" title="Agregar banco">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><path d="M8 7V5a2 2 0 0 0-4 0v2"/></svg>
                        Agregar Banco
                    </button>
                    <button class="btn btn-secondary dash-quick-btn" onclick="App.navigate('clients')" title="Clientes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Clientes
                    </button>
                </div>
            </div>

            <!-- ── KPI CARDS ─────────────────────────────────────────────── -->
            <div class="dashboard-kpi-grid" style="margin-bottom: 28px;">

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
                        <div style="margin-top:6px;">${trendBadge(ventasMes, prevVentas)}</div>
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

            </div>

            <!-- ── MAIN CONTENT AREA ──────────────────────────────────────── -->
            <div class="form-grid" style="grid-template-columns: 2fr 1fr; gap: 24px; align-items: start;">

                <!-- CHART con filtro de período -->
                <div class="glass-card animate-stagger" style="animation-delay: 0.3s;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
                        <h3 style="margin:0; font-family:var(--font-heading); font-size:1rem;">EVOLUCIÓN MENSUAL (VENTAS VS COMPRAS)</h3>
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

                <!-- PANEL DERECHO -->
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
                                    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:10px; background:${item.urgente ? 'rgba(239,68,68,0.08)' : 'rgba(var(--primary-rgb),0.05)'}; border-left:3px solid ${item.urgente ? 'var(--danger)' : 'var(--primary)'};">
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

            <!-- ── ACTIVIDAD RECIENTE ──────────────────────────────────── -->
            <div class="glass-card animate-stagger" style="margin-top:24px; animation-delay:0.45s;">
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

    renderDashboardBanner() {
        const clients   = Store.get('clientes') || [];
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
        return this._banner('info', '✅',
            `Todo al día en <strong>${mNames[currentMonth]} ${currentYear}</strong>. Sin alertas pendientes.`, null);
    },

    _banner(type, emoji, message, navTarget) {
        const s = {
            danger:  { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.3)',  accent: '#ef4444' },
            warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', accent: '#f59e0b' },
            success: { bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.3)',  accent: '#22c55e' },
            info:    { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)', accent: '#3b82f6' },
        }[type] || {};
        const actionBtn = navTarget
            ? `<button class="btn btn-secondary" onclick="App.navigate('${navTarget}')" style="font-size:0.74rem; padding:4px 12px; flex-shrink:0; white-space:nowrap;">Ver &rarr;</button>`
            : '';
        return `<div class="dashboard-banner" style="background:${s.bg}; border:1px solid ${s.border}; border-left:4px solid ${s.accent}; border-radius:12px; padding:13px 18px; margin-bottom:20px; display:flex; align-items:center; gap:12px;">
            <span style="font-size:1.15rem; flex-shrink:0;">${emoji}</span>
            <p style="margin:0; flex:1; font-size:0.87rem; line-height:1.55; color:var(--text-primary);">${message}</p>
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
        const clients = Store.get('clientes') || [];
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
        const ventas  = all.filter(r => r.tipo === 'venta' && !r.anulada);
        const compras = all.filter(r => r.tipo === 'compra');
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
                    <div class="stat-num" style="font-size:1.6rem; color:${balance>=0?'var(--primary)':'var(--danger)'}">${fmt(balance)}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">${balance>=0?'A favor':'A pagar'}</div>
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

                    <div class="sri-stats-grid animate-slideInUp">
                        <div class="stat-card glass-card">
                            <div class="stat-icon sales">${Icons.trendingUp(24)}</div>
                            <div class="stat-info">
                                <span class="stat-label">Ventas Globales</span>
                                <span class="stat-value">${App.formatMoney(monthMeta.sales)}</span>
                            </div>
                        </div>
                        <div class="stat-card glass-card">
                            <div class="stat-icon purchases">${Icons.trendingDown(24)}</div>
                            <div class="stat-info">
                                <span class="stat-label">Compras Globales</span>
                                <span class="stat-value">${App.formatMoney(monthMeta.purchases)}</span>
                            </div>
                        </div>
                        <div class="stat-card glass-card">
                            <div class="stat-icon balance">${Icons.wallet(24)}</div>
                            <div class="stat-info">
                                <span class="stat-label">Balance Neto</span>
                                <span class="stat-value" style="color: ${balance >= 0 ? 'var(--success)' : 'var(--danger)'}">${App.formatMoney(balance)}</span>
                            </div>
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
                <button type="button" class="btn btn-secondary" onclick="App.resetSRIForm('compras')" style="font-size:0.75rem;padding:5px 12px;">Limpiar</button>
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
                <div class="table-container animate-fadeIn">
                    <table>
                        <thead><tr>
                            <th>N° Factura</th><th>Cliente</th><th>RUC/Cédula</th><th>Fecha</th>
                            <th style="text-align:right;">Subt 15%</th><th style="text-align:right;">Subt 0%</th>
                            <th style="text-align:right;">IVA</th><th style="text-align:right;">Total</th>
                            <th>Estado</th>${adminVentasCols}
                        </tr></thead>
                        <tbody id="sri-ventas-body"></tbody>
                        <tfoot id="sri-ventas-foot"></tfoot>
                    </table>
                </div>
            </div>

            <div id="sri-panel-compras" class="sri-panel" style="display:${State.sriActiveTab==='compras'?'block':'none'};">
                ${compraForm}
                <div class="table-container animate-fadeIn">
                    <table>
                        <thead><tr>
                            <th>N° Factura</th><th>Proveedor</th><th>RUC</th><th>Fecha</th>
                            <th style="text-align:right;">Subt 15%</th><th style="text-align:right;">Subt 0%</th>
                            <th style="text-align:right;">Subt 5%</th><th style="text-align:right;">IVA</th>
                            <th style="text-align:right;">Total</th>${adminComprasCols}
                        </tr></thead>
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
                        <div class="form-grid" style="grid-template-columns:repeat(3, 1fr); gap:24px;">
                            <div class="form-group"><label>Fecha *</label><input type="date" id="cobrar-fecha" required></div>
                            
                            <div class="form-group" style="position:relative;">
                                <label>Cliente / Deudor *</label>
                                <input type="text" id="cobrar-cliente" placeholder="Nombre del cliente" required autocomplete="off" oninput="App.showClientSuggestions('cobrar', this.value)">
                                <input type="hidden" id="cobrar-cliente-id">
                                <ul id="cobrar-client-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; right:0; max-height:200px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 100;"></ul>
                            </div>
                            
                            <div class="form-group"><label>Concepto</label><input type="text" id="cobrar-concepto" placeholder="Ej. Factura 001, Servicios"></div>
                            
                            <div style="grid-column: span 3; display: flex; gap: 24px; align-items: flex-start; flex-wrap: nowrap;">
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
                        <div class="form-grid" style="grid-template-columns:repeat(3, 1fr); gap:24px;">
                            <div class="form-group"><label>Fecha *</label><input type="date" id="pagar-fecha" required></div>
                            
                            <div class="form-group" style="position:relative;">
                                <label>Proveedor / Acreedor *</label>
                                <input type="text" id="pagar-proveedor" placeholder="Nombre del proveedor" required autocomplete="off" oninput="App.showClientSuggestions('pagar', this.value)">
                                <input type="hidden" id="pagar-proveedor-id">
                                <ul id="pagar-client-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; width:max-content; max-height:200px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 100;"></ul>
                            </div>
                            
                            <div class="form-group"><label>Concepto</label><input type="text" id="pagar-concepto" placeholder="Ej. Compra de insumos, Alquiler"></div>
                            
                            <div style="grid-column: span 3; display: flex; gap: 24px; align-items: flex-start; flex-wrap: nowrap;">
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
            <div id="abono-modal" class="modal-overlay ${State.showAbonoModal ? 'active' : ''}">
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

                    <!-- Leyenda de Estados -->
                    <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.8rem; background: rgba(255,255,255,0.03); padding: 10px 16px; border-radius: var(--radius-md); align-items: center; border: 1px solid rgba(255,255,255,0.05); min-height: 42px; box-sizing: border-box;">
                        <span style="color: var(--text-secondary); font-weight: 600; margin-right: 4px;">Estados (Firma/Fact.):</span>
                        <span style="display: flex; align-items: center; gap: 6px;" title="Más de 30 días restantes">
                            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--success);box-shadow:0 0 6px var(--success);"></span> Vigente
                        </span>
                        <span style="display: flex; align-items: center; gap: 6px;" title="30 días o menos restantes">
                            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--warning);box-shadow:0 0 6px var(--warning);"></span> Por Vencer
                        </span>
                        <span style="display: flex; align-items: center; gap: 6px;" title="La fecha ya pasó">
                            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--danger);box-shadow:0 0 6px var(--danger);"></span> Vencido
                        </span>
                        <span style="display: flex; align-items: center; gap: 6px;" title="No hay fecha registrada">
                            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:rgba(150,150,150,0.4);"></span> Sin Datos
                        </span>
                    </div>
                </div>

                ${State.showClientForm ? this.clientForm() : ''}

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>RUC</th>
                                <th>Régimen</th>
                                <th>Forma</th>
                                <th>Día Pago</th>
                                <th style="text-align:center;">Firma</th>
                                <th style="text-align:center;">Fact.</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clients-table-body">
                            <!-- Rendered by App -->
                        </tbody>
                    </table>
                </div>
                <div id="clients-search-count" style="margin-top: 10px; font-size: 0.78rem; color: var(--text-secondary); text-align: right;"></div>
            </div>
        `;
    },

    clientForm() {
        const conf = Store.get('configuraciones');
        const editingClient = State.clientEditingId ? Store.get('clientes').find(c => c.id === State.clientEditingId) : null;
        
        const name      = editingClient ? editingClient.name : '';
        const ruc       = editingClient ? editingClient.ruc : '';
        const regime    = editingClient ? editingClient.regime : '';
        const frecuencia = editingClient && editingClient.frecuencia ? editingClient.frecuencia : 'Mensual';
        const claveSRI  = editingClient && editingClient.claveSRI ? editingClient.claveSRI : '';

        // Obligaciones tributarias (Sí/No)
        const oblSuperCia = editingClient ? (editingClient.oblSuperCia || 'No') : 'No';
        const oblIVA      = editingClient ? (editingClient.oblIVA      || 'No') : 'No';
        const oblRenta    = editingClient ? (editingClient.oblRenta    || 'No') : 'No';
        const oblATS      = editingClient ? (editingClient.oblATS      || 'No') : 'No';
        const oblADI      = editingClient ? (editingClient.oblADI      || 'No') : 'No';
        const oblGP       = editingClient ? (editingClient.oblGP       || 'No') : 'No';
        const oblRebefics = editingClient ? (editingClient.oblRebefics || 'No') : 'No';

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
                            <label>Clave SRI</label>
                            <div style="position: relative;">
                                <input type="password" id="client-clave-sri" value="${App.escapeHTML(claveSRI)}" style="padding-right: 88px;">
                                <div style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); display: flex; gap: 4px;">
                                    <button type="button" class="btn-icon" style="width:34px;height:34px;opacity:0.6;display:flex;align-items:center;justify-content:center;" onclick="App.copyToClipboard('client-clave-sri')" title="Copiar contraseña">${Icons.copy(16)}</button>
                                    <button type="button" class="btn-icon" style="width:34px;height:34px;opacity:0.6;display:flex;align-items:center;justify-content:center;" onclick="App.togglePasswordVis('client-clave-sri')" title="Mostrar/Ocultar">${Icons.eye(16)}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Obligaciones Tributarias -->
                    <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--border-color);">
                        <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; color: var(--text-secondary); margin-bottom: 14px;">OBLIGACIONES TRIBUTARIAS</div>
                        <div class="form-grid">
                            <div class="form-group"><label>SUPER CIA</label>${siNo('client-super-cia', oblSuperCia)}</div>
                            <div class="form-group"><label>IVA</label>${siNo('client-iva', oblIVA)}</div>
                            <div class="form-group"><label>RENTA</label>${siNo('client-renta', oblRenta)}</div>
                            <div class="form-group"><label>ATS</label>${siNo('client-ats', oblATS)}</div>
                            <div class="form-group"><label>ADI</label>${siNo('client-adi', oblADI)}</div>
                            <div class="form-group"><label>GP</label>${siNo('client-gp', oblGP)}</div>
                            <div class="form-group"><label>REBEFICS</label>${siNo('client-rebefics', oblRebefics)}</div>
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
                    <div class="form-group"><label>Clave SRI</label><div style="position:relative;"><input type="password" id="fich-clave-sri" value="${App.escapeHTML(c.claveSRI||'')}" style="padding-right:78px;"><div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;gap:3px;"><button type="button" class="pw-action-btn" onclick="App.copyToClipboard('fich-clave-sri')">${Icons.copy(14)}</button><button type="button" class="pw-action-btn" onclick="App.togglePasswordVis('fich-clave-sri')">${Icons.eye(14)}</button></div></div></div>
                </div>
                <div style="border-top:1px solid var(--border-color);margin:14px 0 10px;padding-top:12px;font-size:0.72rem;font-weight:700;letter-spacing:1px;color:var(--text-secondary);">OBLIGACIONES TRIBUTARIAS</div>
                <div class="form-grid" style="grid-template-columns: repeat(auto-fill, minmax(120px,1fr));">
                    <div class="form-group"><label>SUPER CIA</label>${siNo('fich-super-cia', c.oblSuperCia||'No')}</div>
                    <div class="form-group"><label>IVA</label>${siNo('fich-iva', c.oblIVA||'No')}</div>
                    <div class="form-group"><label>RENTA</label>${siNo('fich-renta', c.oblRenta||'No')}</div>
                    <div class="form-group"><label>ATS</label>${siNo('fich-ats', c.oblATS||'No')}</div>
                    <div class="form-group"><label>ADI</label>${siNo('fich-adi', c.oblADI||'No')}</div>
                    <div class="form-group"><label>GP</label>${siNo('fich-gp', c.oblGP||'No')}</div>
                    <div class="form-group"><label>REBEFICS</label>${siNo('fich-rebefics', c.oblRebefics||'No')}</div>
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
                    <div class="form-group"><label>Usuario / Token</label><input type="text" id="firma-usuario" value="${App.escapeHTML(firmaUsuario)}"></div>
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
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">USUARIO / TOKEN</div><div style="font-weight:600;">${App.escapeHTML(firmaUsuario||'—')}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CLAVE</div><div style="font-weight:600;">${pwDisplay('firma-clave', firmaClave)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">EMISIÓN</div><div style="font-weight:600;">${formatDate(firmaEmision)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">CADUCIDAD</div><div style="font-weight:600;display:flex;align-items:center;gap:6px;">${formatDate(firmaCaduca)} ${statusDot(firmaCaduca)}</div></div>
                <div style="min-width:140px;"><div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:4px;">VIGENCIA</div><div style="font-weight:600;">${firmaTiempo ? firmaTiempo + ' año(s)' : '—'}</div></div>
            </div>` : '';

        const sectionCard = (icon, title, accent, sectionKey, displayHTML, formHTML, alwaysVisible=false) => {
            const active = isEditing === sectionKey;
            return `
            <div class="glass-card animate-fadeIn" style="border-left: 3px solid ${accent}; margin-bottom: 16px; padding: 20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="font-size:1.3rem;">${icon}</span>
                        <span style="font-weight:700;font-size:0.95rem;color:${accent};">${title}</span>
                    </div>
                    ${isAdmin && !active ? `<button class="btn btn-secondary" style="padding:4px 14px;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;" onclick="App.setFichaSection('${sectionKey}')">${Icons.edit(14)} Editar</button>` : ''}
                </div>
                ${displayHTML}
                ${formHTML}
            </div>`;
        };

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
        const clients = Store.get('clientes') || [];
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
                        <div class="audit-meta">
                            <span class="audit-id-badge">LOG: ${logId}</span>
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
    }
};

if (typeof window !== 'undefined') {
    window.Views = Views;
}
