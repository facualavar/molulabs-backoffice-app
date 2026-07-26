import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    envPrefix: 'BACKOFFICE_',
    server: {
        allowedHosts: ['app.backoffice.local']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'styled-system': path.resolve(__dirname, './styled-system')
        }
    }
});
