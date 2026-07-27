import type { ComponentPropsWithoutRef } from 'react';

import { css, cx } from 'styled-system/css';

interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
    fullWidth?: boolean;
    label: string;
    loading?: boolean;
}

const buttonClass = css({
    _disabled: { cursor: 'not-allowed', opacity: 0.7 },
    backgroundColor: 'primary',
    border: 'none',
    borderRadius: 'md',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'medium',
    padding: '2'
});

const fullWidthClass = css({ width: '100%' });

export const Button = ({
    className,
    disabled,
    fullWidth,
    label,
    loading,
    ...rest
}: ButtonProps) => (
    <button
        className={cx(buttonClass, fullWidth && fullWidthClass, className)}
        disabled={disabled ?? loading}
        {...rest}
    >
        {label}
    </button>
);
