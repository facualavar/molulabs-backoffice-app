import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';

interface UseNameSearchResult {
    nameFilter: string;
    nameInput: string;
    page: number;
    setNameInput: (value: string) => void;
    setPage: (page: number) => void;
}

export const useNameSearch = (): UseNameSearchResult => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
    const nameFilter = searchParams.get('name') ?? '';
    const [nameInput, setNameInput] = useState(nameFilter);

    useEffect(() => {
        if (nameInput === nameFilter) return;
        if (nameInput.length > 0 && nameInput.length < MIN_SEARCH_CHARS) return;

        const timeout = setTimeout(() => {
            setSearchParams((previous) => {
                const next = new URLSearchParams(previous);

                if (nameInput) {
                    next.set('name', nameInput);
                } else {
                    next.delete('name');
                }
                next.set('page', String(DEFAULT_PAGE));

                return next;
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [nameFilter, nameInput, setSearchParams]);

    const setPage = (nextPage: number) => {
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set('page', String(nextPage));

            return next;
        });
    };

    return { nameFilter, nameInput, page, setNameInput, setPage };
};
