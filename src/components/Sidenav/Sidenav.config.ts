import type { LucideIcon } from 'lucide-react';
import { Home } from 'lucide-react';

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
        basePath: '/',
        icon: Home,
        id: 'inicio',
        title: 'Inicio'
    }
];
