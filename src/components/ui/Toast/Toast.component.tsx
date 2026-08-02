import type { CSSProperties } from 'react';

import { Toaster as SonnerToaster } from 'sonner';
import { token } from 'styled-system/tokens';

const toasterStyle = {
    '--border-radius': token('radii.md'),
    '--error-bg': '#fff',
    '--error-border': token('colors.danger'),
    '--error-text': token('colors.danger'),
    '--normal-bg': '#fff',
    '--normal-border': token('colors.border'),
    '--normal-text': token('colors.text'),
    '--success-bg': '#fff',
    '--success-border': token('colors.success'),
    '--success-text': token('colors.success'),
    '--toast-close-button-end': '0',
    '--toast-close-button-start': 'unset',
    '--toast-close-button-transform': 'translate(35%, -35%)'
} as CSSProperties;

const toastStyle = { fontFamily: token('fonts.main') };

export const Toaster = () => (
    <SonnerToaster
        closeButton
        position="bottom-right"
        richColors
        style={toasterStyle}
        toastOptions={{ style: toastStyle }}
    />
);
