import type { AuthState } from '@/store/slices/auth.slice';

export interface AppStore {
    auth: AuthState;
}
