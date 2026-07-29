import type { ComponentPropsWithoutRef } from 'react';

import { css, cx } from 'styled-system/css';

interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
    fullWidth?: boolean;
    label: string;
    loading?: boolean;
    variant?: ButtonVariant;
}

type ButtonVariant = 'primary' | 'secondary';

const buttonClass = css({
    _disabled: { cursor: 'not-allowed', opacity: 0.7 },
    borderRadius: 'md',
    cursor: 'pointer',
    fontWeight: 'medium',
    padding: '2'
});

const variantClass: Record<ButtonVariant, string> = {
    primary: css({ backgroundColor: 'primary', border: 'none', color: 'white' }),
    secondary: css({
        backgroundColor: 'surface',
        border: '1px solid',
        borderColor: 'border',
        color: 'text'
    })
};

const fullWidthClass = css({ width: '100%' });

export const Button = ({
    className,
    disabled,
    fullWidth,
    label,
    loading,
    variant = 'primary',
    ...rest
}: ButtonProps) => (
    <button
        className={cx(buttonClass, variantClass[variant], fullWidth && fullWidthClass, className)}
        disabled={disabled ?? loading}
        {...rest}
    >
        {label}
    </button>
);
