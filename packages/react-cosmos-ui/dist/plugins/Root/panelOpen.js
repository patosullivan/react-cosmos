export const PANEL_OPEN_STORAGE_KEY = 'sidePanelOpen';
const PANEL_OPEN_DEFAULT = window.innerWidth >= 960;
export function isPanelOpen(context) {
    const storage = context.getMethodsOf('storage');
    const open = storage.getItem(PANEL_OPEN_STORAGE_KEY);
    return typeof open === 'boolean' ? open : PANEL_OPEN_DEFAULT;
}
export function openPanel(context, open) {
    const storage = context.getMethodsOf('storage');
    storage.setItem(PANEL_OPEN_STORAGE_KEY, open);
}
