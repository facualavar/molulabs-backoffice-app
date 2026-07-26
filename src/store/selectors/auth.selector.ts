import type { AppStore } from '@/store/domain/models/store.model';

export const selectIsAuthenticated = (state: AppStore): boolean => state.auth.isAuthenticated;
export const selectAuthHydrated = (state: AppStore): boolean => state.auth.hydrated;
