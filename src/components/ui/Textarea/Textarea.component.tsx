import type { ComponentPropsWithoutRef } from 'react';
import { useId, useState } from 'react';

import { Field, controlStyle } from '@molulabs/ds';

interface TextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'value'> {
    error?: string;
    isRequired?: boolean;
    label: string;
    value: string;
}

export const Textarea = ({
    disabled,
    error,
    id,
    isRequired,
    label,
    onBlur,
    onFocus,
    rows = 3,
    style,
    ...rest
}: TextareaProps) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const [focus, setFocus] = useState(false);

    return (
        <Field error={error} htmlFor={textareaId} label={label} required={isRequired}>
            <textarea
                disabled={disabled}
                id={textareaId}
                onBlur={(event) => {
                    setFocus(false);
                    onBlur?.(event);
                }}
                onFocus={(event) => {
                    setFocus(true);
                    onFocus?.(event);
                }}
                rows={rows}
                style={{
                    ...controlStyle({ disabled, focus, invalid: Boolean(error) }),
                    resize: 'vertical',
                    ...style
                }}
                {...rest}
            />
        </Field>
    );
};
