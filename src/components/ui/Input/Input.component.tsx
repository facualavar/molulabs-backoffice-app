import type { ComponentPropsWithoutRef } from 'react';
import { useId, useState } from 'react';

import { Field, controlStyle } from '@molulabs/ds';

import { HiddenLabel } from '../HiddenLabel/HiddenLabel.component';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value'> {
    error?: string;
    /** Keeps the label for screen readers only, for filters whose placeholder says what they filter */
    hideLabel?: boolean;
    isRequired?: boolean;
    label: string;
    value: string;
}

// Native <input> inside the design system's Field + controlStyle (its documented extension point),
// so Formik keeps receiving the original change/blur events.
export const Input = ({
    disabled,
    error,
    hideLabel,
    id,
    isRequired,
    label,
    onBlur,
    onFocus,
    style,
    ...rest
}: InputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [focus, setFocus] = useState(false);

    return (
        <Field
            error={error}
            htmlFor={inputId}
            label={hideLabel ? undefined : label}
            required={isRequired}
        >
            {hideLabel ? <HiddenLabel htmlFor={inputId}>{label}</HiddenLabel> : null}
            <input
                disabled={disabled}
                id={inputId}
                onBlur={(event) => {
                    setFocus(false);
                    onBlur?.(event);
                }}
                onFocus={(event) => {
                    setFocus(true);
                    onFocus?.(event);
                }}
                style={{ ...controlStyle({ disabled, focus, invalid: Boolean(error) }), ...style }}
                {...rest}
            />
        </Field>
    );
};
