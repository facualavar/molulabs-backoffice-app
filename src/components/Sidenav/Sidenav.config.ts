import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

export interface SidenavSection {
    basePath: string;
    /** Tabler icon class, shown only while the menu is collapsed */
    icon: string;
    id: string;
    title: string;
}

export const sidenavSections: SidenavSection[] = [
    {
        basePath: PRIVATE_ROUTES.HOME,
        icon: 'ti-layout-dashboard',
        id: 'home',
        title: 'Inicio'
    },
    {
        basePath: PRIVATE_ROUTES.COMPANIES,
        icon: 'ti-building',
        id: 'companies',
        title: 'Empresas'
    },
    {
        basePath: PRIVATE_ROUTES.USERS,
        icon: 'ti-users',
        id: 'users',
        title: 'Usuarios'
    },
    {
        basePath: PRIVATE_ROUTES.MY_COMPANY,
        icon: 'ti-briefcase',
        id: 'my-company',
        title: 'Mi empresa'
    }
];

export const SIDENAV_STORAGE_KEY = 'sidenav-expanded';
