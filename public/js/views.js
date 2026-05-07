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
        return `
            <div class="dashboard-layout">
                <aside class="sidebar">
                    <div class="sidebar-brand">
                        <img src="logo.png" alt="Logo" class="logo-glow" style="height: 60px; margin-bottom: 16px;">
                        <div>JF <span>SYSTEM</span></div>
                    </div>
                    <nav class="sidebar-nav">
                        <a href="#" class="nav-item ${State.currentRoute === 'dashboard' ? 'active' : ''}" onclick="App.navigate('dashboard', true); return false;">${Icons.navDashboard()} Dashboard</a>
                        <a href="#" class="nav-item ${State.currentRoute === 'clients' ? 'active' : ''}" onclick="App.navigate('clients', true); return false;">${Icons.navClients()} Clientes</a>
                        <a href="#" class="nav-item ${State.currentRoute === 'sri' ? 'active' : ''}" onclick="App.navigate('sri', true); return false;">${Icons.navSRI()} Compra y Venta</a>
                        <a href="#" class="nav-item ${State.currentRoute === 'cuentas' ? 'active' : ''}" onclick="App.navigate('cuentas', true); return false;">${Icons.navCuentas()} Gestión de Cuentas</a>
                        <a href="#" class="nav-item ${State.currentRoute === 'matriz' ? 'active' : ''}" onclick="App.navigate('matriz', true); return false;">${Icons.navMatriz()} Matriz de Control</a>
                        <a href="#" class="nav-item ${State.currentRoute === 'bancos' ? 'active' : ''}" onclick="App.navigate('bancos', true); return false;">${Icons.navBancos()} Bancos</a>
                        <a href="#" class="nav-item ${State.currentRoute === 'reports' ? 'active' : ''}" onclick="App.navigate('reports', true); return false;">${Icons.navReports()} Reportes</a>
                    </nav>
                    <div class="sidebar-footer">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                            <div style="
                                width: 42px; height: 42px; border-radius: 50%;
                                background: linear-gradient(135deg, #7e22ce, #c026d3);
                                display: flex; align-items: center; justify-content: center;
                                color: white; font-weight: 700; overflow: hidden;
                                border: 2px solid rgba(255,255,255,0.6);
                                box-shadow:
                                    0 0 0 3px #c026d3,
                                    0 0 10px #c026d3,
                                    0 0 22px rgba(192, 38, 211, 0.8),
                                    0 0 45px rgba(192, 38, 211, 0.45),
                                    0 0 70px rgba(192, 38, 211, 0.2);
                                flex-shrink: 0;
                            ">
                                ${user.photoURL ? 
                                    `<img src="${user.photoURL}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">` : 
                                    (user.username || user.email).charAt(0).toUpperCase()
                                }
                            </div>
                            <div>
                                <div style="font-weight: 600; color: white;">${user.username || user.email.split('@')[0]}</div>
                                <div style="font-size: 0.7rem; opacity: 0.6; text-transform: uppercase;">${user.role}</div>
                            </div>
                        </div>
                        <button class="btn btn-logout" onclick="App.handleLogout()" style="width: 100%; justify-content: center; gap:8px;">
                            ${Icons.logout()} Cerrar Sesión
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
            <div id="toast-container"></div>
        `;
    },

    detalleModal() {
        return `
            <!-- DETALLE MODAL -->
            <div id="detalle-modal" class="modal-overlay ${State.showDetalleModal ? 'active' : ''}">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 700px; padding: 0; overflow: hidden;">
                    <div id="detalle-modal-content">
                        <!-- Rendered by App -->
                    </div>
                </div>
            </div>
        `;
    },

    getBankInfo(nombre) {
        const n = nombre.toLowerCase();
        if (n.includes('pichincha')) return { icon: Icons.bankPichincha(24), themeClass: 'bank-theme-pichincha' };
        if (n.includes('guayaquil')) return { icon: Icons.bankGuayaquil(24), themeClass: 'bank-theme-guayaquil' };
        if (n.includes('jep')) return { icon: Icons.bankJEP(24), themeClass: 'bank-theme-jep' };
        if (n.includes('jardín azuayo') || n.includes('jardin azuayo')) return { icon: Icons.bankJardinAzuayo(24), themeClass: 'bank-theme-jardin' };
        if (n.includes('produbanco')) return { icon: Icons.bankProdubanco(24), themeClass: 'bank-theme-produbanco' };
        if (n.includes('pacifico')) return { icon: Icons.bankPacifico(24), themeClass: 'bank-theme-pacifico' };
        return { icon: Icons.bank(24), themeClass: 'bank-theme-generic' };
    },

    bancoModal() {
        return `
            <div id="banco-modal" class="modal-overlay ${State.showBancoModal ? 'active' : ''}">
                <div class="modal-content glass-card animate-fadeInUp" style="max-width: 450px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                        <h3 style="margin: 0; display:flex; align-items:center; gap:8px;">${Icons.bank()} Nuevo Banco</h3>
                        <button class="icon-btn" onclick="App.closeBancoModal()">${Icons.close()}</button>
                    </div>
                    <form onsubmit="App.handleBancoSubmit(event)">
                        <div class="form-group">
                            <label>Nombre de la Cuenta / Banco</label>
                            <input type="text" id="banco-nombre" required placeholder="Ej. Banco Pichincha, Caja Chica...">
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

    bancos() {
        let cardsHtml = '';
        if (State.bancosData && State.bancosData.length > 0) {
            cardsHtml = State.bancosData.map(banco => {
                const bankInfo = Views.getBankInfo(banco.nombre);
                return `
                <div class="glass-card bank-card ${bankInfo.themeClass}" style="cursor: pointer;" onclick="App.openBancoDetail('${banco.id}')">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                        <h4 style="margin:0; font-size: 1.2rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); color: var(--text-primary);">${banco.nombre}</h4>
                        <div class="bank-logo-container">
                            ${bankInfo.icon}
                        </div>
                    </div>
                    <div class="bank-balance" style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 8px;">
                        $${banco.saldo_actual.toFixed(2)}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); display:flex; justify-content:space-between; align-items:center; padding-top: 16px; border-top: 1px solid var(--glass-border);">
                        <span style="font-weight: 500;">Ver conciliación y transacciones</span>
                        <div class="arrow-btn">${Icons.arrowRight()}</div>
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
            <div class="bancos-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.5rem;">Control de Bancos</h3>
                    <p style="color: var(--text-secondary); margin: 4px 0 0 0; font-size: 0.9rem;">Libro auxiliar y conciliación bancaria global</p>
                </div>
                <button class="btn btn-primary" onclick="App.showAddBancoModal()" style="display:flex;align-items:center;gap:8px;">
                    ${Icons.plus()} Nuevo Banco
                </button>
            </div>
            
            <div id="bancos-resumen-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px;">
                ${cardsHtml}
            </div>

            <div id="bancos-detalle-view" style="display: none; animation: fadeIn 0.3s ease;">
                <!-- Detalle de transacciones y conciliación -->
            </div>
        `;
    },

    reports() {
        return `
            <div class="glass-card">
                <h3 style="margin-bottom: 24px;">Reportes Globales y Consolidación</h3>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">Exporte la información consolidada de todos sus clientes y sus respectivos registros contables.</p>
                
                <div class="form-grid" style="max-width: 600px; margin-bottom: 32px;">
                    <div class="form-group">
                        <label>Desde</label>
                        <input type="date" id="report-start">
                    </div>
                    <div class="form-group">
                        <label>Hasta</label>
                        <input type="date" id="report-end">
                    </div>
                </div>

                <div style="display: flex; gap: 16px;">
                    <button class="btn btn-primary" onclick="App.exportMasterExcel()" style="display:inline-flex;align-items:center;gap:8px;">
                        ${Icons.export()} Exportar Reporte Maestro (Excel)
                    </button>
                </div>
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
            'reports': 'CONCILIACIÓN Y REPORTES',
            'matriz': 'MATRIZ DE CONTROL TRIBUTARIO',
            'bancos': 'CONTROL DE BANCOS'
        };
        return titles[State.currentRoute] || 'JF SYSTEM';
    },

    dashboard() {
        const meta = Store.get('dashboardMeta') || { totalRegistros: 0, mensual: {}, clientes: {} };
        const clients = Store.get('clientes') || [];
        
        const today = new Date();
        const currentDay = today.getDate();
        
        // Alertas de firmas por vencer
        const expiringCount = clients.filter(c => {
            if (!c.firmaExpira) return false;
            const parts = c.firmaExpira.split('-');
            if (parts.length !== 3) return false;
            const exp = new Date(parts[0], parts[1] - 1, parts[2]);
            return (exp - today) / (1000 * 60 * 60 * 24) <= 30;
        }).length;

        // Alertas de vencimientos de declaración (<= 5 días o ya vencido)
        const pendingDeadlinesCount = clients.filter(c => {
            const diaMax = parseInt(c.diaMaximo) || 0;
            if (diaMax > 0) {
                const diff = diaMax - currentDay;
                return diff <= 5;
            }
            return false;
        }).length;

        return `
            <div class="form-grid" style="margin-bottom: 32px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">

                <!-- Card 1: Total Registros — Glass + Purple stripe -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.1s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #7e22ce, #c026d3);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(147,51,234,0.12);">${Icons.navDashboard()}</div>
                            <span class="stat-label">TOTAL REGISTROS</span>
                        </div>
                        <div class="stat-num" style="background: linear-gradient(135deg, #9333ea, #c026d3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${meta.totalRegistros}</div>
                        <div style="font-size: 0.8rem; color: var(--success); font-weight: 500; margin-top: 6px;">Actualizado en tiempo real</div>
                    </div>
                </div>

                <!-- Card 2: Firmas por Vencer — Glass + Red/Orange stripe -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.2s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #ef4444, #f97316);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(239,68,68,0.1);">${Icons.navMatriz()}</div>
                            <span class="stat-label">FIRMAS POR VENCER</span>
                        </div>
                        <div class="stat-num" style="color: ${expiringCount > 0 ? 'var(--danger)' : 'var(--text-primary)'};">${expiringCount}</div>
                        <button class="btn btn-secondary" onclick="App.navigate('matriz')" style="font-size: 0.75rem; padding: 6px 12px; width: 100%; margin-top: 10px;">Revisar Matriz</button>
                    </div>
                </div>

                <!-- Card 3: Obligaciones Pendientes — Glass + Orange/Red stripe -->
                <div class="stat-card animate-stagger" style="animation-delay: 0.3s;">
                    <div class="stat-bar" style="background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(245,158,11,0.1);">${Icons.navSRI()}</div>
                            <span class="stat-label">OBLIGACIONES PENDIENTES</span>
                        </div>
                        <div class="stat-num" style="color: ${pendingDeadlinesCount > 0 ? 'var(--warning)' : 'var(--text-primary)'};">${pendingDeadlinesCount}</div>
                        <div style="font-size: 0.8rem; color: var(--warning); font-weight: 500; margin-top: 6px;">Vencen pronto o excedidas</div>
                    </div>
                </div>

                <!-- Card 4: Clientes Activos — HERO Gradient Fill -->
                <div class="stat-card stat-card-hero animate-stagger" style="animation-delay: 0.4s;">
                    <div class="stat-body">
                        <div class="stat-head">
                            <div class="stat-icon" style="background: rgba(255,255,255,0.18); filter: brightness(0) invert(1);">${Icons.navClients()}</div>
                            <span class="stat-label" style="color: rgba(255,255,255,0.72);">CLIENTES ACTIVOS</span>
                        </div>
                        <div class="stat-num" style="color: white; text-shadow: 0 0 20px rgba(255,255,255,0.3);">${clients.length}</div>
                        <button class="btn" onclick="App.navigate('clients')" style="background: rgba(255,255,255,0.16); color: white; border: 1.5px solid rgba(255,255,255,0.42); width: 100%; margin-top: 10px; font-size: 0.75rem; padding: 6px 12px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">Gestionar</button>
                    </div>
                </div>

            </div>

            <div class="form-grid" style="grid-template-columns: 2fr 1fr; gap: 24px;">
                <div class="glass-card animate-stagger" style="animation-delay: 0.4s;">
                    <h3 style="margin-bottom: 20px; font-family: var(--font-heading); font-size: 1rem;">EVOLUCIÓN MENSUAL (VENTAS VS COMPRAS)</h3>
                    <div style="height: 300px; position: relative;">
                        <canvas id="dashboardChart"></canvas>
                    </div>
                </div>
                <div class="glass-card animate-stagger" style="animation-delay: 0.5s;">
                    <h3 style="margin-bottom: 20px; font-family: var(--font-heading); font-size: 1rem;">LÍMITES RIMPE</h3>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        ${this.renderLimitAlerts()}
                    </div>
                </div>
            </div>
        `;
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
                        $${sales.toLocaleString()} / $${limit.toLocaleString()}
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
        const fmt = n => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        const clients = Store.get('clientes') || [];
        const selectedClient = clients.find(c => c.id === State.currentClientId);
        const isAdmin = Store.getUserRole() === 'admin';

        if (!State.currentClientId) {
            return `
                <div class="glass-card" style="text-align: center; padding: 60px;">
                    <div style="margin-bottom: 20px;">${Icons.sriPlaceholder()}</div>
                    <h2>Seleccione un cliente</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 30px;">Para registrar compras y ventas, primero elija un cliente de su cartera.</p>
                    <div style="max-width: 400px; margin: 0 auto;">
                        <select onchange="App.selectClient(this.value)">
                            <option value="">-- Seleccionar Cliente --</option>
                            ${clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
            `;
        }

        const MESES = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const now = new Date();
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
                <div class="form-group"><label>IVA (calculado)</label><input type="number" id="venta-iva" readonly style="background:rgba(var(--success-rgb,34,197,94),0.06);font-weight:700;color:var(--success);"></div>
                <div class="form-group"><label>Total (calculado)</label><input type="number" id="venta-total" readonly style="background:rgba(var(--primary-rgb),0.06);font-weight:800;color:var(--primary);"></div>
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
                <div class="form-group"><label>IVA (calculado)</label><input type="number" id="compra-iva" readonly style="background:rgba(239,68,68,0.06);font-weight:700;color:var(--danger);"></div>
                <div class="form-group"><label>Total (calculado)</label><input type="number" id="compra-total" readonly style="background:rgba(239,68,68,0.04);font-weight:800;color:var(--danger);"></div>
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
                <button class="btn btn-premium" onclick="App.openReportModal()" style="display:flex; align-items:center; gap:8px;">
                    ${Icons.report(18)} Reportes Premium
                </button>
            </div>

            <div class="sri-tabs" style="margin-bottom: 24px;">
                <button id="tab-cuentas-cobrar" class="sri-tab cuentas-tab ${State.cuentasActiveTab==='cobrar'?'sri-tab-active':''}" onclick="App.switchCuentasTab('cobrar')">${Icons.navClients()} Cuentas por Cobrar</button>
                <button id="tab-cuentas-pagar" class="sri-tab cuentas-tab ${State.cuentasActiveTab==='pagar'?'sri-tab-active':''}" onclick="App.switchCuentasTab('pagar')">${Icons.navMatriz()} Cuentas por Pagar</button>
            </div>

            <!-- CUENTAS POR COBRAR -->
            <div id="cuentas-panel-cobrar" class="sri-panel animate-fadeIn" style="display:${State.cuentasActiveTab==='cobrar'?'block':'none'};">
                <div class="glass-card" style="margin-bottom:20px;">
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
                        <div class="form-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:32px;">
                            <div class="form-group"><label>Fecha *</label><input type="date" id="cobrar-fecha" required></div>
                            
                            <div class="form-group" style="display:flex; flex-direction:column; align-items:center;">
                                <label style="text-align:center;">Método de Pago</label>
                                <div style="display:flex;gap:12px;margin-top:8px; width:100%; justify-content:center;">
                                    <label class="custom-method-select" style="max-width:130px;">
                                        <input type="checkbox" name="cobrar-metodo" value="Efectivo" checked onclick="App.handleMethodCheck('cobrar', 'Efectivo')">
                                        <span class="method-box">
                                            ${Icons.cash(18)}
                                            <span>Efect.</span>
                                        </span>
                                    </label>
                                    <label class="custom-method-select" style="max-width:130px;">
                                        <input type="checkbox" name="cobrar-metodo" value="Transferencia" onclick="App.handleMethodCheck('cobrar', 'Transferencia')">
                                        <span class="method-box">
                                            ${Icons.transfer(18)}
                                            <span>Transf.</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group" id="cobrar-banco-container" style="display:none; position:relative;">
                                <label>Banco (Búsqueda) *</label>
                                <div style="position:relative;">
                                    <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--primary);">${Icons.bank(14)}</span>
                                    <input type="text" id="cobrar-banco-search" style="padding-left:35px;" placeholder="Buscar banco..." autocomplete="off" oninput="App.filterBanks('cobrar', this.value)" onfocus="App.filterBanks('cobrar', this.value)">
                                </div>
                                <ul id="cobrar-banco-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; top:100%; left:0; right:0; max-height:150px; overflow-y:auto; list-style:none; padding:4px 0; margin:4px 0 0 0; z-index: 10;"></ul>
                                <input type="hidden" id="cobrar-banco-selected">
                            </div>

                            <div class="form-group"><label>Cliente / Deudor *</label><input type="text" id="cobrar-cliente" placeholder="Nombre del cliente" required></div>
                            <div class="form-group"><label>Concepto</label><input type="text" id="cobrar-concepto" placeholder="Ej. Factura 001, Servicios"></div>
                            <div class="form-group"><label>Abono Inicial</label><input type="number" step="0.01" min="0" id="cobrar-abono" placeholder="0.00" oninput="App.calculateCuentasCobrar()" ${State.editingCuentasCobrarId ? 'disabled' : ''}></div>
                            <div class="form-group"><label>Deuda Pendiente</label><input type="number" id="cobrar-pendiente" readonly style="background:rgba(var(--primary-rgb),0.06);font-weight:800;color:var(--primary);"></div>
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
                        </div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:40px;"><input type="checkbox" onchange="App.toggleAllCuentas('cobrar', this.checked)"></th>
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
                <div class="glass-card" style="margin-bottom:20px;">
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
                        <div class="form-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:32px;">
                            <div class="form-group"><label>Fecha *</label><input type="date" id="pagar-fecha" required></div>
                            
                            <div class="form-group"><label>Proveedor / Acreedor *</label><input type="text" id="pagar-proveedor" placeholder="Nombre del proveedor" required></div>
                            <div class="form-group"><label>Concepto</label><input type="text" id="pagar-concepto" placeholder="Ej. Compra de insumos, Alquiler"></div>
                            <div class="form-group"><label>Abono Inicial</label><input type="number" step="0.01" min="0" id="pagar-abono" placeholder="0.00" oninput="App.calculateCuentasPagar()" ${State.editingCuentasPagarId ? 'disabled' : ''}></div>
                            <div class="form-group"><label>Deuda Pendiente</label><input type="number" id="pagar-pendiente" readonly style="background:rgba(var(--danger-rgb),0.06);font-weight:800;color:var(--danger);"></div>
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
                        </div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:40px;"><input type="checkbox" onchange="App.toggleAllCuentas('pagar', this.checked)"></th>
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

                <!-- Buscador Premium -->
                <div style="position: relative; margin-bottom: 20px; max-width: 420px;">
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

    reportModal() {
        return `
            <div id="report-modal-overlay" class="confirm-overlay animate-fadeIn" style="z-index: 1100;">
                <div class="confirm-card glass-card animate-scaleUp" style="max-width: 600px; width: 95%;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="background:var(--premium-gradient); padding:10px; border-radius:12px; color:white;">
                                ${Icons.report(24)}
                            </div>
                            <div>
                                <h3 style="margin:0; font-size:1.25rem;">Centro de Reportes Premium</h3>
                                <p style="margin:0; font-size:0.8rem; color:var(--text-secondary);">Genera reportes financieros personalizados por cliente.</p>
                            </div>
                        </div>
                        <button class="icon-btn" onclick="App.closeReportModal()">${Icons.close()}</button>
                    </div>

                    <div style="display:grid; gap:20px;">
                        <!-- SELECCIÓN DE CLIENTE -->
                        <div class="form-group" style="position:relative;">
                            <label>Seleccionar Cliente *</label>
                            <div style="position:relative;">
                                <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--primary);">${Icons.navClients(14)}</span>
                                <input type="text" id="report-client-search" style="padding-left:35px;" placeholder="Buscar por nombre o RUC..." autocomplete="off" oninput="App.filterReportClients(this.value)">
                            </div>
                            <ul id="report-client-list" class="bank-list-dropdown glass-card" style="display:none; position:absolute; left:0; right:0; max-height:200px; overflow-y:auto; z-index:100; margin-top:4px;"></ul>
                            <input type="hidden" id="report-client-selected">
                            <div id="report-selected-badge" style="display:none; margin-top:8px; padding:8px 12px; background:rgba(var(--primary-rgb),0.1); border-radius:8px; border:1px solid rgba(var(--primary-rgb),0.2); align-items:center; justify-content:space-between;">
                                <span id="report-selected-name" style="font-weight:600; font-size:0.9rem; color:var(--primary);"></span>
                                <button class="icon-btn" onclick="App.clearReportClient()" style="padding:4px;">${Icons.close()}</button>
                            </div>
                        </div>

                        <!-- RANGO DE FECHAS -->
                        <div class="form-group">
                            <label>Rango de Fecha</label>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <div style="position:relative;">
                                    <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--warning);">${Icons.calendar(14)}</span>
                                    <input type="date" id="report-date-start" style="padding-left:35px;">
                                </div>
                                <div style="position:relative;">
                                    <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--warning);">${Icons.calendar(14)}</span>
                                    <input type="date" id="report-date-end" style="padding-left:35px;">
                                </div>
                            </div>
                            <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
                                <button class="chip-btn" onclick="App.setReportRange('thisMonth')">Este Mes</button>
                                <button class="chip-btn" onclick="App.setReportRange('lastMonth')">Mes Pasado</button>
                                <button class="chip-btn" onclick="App.setReportRange('thisYear')">Este Año</button>
                                <button class="chip-btn" onclick="App.setReportRange('all')">Todo</button>
                            </div>
                        </div>

                        <!-- OPCIONES ADICIONALES -->
                        <div class="form-group">
                            <label>Personalización</label>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <label class="checkbox-container">
                                    <input type="checkbox" id="report-opt-charts" checked>
                                    <span class="checkmark"></span>
                                    Incluir Gráficos
                                </label>
                                <label class="checkbox-container">
                                    <input type="checkbox" id="report-opt-details" checked>
                                    <span class="checkmark"></span>
                                    Detalle de Movimientos
                                </label>
                                <label class="checkbox-container">
                                    <input type="checkbox" id="report-opt-bank">
                                    <span class="checkmark"></span>
                                    Datos Bancarios
                                </label>
                                <label class="checkbox-container">
                                    <input type="checkbox" id="report-opt-compact">
                                    <span class="checkmark"></span>
                                    Modo Compacto
                                </label>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top:32px; display:flex; gap:12px;">
                        <button class="btn btn-secondary" style="flex:1;" onclick="App.closeReportModal()">Cancelar</button>
                        <button class="btn btn-premium" id="btn-generate-report" style="flex:2; display:flex; align-items:center; justify-content:center; gap:10px;" onclick="App.generatePremiumReport()">
                            ${Icons.export()} Generar Reporte PDF
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

if (typeof window !== 'undefined') {
    window.Views = Views;
}
