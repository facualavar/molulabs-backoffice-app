import type { CSSProperties } from 'react';

interface HiddenLabelProps {
    children: string;
    htmlFor: string;
}

const hiddenStyle: CSSProperties = {
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1
};

// A label only screen readers see: for filters, where the placeholder already says what they filter
export const HiddenLabel = ({ children, htmlFor }: HiddenLabelProps) => (
    <label htmlFor={htmlFor} style={hiddenStyle}>
        {children}
    </label>
);
