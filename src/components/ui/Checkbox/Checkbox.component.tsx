import type { ComponentPropsWithoutRef } from 'react';

import { css } from 'styled-system/css';

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
    label: string;
}

const wrapperClass = css({ alignItems: 'center', display: 'flex', fontSize: 'sm', gap: '2' });

export const Checkbox = ({ id, label, ...rest }: CheckboxProps) => (
    <label className={wrapperClass} htmlFor={id}>
        <input id={id} type="checkbox" {...rest} />
        {label}
    </label>
);
