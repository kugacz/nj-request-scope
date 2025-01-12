import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import love from 'eslint-config-love';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, love, eslintConfigPrettier, {
    files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    rules: {
        'eslint-comments/require-description': ['off'],
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
            },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
            'error',
            {
                allowNullableObject: true,
                allowAny: true,
            },
        ],
    },
    languageOptions: {
        parserOptions: {
            project: './tsconfig.json',
        },
    },
});
