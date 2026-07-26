import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/app/store';

import { hydrateAuthThunk } from '@/store/thunks/auth.thunk';

export const AuthBoot = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(hydrateAuthThunk());
    }, [dispatch]);

    return children;
};
