import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'styled-system': path.resolve(__dirname, './styled-system')
        },
        // The linked @molulabs/ds has no node_modules of its own: resolve React from the app
        dedupe: ['react', 'react-dom']
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
        css: false
    }
});
