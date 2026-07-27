import { createContext, useContext } from 'react';

import type { SidenavStatusValue } from './Sidenav.constant';

interface SidenavContextValue {
    isExpanded: boolean;
    status: SidenavStatusValue;
    toggleFixed: () => void;
}

export const SidenavContext = createContext<null | SidenavContextValue>(null);

export const useSidenav = (): SidenavContextValue => {
    const context = useContext(SidenavContext);

    if (!context) {
        throw new Error('useSidenav must be used within Sidenav');
    }

    return context;
};
