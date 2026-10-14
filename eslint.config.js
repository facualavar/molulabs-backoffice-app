import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist', 'node_modules', '.pnpm-store', '*.config.ts', 'styled-system']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            perfectionist.configs['recommended-natural']
        ],
        languageOptions: {
            globals: globals.browser
        },
        rules: {
            'perfectionist/sort-imports': 'off',
            // Prettier's sort-imports plugin owns the order of the imports and of their names
            'perfectionist/sort-named-imports': 'off',
            'no-console': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
        }
    }
]);
