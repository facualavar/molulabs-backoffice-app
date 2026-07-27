import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { css, cx } from 'styled-system/css';

interface TextProps extends ComponentPropsWithoutRef<'p'> {
    as?: ElementType;
    children: ReactNode;
    color?: CSSProperties['color'];
    variant?: TextVariant;
}

type TextVariant = 'body' | 'caption' | 'error' | 'heading' | 'label';

const variantClass: Record<TextVariant, string> = {
    body: css({ color: 'text', fontSize: 'md' }),
    caption: css({ color: 'text.muted', fontSize: 'xs' }),
    error: css({ color: 'danger', fontSize: 'xs' }),
    heading: css({ color: 'text', fontSize: 'xl', fontWeight: 'semibold' }),
    label: css({ color: 'text', fontSize: 'sm', fontWeight: 'medium' })
};

const defaultTag: Record<TextVariant, ElementType> = {
    body: 'p',
    caption: 'span',
    error: 'span',
    heading: 'h1',
    label: 'span'
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

    return (
        <Component
            className={cx(variantClass[variant], className)}
            style={color ? { color, ...style } : style}
            {...rest}
        >
            {children}
        </Component>
    );
};
