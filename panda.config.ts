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
            lineHeight: '1.5rem',
            margin: 0,
            padding: 0
        }
    },
    theme: {
        breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
        extend: {
            tokens: {
                fonts: {
                    main: { value: 'Inter, "Nunito Sans", Arial, Verdana, Helvetica, sans-serif' }
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
                    md: { value: '0.5rem' }
                }
            },
            semanticTokens: {
                colors: {
                    border: { value: '{colors.gray.300}' },
                    danger: { value: '{colors.red.600}' },
                    primary: { value: '{colors.blue.600}' },
                    success: { value: '{colors.green.600}' },
                    sidenav: {
                        bg: { value: '{colors.gray.900}' },
                        border: { value: '{colors.gray.800}' },
                        hover: { value: '{colors.gray.800}' },
                        text: { value: '{colors.gray.100}' },
                        textMuted: { value: '{colors.gray.400}' }
                    },
                    surface: { value: '{colors.gray.50}' },
                    text: {
                        DEFAULT: { value: '{colors.gray.800}' },
                        muted: { value: '{colors.gray.500}' }
                    }
                }
            }
        }
    },
    outdir: 'styled-system'
});
