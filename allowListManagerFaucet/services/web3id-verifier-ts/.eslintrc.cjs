module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: {
                    attributes: false,
                },
            },
        ],
    },
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
