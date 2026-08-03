import type { LucideIcon } from 'lucide-react';
import { Briefcase, Building2, Home, Users } from 'lucide-react';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

export interface SidenavItem {
    path: string;
    title: string;
}

export interface SidenavSection {
    basePath: string;
    icon: LucideIcon;
    id: string;
    items?: SidenavItem[];
    title: string;
}

export const sidenavSections: SidenavSection[] = [
    {
        basePath: PRIVATE_ROUTES.HOME,
        icon: Home,
        id: 'home',
        title: 'Inicio'
    },
    {
        basePath: PRIVATE_ROUTES.COMPANIES,
        icon: Building2,
        id: 'companies',
        title: 'Empresas'
    },
    {
        basePath: PRIVATE_ROUTES.USERS,
        icon: Users,
        id: 'users',
        title: 'Usuarios'
    },
    {
        basePath: PRIVATE_ROUTES.MY_COMPANY,
        icon: Briefcase,
        id: 'my-company',
        title: 'Mi empresa'
    }
];
