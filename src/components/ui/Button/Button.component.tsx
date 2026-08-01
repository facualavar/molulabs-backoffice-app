import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css, cx } from 'styled-system/css';

interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
    fullWidth?: boolean;
    icon?: ReactNode;
    label: string;
    loading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
type ButtonVariant = 'primary' | 'secondary';

const buttonClass = css({
    _disabled: { cursor: 'not-allowed', opacity: 0.7 },
    alignItems: 'center',
    borderRadius: 'md',
    cursor: 'pointer',
    display: 'flex',
    fontWeight: 'medium',
    justifyContent: 'center'
});

const sizeClass: Record<ButtonSize, string> = {
    lg: css({ fontSize: 'lg', paddingX: '5', paddingY: '3' }),
    md: css({ fontSize: 'md', paddingX: '4', paddingY: '2' }),
    sm: css({ fontSize: 'sm', paddingX: '3', paddingY: '2' }),
    xs: css({ fontSize: 'xs', paddingX: '2', paddingY: '1' })
};

const iconSizeClass: Record<ButtonSize, string> = {
    lg: css({ padding: '3' }),
    md: css({ padding: '2' }),
    sm: css({ padding: '2' }),
    xs: css({ padding: '1' })
};

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
    icon,
    label,
    loading,
    size = 'md',
    variant = 'primary',
    ...rest
}: ButtonProps) => (
    <button
        aria-label={icon ? label : undefined}
        className={cx(
            buttonClass,
            icon ? iconSizeClass[size] : sizeClass[size],
            variantClass[variant],
            fullWidth && fullWidthClass,
            className
        )}
        disabled={disabled ?? loading}
        {...rest}
    >
        {icon ?? label}
    </button>
);
