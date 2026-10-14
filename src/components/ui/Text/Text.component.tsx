import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { css, cx } from 'styled-system/css';
import { token } from 'styled-system/tokens';

interface TextProps extends ComponentPropsWithoutRef<'p'> {
    as?: ElementType;
    children: ReactNode;
    /** Token path (eg. "sidenav.text") or a literal CSS color, overrides the variant's color */
    color?: string;
    variant?: TextVariant;
}

type TextVariant = 'body' | 'caption' | 'error' | 'heading' | 'label' | 'title';

const variantClass: Record<TextVariant, string> = {
    body: css({ color: 'text', fontSize: 'md' }),
    caption: css({ color: 'text.muted', fontSize: 'xs' }),
    error: css({ color: 'danger', fontSize: 'xs' }),
    heading: css({ color: 'text', fontSize: 'xl', fontWeight: 'semibold' }),
    label: css({ color: 'text', fontSize: 'sm', fontWeight: 'medium' }),
    title: css({
        color: 'text',
        fontSize: 'var(--ui-title)',
        fontWeight: 'semibold',
        letterSpacing: 'var(--tracking-title)',
        lineHeight: 'var(--leading-tight)'
    })
};

const defaultTag: Record<TextVariant, ElementType> = {
    body: 'p',
    caption: 'span',
    error: 'span',
    heading: 'span',
    label: 'span',
    title: 'h1'
};

export const Text = ({
    as,
    children,
    className,
    color,
    style,
    variant = 'body',
    ...rest
}: TextProps) => {
    const Component = as ?? defaultTag[variant];
    const resolvedColor = color ? token(`colors.${color}`, color) : undefined;

    return (
        <Component
            className={cx(variantClass[variant], className)}
            style={resolvedColor ? { color: resolvedColor, ...style } : style}
            {...rest}
        >
            {children}
        </Component>
    );
};
