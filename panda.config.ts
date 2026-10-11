import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    preflight: true,
    include: ['./src/**/*.{js,jsx,ts,tsx}'],
    exclude: [],
    jsxFramework: 'react',
    globalCss: {
        'html, body': {
            color: 'text',
            fontFamily: 'main',
            fontSize: 'md',
            fontWeight: 'regular',
            lineHeight: '1.55',
            margin: 0,
            padding: 0
        }
    },
    theme: {
        breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
        extend: {
            tokens: {
                colors: {
                    accent: {
                        DEFAULT: { value: '#0088B0' },
                        100: { value: '#E9F8FF' },
                        500: { value: '#38A6CF' },
                        700: { value: '#006786' },
                        800: { value: '#004961' }
                    },
                    accent2: {
                        100: { value: '#FFF1F4' },
                        500: { value: '#FF458E' },
                        800: { value: '#790E3D' }
                    },
                    bg: { value: '#F3F2F2' },
                    divider: { value: '#EAE9E9' },
                    ink: { value: '#201E1D' },
                    neutral: {
                        100: { value: '#F8F4F4' },
                        300: { value: '#D7D3D3' },
                        800: { value: '#444141' },
                        900: { value: '#2D2B2B' }
                    }
                },
                fonts: {
                    main: { value: '"Source Serif 4", Georgia, "Times New Roman", serif' }
                },
                fontWeights: {
                    black: { value: '900' },
                    bold: { value: '700' },
                    heavy: { value: '800' },
                    light: { value: '300' },
                    medium: { value: '500' },
                    regular: { value: '400' },
                    semibold: { value: '600' },
                    thin: { value: '200' },
                    ultralight: { value: '100' }
                },
                radii: {
                    lg: { value: '0.25rem' },
                    md: { value: '0.125rem' }
                }
            },
            semanticTokens: {
                colors: {
                    badge: {
                        info: {
                            bg: { value: '{colors.accent.100}' },
                            text: { value: '{colors.accent.800}' }
                        },
                        neutral: {
                            bg: { value: '{colors.neutral.100}' },
                            text: { value: '{colors.neutral.800}' }
                        },
                        warning: {
                            bg: { value: '{colors.accent2.100}' },
                            text: { value: '{colors.accent2.800}' }
                        }
                    },
                    border: { value: '{colors.ink/16}' },
                    borderMuted: { value: '{colors.ink/8}' },
                    danger: { value: '{colors.accent2.800}' },
                    field: { value: '{colors.divider}' },
                    onPrimary: { value: '{colors.bg}' },
                    primary: { value: '{colors.accent}' },
                    success: { value: '{colors.accent.800}' },
                    sidenav: {
                        active: { value: '{colors.accent.700}' },
                        border: { value: '{colors.border}' },
                        hover: { value: '{colors.accent/10}' },
                        text: { value: '{colors.text}' },
                        textMuted: { value: '{colors.text.muted}' }
                    },
                    surface: { value: '{colors.bg}' },
                    text: {
                        DEFAULT: { value: '{colors.ink}' },
                        label: { value: '{colors.ink/70}' },
                        muted: { value: '{colors.ink/60}' }
                    }
                }
            }
        }
    },
    outdir: 'styled-system'
});
