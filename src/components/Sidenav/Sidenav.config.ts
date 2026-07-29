import type { LucideIcon } from 'lucide-react';
import { Briefcase, Building2, Home, Users } from 'lucide-react';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { SUPERADMIN_ROLE, USER_ROLE } from '@/domain/models/usuario.model';

export interface SidenavItem {
    path: string;
    title: string;
}

export interface SidenavSection {
    basePath: string;
    icon: LucideIcon;
    id: string;
    items?: SidenavItem[];
    roles?: string[];
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
        roles: [SUPERADMIN_ROLE],
        title: 'Empresas'
    },
    {
        basePath: PRIVATE_ROUTES.USERS,
        icon: Users,
        id: 'users',
        roles: [USER_ROLE.ADMIN, SUPERADMIN_ROLE],
        title: 'Usuarios'
    },
    {
        basePath: PRIVATE_ROUTES.MY_COMPANY,
        icon: Briefcase,
        id: 'my-company',
        roles: [USER_ROLE.ADMIN, SUPERADMIN_ROLE],
        title: 'Mi empresa'
    }
];
