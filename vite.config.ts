import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// @molulabs/ds is linked from ../../desing-system (mounted at /desing-system in Docker)
const designSystemRoot = path.resolve(__dirname, '../../desing-system');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    envPrefix: 'BACKOFFICE_',
    server: {
        allowedHosts: ['app.backoffice.local'],
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), designSystemRoot]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'styled-system': path.resolve(__dirname, './styled-system')
        },
        // The linked package has no node_modules of its own: resolve React from the app
        dedupe: ['react', 'react-dom']
    }
});
