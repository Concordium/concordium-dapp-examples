module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.*', '.pnp.*', '.yarn', '__generated__'],
    parser: '@typescript-eslint/parser',
    plugins: ['react'],
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
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/test/*', '**/*.config.*', '**/scripts/*'],
            },
        ],
        '@typescript-eslint/consistent-type-definitions': 0,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./voting/tsconfig.json', './voting/tsconfig.node.json'],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                project: ['./voting/tsconfig.json'],
            },
            node: {
                project: ['./voting/tsconfig.json'],
            },
        },
    },
};
