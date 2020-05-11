module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true
    },
    globals: {
        Buffer: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: "./tsconfig.json"
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-comments/recommended",
        "prettier/@typescript-eslint",
        "prettier"
    ],
    rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/camelcase': 'off', // Needed for protos
        '@typescript-eslint/explicit-function-return-type': 'off', // Ignore for use with function components
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    }
};
