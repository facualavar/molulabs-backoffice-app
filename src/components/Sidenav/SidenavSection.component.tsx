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
    const isRoot = section.basePath === '/';
    const isBaseActive = Boolean(
        useMatch({ end: isRoot, path: isRoot ? section.basePath : `${section.basePath}/*` })
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
                    {isExpanded ? (
                        <>
                            <Text
                                color="sidenav.text"
                                style={{ fontSize: '15px', whiteSpace: 'nowrap' }}
                                variant="label"
                            >
                                {section.title}
                            </Text>
                            <Box marginLeft="auto">
                                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Box>
                        </>
                    ) : (
                        <Icon size={20} style={{ flexShrink: 0 }} />
                    )}
                </Box>
            ) : (
                <Box
                    _hover={{ textDecoration: 'underline' }}
                    alignItems="center"
                    as={Link}
                    borderRadius="md"
                    color={isBaseActive ? 'sidenav.active' : 'sidenav.text'}
                    display="flex"
                    gap="3"
                    padding="2"
                    title={isExpanded ? undefined : section.title}
                    to={section.basePath}
                >
                    {isExpanded ? (
                        <Text
                            color={isBaseActive ? 'sidenav.active' : 'sidenav.text'}
                            style={{
                                fontSize: '15px',
                                fontWeight: isBaseActive ? 600 : 400,
                                textDecoration: isBaseActive ? 'underline' : undefined,
                                whiteSpace: 'nowrap'
                            }}
                            variant="label"
                        >
                            {section.title}
                        </Text>
                    ) : (
                        <Icon size={20} style={{ flexShrink: 0 }} />
                    )}
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
