import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'styled-system': path.resolve(__dirname, './styled-system')
        }
    },
    css: {
        postcss: {
            plugins: []
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/__test__/setup',
        css: false,
        // @molulabs/ds ships .jsx sources: Vite must transform them instead of leaving them to Node
        server: { deps: { inline: ['@molulabs/ds'] } }
    }
});
