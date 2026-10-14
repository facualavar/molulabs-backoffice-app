import { useEffect, useId, useMemo, useState } from 'react';

import type { AutocompleteItem } from '@molulabs/ds';
import { Autocomplete as DsAutocomplete, Field } from '@molulabs/ds';

import { HiddenLabel } from '../HiddenLabel/HiddenLabel.component';

export interface AutocompleteOption {
    id: string;
    label: string;
    /** Secondary figure shown right-aligned in the menu, e.g. the document number */
    meta?: string;
}

interface AutocompleteProps {
    'data-testid'?: string;
    disabled?: boolean;
    error?: string;
    /** Keeps the label for screen readers only, for filters whose placeholder says what they filter */
    hideLabel?: boolean;
    id?: string;
    isRequired?: boolean;
    label: string;
    loading?: boolean;
    minChars?: number;
    name?: string;
    /** Enables the "Crear «texto»" row when the typed text has no exact match */
    onCreate?: (query: string) => void;
    onSearch: (query: string) => void;
    onSelect: (option: AutocompleteOption | null) => void;
    options: AutocompleteOption[];
    placeholder?: string;
    value: AutocompleteOption | null;
}

const DEBOUNCE_MS = 300;

// The design system's Autocomplete searches a list it already has and its value is the typed text.
// This adds what server-side search needs: debounced onSearch, a minimum length, the loading state,
// a picked option as value (its label shows while the field is not being edited), and clearing it by
// erasing the text.
export const Autocomplete = ({
    'data-testid': testId,
    disabled,
    error,
    hideLabel,
    id,
    isRequired,
    label,
    loading,
    minChars = 0,
    name,
    onCreate,
    onSearch,
    onSelect,
    options,
    placeholder,
    value
}: AutocompleteProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [query, setQuery] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    // Typed since focusing, so an untouched field isn't cleared on blur
    const [hasTyped, setHasTyped] = useState(false);

    useEffect(() => {
        if (!isEditing || query.length < minChars) return;

        const timeout = setTimeout(() => onSearch(query), DEBOUNCE_MS);

        return () => clearTimeout(timeout);
    }, [isEditing, minChars, onSearch, query]);

    const isBelowMinChars = query.length < minChars;
    const isWaiting = isBelowMinChars || Boolean(loading);
    const items = useMemo<AutocompleteItem[]>(
        () =>
            isWaiting
                ? []
                : options.map((option) => ({ label: option.label, meta: option.meta, option })),
        [isWaiting, options]
    );
    const emptyLabel = isBelowMinChars
        ? `Escribí al menos ${minChars} caracteres`
        : loading
          ? 'Buscando...'
          : 'Sin resultados';

    const startEditing = () => {
        if (isEditing) return;

        setIsEditing(true);
        setHasTyped(false);
        setQuery('');

        if (minChars === 0) {
            onSearch('');
        }
    };

    const stopEditing = () => {
        setIsEditing(false);
        setHasTyped(false);
        setQuery('');
    };

    // Erasing the text and leaving the field drops the picked option, the only way to clear it
    const handleBlur = () => {
        if (isEditing && hasTyped && !query.trim() && value) {
            onSelect(null);
        }
        stopEditing();
    };

    return (
        <div data-testid={testId} onBlur={handleBlur} onFocus={startEditing}>
            <Field
                error={error}
                htmlFor={inputId}
                label={hideLabel ? undefined : label}
                required={isRequired}
            >
                {hideLabel ? <HiddenLabel htmlFor={inputId}>{label}</HiddenLabel> : null}
                <DsAutocomplete
                    disabled={disabled}
                    emptyLabel={emptyLabel}
                    id={inputId}
                    invalid={Boolean(error)}
                    items={items}
                    name={name}
                    onChange={(text) => {
                        setIsEditing(true);
                        setHasTyped(true);
                        setQuery(text);
                    }}
                    onCreate={
                        onCreate && !isWaiting
                            ? (text) => {
                                  onCreate(text);
                                  stopEditing();
                              }
                            : undefined
                    }
                    onSelect={(item) => {
                        onSelect(item.option as AutocompleteOption);
                        stopEditing();
                    }}
                    placeholder={placeholder}
                    value={isEditing ? query : (value?.label ?? '')}
                />
            </Field>
        </div>
    );
};
