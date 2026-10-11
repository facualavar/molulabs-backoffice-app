import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css, cx } from 'styled-system/css';

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
    children: ReactNode;
    variant?: BadgeVariant;
}

type BadgeVariant = 'info' | 'neutral' | 'warning';

const baseClass = css({
    borderRadius: '1.5px',
    display: 'inline-flex',
    fontSize: '11px',
    paddingX: '10px',
    paddingY: '3px',
    whiteSpace: 'nowrap'
});

const variantClass: Record<BadgeVariant, string> = {
    info: css({ backgroundColor: 'badge.info.bg', color: 'badge.info.text' }),
    neutral: css({ backgroundColor: 'badge.neutral.bg', color: 'badge.neutral.text' }),
    warning: css({ backgroundColor: 'badge.warning.bg', color: 'badge.warning.text' })
};

export const Badge = ({ children, className, variant = 'neutral', ...rest }: BadgeProps) => (
    <span className={cx(baseClass, variantClass[variant], className)} {...rest}>
        {children}
    </span>
);
