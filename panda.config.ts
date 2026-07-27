import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    preflight: true,
    include: ['./src/**/*.{js,jsx,ts,tsx}'],
    exclude: [],
    jsxFramework: 'react',
    theme: {
        breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
        extend: {
            semanticTokens: {
                colors: {
                    border: { value: '{colors.gray.300}' },
                    danger: { value: '{colors.red.600}' },
                    primary: { value: '{colors.blue.600}' },
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
