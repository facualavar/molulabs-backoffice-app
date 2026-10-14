import { useId } from 'react';

import { Select as DsSelect, Field } from '@molulabs/ds';

import { HiddenLabel } from '../HiddenLabel/HiddenLabel.component';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    className?: string;
    'data-testid'?: string;
    disabled?: boolean;
    error?: string;
    /** Keeps the label for screen readers only, for filters whose placeholder says what they filter */
    hideLabel?: boolean;
    isRequired?: boolean;
    label: string;
    onBlur?: () => void;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    value: string;
}

export const Select = ({
    className,
    'data-testid': testId,
    disabled,
    error,
    hideLabel,
    isRequired,
    label,
    onBlur,
    onChange,
    options,
    placeholder,
    value
}: SelectProps) => {
    const selectId = useId();

    return (
        <Field
            error={error}
            htmlFor={selectId}
            label={hideLabel ? undefined : label}
            required={isRequired}
        >
            {hideLabel ? <HiddenLabel htmlFor={selectId}>{label}</HiddenLabel> : null}
            {/* React's onBlur bubbles (focusout), so the wrapper reports the native select's blur */}
            <div className={className} data-testid={testId} onBlur={onBlur}>
                <DsSelect
                    disabled={disabled}
                    id={selectId}
                    invalid={Boolean(error)}
                    onChange={onChange}
                    options={options}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
        </Field>
    );
};
