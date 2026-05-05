/**
 * JF SYSTEM — Icon Library
 * Flat modern SaaS style, multicolor (purple/fuchsia, teal, blue, orange)
 * All icons return SVG strings for inline use.
 */
const Icons = {

    /* ── NAVIGATION ──────────────────────────────────────────────── */

    navDashboard: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0" aria-hidden="true"><rect x="2" y="14" width="4" height="8" rx="1.5" fill="#14b8a6"/><rect x="9" y="9" width="4" height="13" rx="1.5" fill="#8b5cf6"/><rect x="16" y="4" width="4" height="18" rx="1.5" fill="#f97316"/><path d="M2 14.5L9 9.5L13 11.5L22 4.5" stroke="#c026d3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    navClients: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0" aria-hidden="true"><circle cx="9" cy="7" r="4" fill="#8b5cf6" opacity="0.8"/><path d="M2 21v-1a7 7 0 0 1 14 0v1" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="18" cy="8" r="3" fill="#14b8a6" opacity="0.8"/><path d="M22 21v-1a5 5 0 0 0-8-4" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,

    navSRI: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0" aria-hidden="true"><rect x="2" y="10" width="20" height="12" rx="2" fill="#9333ea" opacity="0.2"/><rect x="2" y="10" width="20" height="12" rx="2" stroke="#9333ea" stroke-width="1.5"/><path d="M2 10L12 3L22 10" fill="#f97316" opacity="0.25"/><path d="M2 10L12 3L22 10" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="7" y="14" width="3" height="5" rx="1" fill="#9333ea"/><rect x="10.5" y="14" width="3" height="5" rx="1" fill="#9333ea"/><rect x="15" y="14" width="3" height="5" rx="1" fill="#9333ea"/></svg>`,

    navMatriz: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0" aria-hidden="true"><rect x="2" y="2" width="9" height="9" rx="2.5" fill="#8b5cf6"/><rect x="13" y="2" width="9" height="9" rx="2.5" fill="#14b8a6"/><rect x="2" y="13" width="9" height="9" rx="2.5" fill="#f97316"/><rect x="13" y="13" width="9" height="9" rx="2.5" fill="#3b82f6"/></svg>`,

    navReports: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0" aria-hidden="true"><path d="M3 19L7 13L12 16L20 7" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 19L7 13L12 16L20 7V19Z" fill="#f97316" opacity="0.1"/><circle cx="7" cy="13" r="2.5" fill="#8b5cf6"/><circle cx="12" cy="16" r="2.5" fill="#14b8a6"/><circle cx="20" cy="7" r="2.5" fill="#3b82f6"/></svg>`,

    /* ── HEADER ACTIONS ───────────────────────────────────────────── */

    settings: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#8b5cf6" opacity="0.3"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#8b5cf6" stroke-width="1.5" fill="none"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#c026d3" stroke-width="1.5" fill="none"/></svg>`,

    sun: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="#f97316"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#f97316" stroke-width="2" stroke-linecap="round"/></svg>`,

    moon: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#8b5cf6" opacity="0.35"/><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#8b5cf6" stroke-width="1.5" fill="none"/><circle cx="17" cy="7" r="1.5" fill="#c026d3" opacity="0.6"/></svg>`,

    /* ── UTILITY / INLINE ─────────────────────────────────────────── */

    search: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7" stroke="#14b8a6" stroke-width="2" fill="none"/><circle cx="10" cy="10" r="3" fill="#14b8a6" opacity="0.2"/><path d="M15.5 15.5L21 21" stroke="#14b8a6" stroke-width="2.5" stroke-linecap="round"/></svg>`,

    close: () => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

    edit: (size=15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" fill="#f97316" opacity="0.2" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 5L19 9" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    trash: (size=15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    copy: (size=15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" fill="#14b8a6" opacity="0.2" stroke="#14b8a6" stroke-width="1.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    eye: (size=15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#8b5cf6" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" fill="#8b5cf6"/><circle cx="12" cy="12" r="1.2" fill="white"/></svg>`,

    export: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="17" width="18" height="4" rx="1.5" fill="#14b8a6" opacity="0.3"/><path d="M12 3v12M7 11l5 5 5-5" stroke="#14b8a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    ficha: (size=15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" stroke-width="1.5"/><circle cx="8" cy="11" r="2.5" fill="#c026d3" opacity="0.8"/><path d="M13 9h5M13 13h5M6 17h12" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    logout: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/><path d="M16 17l5-5-5-5" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12H9" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    addPerson: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="7" r="4" fill="#8b5cf6" opacity="0.3" stroke="#8b5cf6" stroke-width="1.5"/><path d="M2 21c0-4 3.58-7 8-7" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M19 14v6M16 17h6" stroke="#14b8a6" stroke-width="2" stroke-linecap="round"/></svg>`,

    warn: () => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L2 22h20L12 2z" fill="currentColor" opacity="0.15"/><path d="M12 2L2 22h20L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M12 9v5M12 18v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,

    /* ── EMPTY STATES (larger) ─────────────────────────────────────── */

    emptyDocument: () => `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="2" width="12" height="18" rx="2" fill="#3b82f6" opacity="0.15"/><rect x="4" y="2" width="12" height="18" rx="2" stroke="#3b82f6" stroke-width="1.5" fill="none"/><path d="M14 2v5h5" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/><path d="M7 9h6M7 13h6M7 17h4" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    emptyClients: () => `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="9" width="18" height="13" rx="2" fill="#3b82f6" opacity="0.15"/><rect x="3" y="9" width="18" height="13" rx="2" stroke="#3b82f6" stroke-width="1.5" fill="none"/><path d="M3 9L12 3L21 9" fill="#f97316" opacity="0.2"/><path d="M3 9L12 3L21 9" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="8" y="13" width="3" height="5" rx="1" fill="#3b82f6"/><rect x="13" y="13" width="3" height="5" rx="1" fill="#3b82f6"/></svg>`,

    emptySearch: () => `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7" stroke="#14b8a6" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="4" fill="#14b8a6" opacity="0.15"/><path d="M15.5 15.5L21 21" stroke="#14b8a6" stroke-width="2.5" stroke-linecap="round"/><path d="M8 10h4M10 8v4" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/></svg>`,

    emptyUsers: () => `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="7" r="4" fill="#8b5cf6" opacity="0.3"/><circle cx="9" cy="7" r="4" stroke="#8b5cf6" stroke-width="1.5" fill="none"/><path d="M2 21v-1a7 7 0 0 1 14 0v1" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="18" cy="8" r="3" fill="#14b8a6" opacity="0.3"/><circle cx="18" cy="8" r="3" stroke="#14b8a6" stroke-width="1.5" fill="none"/></svg>`,

    emptyMatriz: () => `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="2" width="9" height="9" rx="2" fill="#8b5cf6" opacity="0.25"/><rect x="13" y="2" width="9" height="9" rx="2" fill="#14b8a6" opacity="0.25"/><rect x="2" y="13" width="9" height="9" rx="2" fill="#f97316" opacity="0.25"/><rect x="13" y="13" width="9" height="9" rx="2" fill="#3b82f6" opacity="0.25"/></svg>`,

    /* ── FICHA SECTION ICONS ──────────────────────────────────────── */

    sectionSRI: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="14" height="18" rx="2" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" stroke-width="1.5"/><path d="M7 8h8M7 12h8M7 16h5" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/><circle cx="19" cy="19" r="4.5" fill="#f97316"/><path d="M19 16.5v5M17 19h4" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>`,

    sectionFacturacion: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="2" width="15" height="19" rx="2" fill="#0d9488" opacity="0.15" stroke="#0d9488" stroke-width="1.5"/><path d="M7 7h8M7 11h8M7 15h5" stroke="#0d9488" stroke-width="1.5" stroke-linecap="round"/><path d="M14 18l3-3 3 3M17 15v5" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    sectionFirma: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 18c2-3.5 4.5-5.5 7-5.5s3.5 2 5 2 4-3 6-3" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/><rect x="3" y="3" width="18" height="7" rx="2" fill="#c026d3" opacity="0.12" stroke="#c026d3" stroke-width="1.5"/><path d="M8 6.5h8M12 4.5v4" stroke="#c026d3" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    /* ── SRI PLACEHOLDER ──────────────────────────────────────────── */

    sriPlaceholder: () => `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="9" r="5" fill="#8b5cf6" opacity="0.25"/><circle cx="12" cy="9" r="5" stroke="#8b5cf6" stroke-width="1.5" fill="none"/><path d="M4 22c0-5 3.58-8 8-8s8 3 8 8" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,

    sriClientAvatar: () => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="9" width="20" height="13" rx="2" fill="white" opacity="0.2"/><path d="M2 9L12 2L22 9" fill="white" opacity="0.15"/><path d="M2 9L12 2L22 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="7" y="13" width="3" height="5" rx="1" fill="white" opacity="0.8"/><rect x="14" y="13" width="3" height="5" rx="1" fill="white" opacity="0.8"/></svg>`,
    navCuentas: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2.5" fill="#14b8a6" opacity="0.15" stroke="#14b8a6" stroke-width="1.5"/><path d="M7 8h4M7 12h6M7 16h3" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round"/><path d="M17 7v6M14.5 10.5L17 8l2.5 2.5" stroke="#c026d3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 17v-6M14.5 13.5L17 16l2.5-2.5" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    plus: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,

    delete: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    bank: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 13v5" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    cash: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2" fill="#14b8a6" opacity="0.15" stroke="#14b8a6" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="#14b8a6" stroke-width="1.5"/><path d="M18 12h.01M6 12h.01" stroke="#14b8a6" stroke-width="2" stroke-linecap="round"/></svg>`,
    transfer: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 16l-4-4 4-4M17 8l4 4-4 4" stroke="#c026d3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12h18" stroke="#c026d3" stroke-width="2" stroke-linecap="round"/><path d="M14 12c0-2.21-1.79-4-4-4s-4 1.79-4 4" stroke="#c026d3" stroke-width="1.5" stroke-dasharray="2 2" fill="none"/></svg>`,
    info: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    report: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 21h10a2 2 0 0 0 2-2V7.828a2 2 0 0 0-.586-1.414l-4.828-4.828A2 2 0 0 0 12.172 1H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" stroke-width="1.5"/><path d="M12 1v5a2 2 0 0 0 2 2h5" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13h8M8 17h5" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    calendar: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" fill="#f97316" opacity="0.15" stroke="#f97316" stroke-width="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    pdf: (size=16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10M7 14h10M7 10h10" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/><rect x="4" y="2" width="16" height="20" rx="2" stroke="#ef4444" stroke-width="1.5" fill="none"/><rect x="4" y="2" width="16" height="5" rx="2" fill="#ef4444" opacity="0.2"/></svg>`,
};


if (typeof window !== 'undefined') { window.Icons = Icons; }
