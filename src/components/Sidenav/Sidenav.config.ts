import type { LucideIcon } from 'lucide-react';
import { Home } from 'lucide-react';

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
    }
];
