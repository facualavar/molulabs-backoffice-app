import type { ReactNode } from 'react';
import { createContext } from 'react';

export interface ModalContextValue {
    closeModal: () => void;
    openModal: (content: ReactNode) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);
