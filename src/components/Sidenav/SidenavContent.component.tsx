import { useState } from 'react';

import { useLocation } from 'react-router';

import { useCurrentUser } from '@/hooks';

import { Box } from '@/components/ui';

import type { SidenavSection as SidenavSectionType } from './Sidenav.config';
import { sidenavSections } from './Sidenav.config';
import { SidenavSection } from './SidenavSection.component';

const findActiveSectionId = (sections: SidenavSectionType[], pathname: string): null | string => {
    const active = sections.find((section) =>
        section.items?.some((item) => pathname.startsWith(item.path))
    );

    return active?.id ?? null;
};

export const SidenavContent = () => {
    const location = useLocation();
    const { data: currentUser } = useCurrentUser();

    const visibleSections = sidenavSections.filter(
        (section) =>
            !section.roles || Boolean(currentUser && section.roles.includes(currentUser.role))
    );

    const [openSectionId, setOpenSectionId] = useState<null | string>(() =>
        findActiveSectionId(visibleSections, location.pathname)
    );

    return (
        <Box display="flex" flex="1" flexDirection="column" gap="1" overflowY="auto" padding="2">
            {visibleSections.map((section) => (
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
