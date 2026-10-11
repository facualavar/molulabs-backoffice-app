import type { ComponentPropsWithoutRef } from 'react';

import { css, cx } from 'styled-system/css';

interface TextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'value'> {
    error?: string;
    isRequired?: boolean;
    label: string;
    value: string;
}

const fieldClass = css({ display: 'flex', flexDirection: 'column', gap: '1' });
const labelClass = css({ color: 'text.label', fontSize: 'xs', fontWeight: 'regular' });
const textareaClass = css({
    backgroundColor: 'field',
    borderColor: 'border',
    borderRadius: 'md',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'text',
    fontFamily: 'main',
    fontSize: 'sm',
    paddingX: '10px',
    paddingY: '6px',
    resize: 'vertical'
});
const textareaErrorClass = css({ borderColor: 'danger' });
const errorTextClass = css({ color: 'danger', fontSize: 'xs' });

export const Textarea = ({ className, error, isRequired, label, ...rest }: TextareaProps) => (
    <label className={fieldClass}>
        <span className={labelClass}>
            {label}
            {isRequired ? ' *' : ''}
        </span>
        <textarea className={cx(textareaClass, error && textareaErrorClass, className)} {...rest} />
        {error ? <span className={errorTextClass}>{error}</span> : null}
    </label>
);
