import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { ModalContext } from '@/styles/providers/ModalContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>(null);

    const openModal = useCallback((node: ReactNode) => {
        setContent(node);
    }, []);

    const closeModal = useCallback(() => {
        setContent(null);
    }, []);

    const value = useMemo(() => ({ closeModal, openModal }), [openModal, closeModal]);

    return (
        <ModalContext.Provider value={value}>
            {children}
            {content ? (
                <div aria-modal="true" onClick={closeModal} role="dialog">
                    <div onClick={(event) => event.stopPropagation()}>{content}</div>
                </div>
            ) : null}
        </ModalContext.Provider>
    );
};
