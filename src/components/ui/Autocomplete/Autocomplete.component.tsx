import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useRef, useState } from 'react';

import { css, cx } from 'styled-system/css';

export interface AutocompleteOption {
    id: string;
    label: string;
}

interface AutocompleteProps extends Omit<
    ComponentPropsWithoutRef<'input'>,
    'children' | 'onChange' | 'onSelect' | 'value'
> {
    error?: string;
    isRequired?: boolean;
    label: string;
    loading?: boolean;
    minChars?: number;
    onSearch: (query: string) => void;
    onSelect: (option: AutocompleteOption | null) => void;
    options: AutocompleteOption[];
    value: AutocompleteOption | null;
}

const DEBOUNCE_MS = 300;

const fieldClass = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
    position: 'relative'
});
const labelClass = css({ color: 'text', fontSize: 'sm', fontWeight: 'medium' });
const inputClass = css({
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'md',
    fontSize: 'sm',
    padding: '2'
});
const inputErrorClass = css({ borderColor: 'danger' });
const errorTextClass = css({ color: 'danger', fontSize: 'xs' });
const dropdownClass = css({
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'md',
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
    cursor: 'pointer',
    fontSize: 'sm',
    padding: '2'
});
const messageClass = css({ color: 'text.muted', fontSize: 'sm', padding: '2' });

export const Autocomplete = ({
    className,
    disabled,
    error,
    isRequired,
    label,
    loading,
    minChars = 0,
    onSearch,
    onSelect,
    options,
    value,
    ...rest
}: AutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const blurTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        if (!isOpen || query.length < minChars) return;

        const timeout = setTimeout(() => onSearch(query), DEBOUNCE_MS);

        return () => clearTimeout(timeout);
    }, [isOpen, minChars, onSearch, query]);

    const handleFocus = () => {
        setQuery('');
        setIsOpen(true);

        if (minChars === 0) {
            onSearch('');
        }
    };

    const handleBlur = () => {
        blurTimeout.current = setTimeout(() => setIsOpen(false), 150);
    };

    const handleSelect = (option: AutocompleteOption) => {
        clearTimeout(blurTimeout.current);
        onSelect(option);
        setQuery('');
        setIsOpen(false);
    };

    const displayValue = isOpen ? query : (value?.label ?? '');

    return (
        <label className={fieldClass}>
            <span className={labelClass}>
                {label}
                {isRequired ? ' *' : ''}
            </span>
            <input
                className={cx(inputClass, error && inputErrorClass, className)}
                disabled={disabled}
                onBlur={handleBlur}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={handleFocus}
                value={displayValue}
                {...rest}
            />
            {isOpen ? (
                <div className={dropdownClass}>
                    {query.length < minChars ? (
                        <div className={messageClass}>Escribí al menos {minChars} caracteres</div>
                    ) : loading ? (
                        <div className={messageClass}>Buscando...</div>
                    ) : options.length === 0 ? (
                        <div className={messageClass}>Sin resultados</div>
                    ) : (
                        options.map((option) => (
                            <div
                                className={optionClass}
                                key={option.id}
                                onClick={() => handleSelect(option)}
                                onMouseDown={(event) => event.preventDefault()}
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            ) : null}
            {error ? <span className={errorTextClass}>{error}</span> : null}
        </label>
    );
};
