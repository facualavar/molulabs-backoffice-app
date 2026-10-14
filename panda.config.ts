import { defineConfig } from '@pandacss/dev';

// Colors, fonts and radii point at the Molulabs design system's CSS variables
// (@molulabs/ds/styles.css, imported in src/index.css), so every css()/Box/Text
// in the app follows the design system. Token names are kept from the previous theme.
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
                        DEFAULT: { value: 'var(--chrome)' },
                        100: { value: 'var(--ok-bg)' },
                        500: { value: 'var(--ok)' },
                        700: { value: 'var(--chrome-2)' },
                        800: { value: 'var(--ok-ink)' }
                    },
                    accent2: {
                        100: { value: 'var(--alert-bg)' },
                        500: { value: 'var(--alert)' },
                        800: { value: 'var(--alert-ink)' }
                    },
                    bg: { value: 'var(--page)' },
                    divider: { value: 'var(--line-soft)' },
                    ink: { value: 'var(--ink)' },
                    leather: { value: 'var(--leather)' },
                    neutral: {
                        100: { value: 'var(--mut-bg)' },
                        300: { value: 'var(--line)' },
                        800: { value: 'var(--ink-2)' },
                        900: { value: 'var(--ink)' }
                    }
                },
                fonts: {
                    main: { value: 'var(--sans)' },
                    mono: { value: 'var(--mono)' }
                },
                // Dense backoffice scale (data-density="compact"): body text is 13.5px
                fontSizes: {
                    xs: { value: 'var(--ui-text-sm)' },
                    sm: { value: 'var(--ui-text)' },
                    md: { value: 'var(--ui-text)' },
                    lg: { value: 'var(--ui-text-lg)' },
                    xl: { value: 'var(--ui-title)' }
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
                    lg: { value: 'var(--r)' },
                    md: { value: 'var(--r)' },
                    sm: { value: 'var(--r-sm)' }
                },
                shadows: {
                    lg: { value: 'var(--shadow-menu)' }
                }
            },
            semanticTokens: {
                colors: {
                    badge: {
                        info: {
                            bg: { value: 'var(--ok-bg)' },
                            text: { value: 'var(--ok)' }
                        },
                        neutral: {
                            bg: { value: 'var(--mut-bg)' },
                            text: { value: 'var(--ink-2)' }
                        },
                        warning: {
                            bg: { value: 'var(--warn-bg)' },
                            text: { value: 'var(--warn)' }
                        }
                    },
                    border: { value: 'var(--line)' },
                    borderMuted: { value: 'var(--line-soft)' },
                    card: { value: 'var(--card)' },
                    danger: { value: 'var(--alert)' },
                    field: { value: 'var(--card)' },
                    onPrimary: { value: '#fff' },
                    primary: { value: 'var(--chrome)' },
                    success: { value: 'var(--ok)' },
                    sidenav: {
                        active: { value: 'var(--leather-2)' },
                        border: { value: 'var(--chrome-line)' },
                        hover: { value: 'var(--chrome-2)' },
                        text: { value: 'var(--chrome-ink)' },
                        textMuted: { value: 'var(--chrome-mut)' }
                    },
                    surface: { value: 'var(--page)' },
                    text: {
                        DEFAULT: { value: 'var(--ink)' },
                        label: { value: 'var(--ink-2)' },
                        muted: { value: 'var(--ink-3)' }
                    },
                    warning: { value: 'var(--warn)' },
                    zebra: { value: 'var(--zebra)' }
                }
            }
        }
    },
    outdir: 'styled-system'
});
