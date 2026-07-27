export const SIDENAV_STORAGE_KEY = 'backoffice_sidenav_fixed';

export const SidenavStatus = {
    collapsed: 'collapsed',
    fixed: 'fixed',
    open: 'open'
} as const;

export type SidenavStatusValue = (typeof SidenavStatus)[keyof typeof SidenavStatus];
