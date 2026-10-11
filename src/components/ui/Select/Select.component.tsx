import { useEffect, useId, useRef, useState } from 'react';

import { Check, ChevronDown } from 'lucide-react';
import { css, cx } from 'styled-system/css';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    className?: string;
    'data-testid'?: string;
    disabled?: boolean;
    error?: string;
    isRequired?: boolean;
    label: string;
    onBlur?: () => void;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    value: string;
}

const fieldClass = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
    position: 'relative'
});
const labelClass = css({ color: 'text.label', fontSize: 'xs', fontWeight: 'regular' });
const triggerClass = css({
    _disabled: { cursor: 'not-allowed', opacity: 0.7 },
    alignItems: 'center',
    backgroundColor: 'field',
    borderColor: 'border',
    borderRadius: 'md',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'text',
    cursor: 'pointer',
    display: 'flex',
    fontFamily: 'main',
    fontSize: 'sm',
    justifyContent: 'space-between',
    paddingX: '10px',
    paddingY: '6px',
    textAlign: 'left',
    width: '100%'
});
const triggerErrorClass = css({ borderColor: 'danger' });
const placeholderClass = css({ color: 'text.muted' });
const chevronClass = css({ color: 'text.muted', flexShrink: 0 });
const panelClass = css({
    backgroundColor: 'white',
    borderColor: 'border',
    borderRadius: 'lg',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: 'lg',
    left: 0,
    marginTop: '1',
    maxHeight: '240px',
    overflowY: 'auto',
    position: 'absolute',
    right: 0,
    top: '100%',
    zIndex: 10
});
const optionClass = css({
    _hover: { backgroundColor: 'surface' },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 'sm',
    justifyContent: 'space-between',
    padding: '2'
});
const optionSelectedClass = css({ color: 'primary', fontWeight: 'medium' });
const errorTextClass = css({ color: 'danger', fontSize: 'xs' });

export const Select = ({
    className,
    disabled,
    error,
    isRequired,
    label,
    onBlur,
    onChange,
    options,
    placeholder,
    value,
    ...rest
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const labelId = useId();

    useEffect(() => {
        if (!isOpen) return;

        const close = () => {
            setIsOpen(false);
            onBlur?.();
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                close();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onBlur]);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
        onBlur?.();
    };

    return (
        <div className={fieldClass} ref={containerRef}>
            <span className={labelClass} id={labelId}>
                {label}
                {isRequired ? ' *' : ''}
            </span>
            <button
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-labelledby={labelId}
                className={cx(triggerClass, error && triggerErrorClass, className)}
                disabled={disabled}
                onClick={() => setIsOpen((open) => !open)}
                type="button"
                {...rest}
            >
                <span className={selectedOption ? undefined : placeholderClass}>
                    {selectedOption?.label ?? placeholder ?? ''}
                </span>
                <ChevronDown className={chevronClass} size={16} />
            </button>
            {isOpen ? (
                <div className={panelClass} role="listbox">
                    {placeholder ? (
                        <div
                            aria-selected={value === ''}
                            className={cx(optionClass, value === '' && optionSelectedClass)}
                            onClick={() => handleSelect('')}
                            role="option"
                        >
                            <span className={placeholderClass}>{placeholder}</span>
                            {value === '' ? <Check size={16} /> : null}
                        </div>
                    ) : null}
                    {options.map((option) => (
                        <div
                            aria-selected={option.value === value}
                            className={cx(
                                optionClass,
                                option.value === value && optionSelectedClass
                            )}
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                        >
                            {option.label}
                            {option.value === value ? <Check size={16} /> : null}
                        </div>
                    ))}
                </div>
            ) : null}
            {error ? <span className={errorTextClass}>{error}</span> : null}
        </div>
    );
};
