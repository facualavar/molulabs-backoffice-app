import type { ReactNode } from 'react';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@molulabs/ds';

interface ConfirmDeleteModalProps {
    loading?: boolean;
    message: ReactNode;
    onCancel: () => void;
    onConfirm: () => void;
    open: boolean;
    title: string;
}

export const ConfirmDeleteModal = ({
    loading,
    message,
    onCancel,
    onConfirm,
    open,
    title
}: ConfirmDeleteModalProps) => (
    // closeOnBack is off: the modal's own history entry would fight react-router's
    <Modal
        closeOnBack={false}
        labelledBy="confirm-delete-title"
        onClose={onCancel}
        open={open}
        size="sm"
    >
        <ModalHeader id="confirm-delete-title" title={title} />
        <ModalBody>
            <p style={{ margin: 0 }}>{message}</p>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onCancel} tone="secondary">
                Cancelar
            </Button>
            <Button
                data-testid="confirm-delete-action-confirm"
                disabled={loading}
                icon="ti-trash"
                onClick={onConfirm}
                tone="danger"
            >
                Eliminar
            </Button>
        </ModalFooter>
    </Modal>
);
