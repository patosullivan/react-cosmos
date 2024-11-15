export const NAV_OPEN_STORAGE_KEY = 'navOpen';
const NAV_OPEN_DEFAULT = window.innerWidth >= 640;
export function isNavOpen(context) {
    const storage = context.getMethodsOf('storage');
    const open = storage.getItem(NAV_OPEN_STORAGE_KEY);
    return typeof open === 'boolean' ? open : NAV_OPEN_DEFAULT;
}
export function openNav(context, open) {
    const storage = context.getMethodsOf('storage');
    storage.setItem(NAV_OPEN_STORAGE_KEY, open);
}
