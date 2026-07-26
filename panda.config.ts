import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    preflight: true,
    include: ['./src/**/*.{js,jsx,ts,tsx}'],
    exclude: [],
    jsxFramework: 'react',
    theme: {
        breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
        extend: {}
    },
    outdir: 'styled-system'
});
