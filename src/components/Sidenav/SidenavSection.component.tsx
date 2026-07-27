import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useMatch } from 'react-router';

import { Box, Text } from '@/components/ui';

import type { SidenavSection as SidenavSectionType } from './Sidenav.config';
import { useSidenav } from './Sidenav.context';
import { SidenavItem } from './SidenavItem.component';

interface SidenavSectionProps {
    isOpen: boolean;
    onToggle: () => void;
    section: SidenavSectionType;
}

export const SidenavSection = ({ isOpen, onToggle, section }: SidenavSectionProps) => {
    const { isExpanded } = useSidenav();
    const hasChildren = Boolean(section.items?.length);
    const isBaseActive = Boolean(
        useMatch({ end: section.basePath === '/', path: section.basePath })
    );
    const Icon = section.icon;

    return (
        <Box>
            {hasChildren ? (
                <Box
                    alignItems="center"
                    as="button"
                    borderRadius="md"
                    color="sidenav.text"
                    cursor="pointer"
                    display="flex"
                    gap="3"
                    onClick={onToggle}
                    padding="2"
                    style={{ background: 'none', border: 'none', width: '100%' }}
                    title={isExpanded ? undefined : section.title}
                >
                    <Icon size={20} style={{ flexShrink: 0 }} />
                    {isExpanded ? (
                        <>
                            <Text
                                color="sidenav.text"
                                style={{ whiteSpace: 'nowrap' }}
                                variant="label"
                            >
                                {section.title}
                            </Text>
                            <Box marginLeft="auto">
                                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Box>
                        </>
                    ) : null}
                </Box>
            ) : (
                <Box
                    alignItems="center"
                    as={Link}
                    backgroundColor={isBaseActive ? 'sidenav.hover' : undefined}
                    borderRadius="md"
                    color="sidenav.text"
                    display="flex"
                    gap="3"
                    padding="2"
                    title={isExpanded ? undefined : section.title}
                    to={section.basePath}
                >
                    <Icon size={20} style={{ flexShrink: 0 }} />
                    {isExpanded ? (
                        <Text color="sidenav.text" style={{ whiteSpace: 'nowrap' }} variant="label">
                            {section.title}
                        </Text>
                    ) : null}
                </Box>
            )}

            {isExpanded && hasChildren && isOpen ? (
                <Box display="flex" flexDirection="column" gap="1" paddingLeft="8" paddingTop="1">
                    {section.items?.map((item) => (
                        <SidenavItem item={item} key={item.path} />
                    ))}
                </Box>
            ) : null}
        </Box>
    );
};
