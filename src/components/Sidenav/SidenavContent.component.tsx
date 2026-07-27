import { useState } from 'react';

import { useLocation } from 'react-router';

import { Box } from '@/components/ui';

import { sidenavSections } from './Sidenav.config';
import { SidenavSection } from './SidenavSection.component';

const findActiveSectionId = (pathname: string): null | string => {
    const active = sidenavSections.find((section) =>
        section.items?.some((item) => pathname.startsWith(item.path))
    );

    return active?.id ?? null;
};

export const SidenavContent = () => {
    const location = useLocation();
    const [openSectionId, setOpenSectionId] = useState<null | string>(() =>
        findActiveSectionId(location.pathname)
    );

    return (
        <Box display="flex" flex="1" flexDirection="column" gap="1" overflowY="auto" padding="2">
            {sidenavSections.map((section) => (
                <SidenavSection
                    isOpen={openSectionId === section.id}
                    key={section.id}
                    onToggle={() =>
                        setOpenSectionId((current) => (current === section.id ? null : section.id))
                    }
                    section={section}
                />
            ))}
        </Box>
    );
};
