import type { ComponentPropsWithoutRef } from 'react';

import { css, cx } from 'styled-system/css';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'value'> {
    error?: string;
    isRequired?: boolean;
    label: string;
    options: SelectOption[];
    placeholder?: string;
    value: string;
}

const fieldClass = css({ display: 'flex', flexDirection: 'column', gap: '1' });
const labelClass = css({ color: 'text', fontSize: 'sm', fontWeight: 'medium' });
const selectClass = css({
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'md',
    fontSize: 'sm',
    padding: '2'
});
const selectErrorClass = css({ borderColor: 'danger' });
const errorTextClass = css({ color: 'danger', fontSize: 'xs' });

export const Select = ({
    className,
    error,
    isRequired,
    label,
    options,
    placeholder,
    ...rest
}: SelectProps) => (
    <label className={fieldClass}>
        <span className={labelClass}>
            {label}
            {isRequired ? ' *' : ''}
        </span>
        <select className={cx(selectClass, error && selectErrorClass, className)} {...rest}>
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error ? <span className={errorTextClass}>{error}</span> : null}
    </label>
);
