import type { ComponentPropsWithoutRef } from 'react';

import { css, cx } from 'styled-system/css';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value'> {
    error?: string;
    isRequired?: boolean;
    label: string;
    value: string;
}

const fieldClass = css({ display: 'flex', flexDirection: 'column', gap: '1' });
const labelClass = css({ color: 'text.label', fontSize: 'xs', fontWeight: 'regular' });
const inputClass = css({
    backgroundColor: 'field',
    borderColor: 'border',
    borderRadius: 'md',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'text',
    fontSize: 'sm',
    paddingX: '10px',
    paddingY: '6px'
});
const inputErrorClass = css({ borderColor: 'danger' });
const errorTextClass = css({ color: 'danger', fontSize: 'xs' });

export const Input = ({ className, error, isRequired, label, ...rest }: InputProps) => (
    <label className={fieldClass}>
        <span className={labelClass}>
            {label}
            {isRequired ? ' *' : ''}
        </span>
        <input className={cx(inputClass, error && inputErrorClass, className)} {...rest} />
        {error ? <span className={errorTextClass}>{error}</span> : null}
    </label>
);
