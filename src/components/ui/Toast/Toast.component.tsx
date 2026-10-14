import { TOAST_TONES } from '@molulabs/ds';
import { Toaster as SonnerToaster } from 'sonner';
import { css } from 'styled-system/css';

// Sonner keeps the queue and timing; the look is the design system's Toast
// (hairline card, 3px status bar on the left, tinted ground, --shadow-toast).
const toastClass = css({
    alignItems: 'flex-start',
    background: 'var(--card)',
    borderBottom: 'var(--border-hair)',
    borderLeftColor: 'var(--ink-3)',
    borderLeftStyle: 'solid',
    borderLeftWidth: 'var(--bar-status)',
    borderRadius: '0 var(--r) var(--r) 0',
    borderRight: 'var(--border-hair)',
    borderTop: 'var(--border-hair)',
    boxShadow: 'var(--shadow-toast)',
    color: 'var(--ink)',
    display: 'flex',
    fontFamily: 'var(--sans)',
    gap: '11px',
    padding: '12px 12px 12px 14px',
    position: 'relative',
    width: 'var(--width)'
});

const successClass = css({
    '& [data-title]': { color: 'var(--ok-ink)' },
    background: 'var(--ok-bg)',
    borderLeftColor: 'var(--ok)'
});
const errorClass = css({
    '& [data-title]': { color: 'var(--alert-ink)' },
    background: 'var(--alert-bg)',
    borderLeftColor: 'var(--alert)'
});
const warningClass = css({
    '& [data-title]': { color: 'var(--warn-ink)' },
    background: 'var(--warn-bg)',
    borderLeftColor: 'var(--warn)'
});

const contentClass = css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: '1px',
    minWidth: 0,
    paddingRight: '24px'
});

const titleClass = css({ fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)' });
const descriptionClass = css({ color: 'var(--ink-2)', fontSize: '13px' });
const iconClass = css({ flex: 'none', marginTop: '1px' });

const closeButtonClass = css({
    _hover: { backgroundColor: 'var(--page)', color: 'var(--ink)' },
    alignItems: 'center',
    background: 'transparent',
    border: 0,
    borderRadius: 'var(--r-sm)',
    color: 'var(--ink-3)',
    cursor: 'pointer',
    display: 'flex',
    height: '26px',
    justifyContent: 'center',
    position: 'absolute',
    right: '8px',
    top: '8px',
    width: '26px'
});

const toneIcon = (tone: keyof typeof TOAST_TONES) => (
    <i
        className={`ti ${TOAST_TONES[tone].icon}`}
        style={{ color: TOAST_TONES[tone].color, fontSize: '20px' }}
    />
);

export const Toaster = () => (
    <SonnerToaster
        closeButton
        icons={{
            close: <i className="ti ti-x" style={{ fontSize: '16px' }} />,
            error: toneIcon('danger'),
            info: toneIcon('info'),
            success: toneIcon('success'),
            warning: toneIcon('warning')
        }}
        position="bottom-right"
        toastOptions={{
            classNames: {
                closeButton: closeButtonClass,
                content: contentClass,
                description: descriptionClass,
                error: errorClass,
                icon: iconClass,
                success: successClass,
                title: titleClass,
                toast: toastClass,
                warning: warningClass
            },
            unstyled: true
        }}
    />
);
