import { useCallback, useState } from 'react';

import { Box } from '@/components/ui';

import { SIDENAV_STORAGE_KEY, SidenavStatus } from './Sidenav.constant';
import type { SidenavStatusValue } from './Sidenav.constant';
import { SidenavContext } from './Sidenav.context';
import { SidenavContent } from './SidenavContent.component';
import { SidenavFooter } from './SidenavFooter.component';
import { SidenavHeader } from './SidenavHeader.component';

const getStoredFixedPreference = (): boolean => {
    try {
        return localStorage.getItem(SIDENAV_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
};

const setStoredFixedPreference = (isFixed: boolean): void => {
    try {
        localStorage.setItem(SIDENAV_STORAGE_KEY, String(isFixed));
    } catch {
        // localStorage puede no estar disponible (modo privado, storage lleno, etc.)
    }
};

export const Sidenav = () => {
    const [status, setStatus] = useState<SidenavStatusValue>(() =>
        getStoredFixedPreference() ? SidenavStatus.fixed : SidenavStatus.collapsed
    );

    const toggleFixed = useCallback(() => {
        setStatus((current) => {
            const next =
                current === SidenavStatus.fixed ? SidenavStatus.collapsed : SidenavStatus.fixed;

            setStoredFixedPreference(next === SidenavStatus.fixed);

            return next;
        });
    }, []);

    const onMouseEnter = () => {
        if (status !== SidenavStatus.fixed) setStatus(SidenavStatus.open);
    };

    const onMouseLeave = () => {
        if (status !== SidenavStatus.fixed) setStatus(SidenavStatus.collapsed);
    };

    const isExpanded = status !== SidenavStatus.collapsed;

    return (
        <SidenavContext.Provider value={{ isExpanded, status, toggleFixed }}>
            <Box
                backgroundColor="surface"
                borderRightColor="sidenav.border"
                borderRightStyle="solid"
                borderRightWidth="1px"
                display="flex"
                flexDirection="column"
                flexShrink={0}
                height="100vh"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                overflow="hidden"
                position="relative"
                style={{ transition: 'width 0.2s ease' }}
                width={isExpanded ? '248px' : '72px'}
            >
                <SidenavHeader />
                <SidenavContent />
                <SidenavFooter />
            </Box>
        </SidenavContext.Provider>
    );
};
