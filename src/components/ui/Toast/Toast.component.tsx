import { Toaster as SonnerToaster } from 'sonner';
import { css } from 'styled-system/css';

import { Badge } from '@/components/ui';

const toastClass = css({
    background: '#fff',
    borderBottomColor: 'neutral.300',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderRadius: 'md',
    borderRightColor: 'neutral.300',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderTopColor: 'neutral.300',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    boxShadow: '0 12px 32px rgba(45, 43, 43, 0.22)',
    color: 'text',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'main',
    gap: '6px',
    padding: '20px',
    position: 'relative',
    width: 'var(--width)'
});

const successClass = css({
    borderLeftColor: 'accent.500',
    borderLeftStyle: 'solid',
    borderLeftWidth: '8px'
});
const errorClass = css({
    borderLeftColor: 'accent2.500',
    borderLeftStyle: 'solid',
    borderLeftWidth: '8px'
});

const contentClass = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    paddingRight: '24px'
});

const titleClass = css({ fontSize: '16px', fontWeight: 'semibold' });
const descriptionClass = css({ fontSize: '13px', opacity: 0.8 });

const closeButtonClass = css({
    _hover: { backgroundColor: 'divider' },
    alignItems: 'center',
    background: 'transparent',
    borderRadius: 'md',
    color: 'primary',
    cursor: 'pointer',
    display: 'flex',
    height: 'auto',
    justifyContent: 'center',
    padding: '2px',
    position: 'absolute',
    right: '8px',
    top: '8px',
    width: 'auto'
});

export const Toaster = () => (
    <SonnerToaster
        closeButton
        icons={{
            error: <Badge variant="warning">Error</Badge>,
            success: <Badge variant="info">Éxito</Badge>
        }}
        position="bottom-right"
        toastOptions={{
            classNames: {
                closeButton: closeButtonClass,
                content: contentClass,
                description: descriptionClass,
                error: errorClass,
                success: successClass,
                title: titleClass,
                toast: toastClass
            },
            unstyled: true
        }}
    />
);
