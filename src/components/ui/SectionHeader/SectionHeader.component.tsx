import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react';

import { Text } from '../Text/Text.component';

interface SectionHeaderProps extends ComponentPropsWithoutRef<'span'> {
    children: ReactNode;
}

const baseStyle: CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase'
};

export const SectionHeader = ({ children, style, ...rest }: SectionHeaderProps) => (
    <Text color="primary" style={{ ...baseStyle, ...style }} variant="label" {...rest}>
        {children}
    </Text>
);
