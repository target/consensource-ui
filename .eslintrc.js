module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    globals: {
        Buffer: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['react-app', 'prettier'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/camelcase': 'off', // Needed for protos
        '@typescript-eslint/explicit-function-return-type': 'off', // Ignore for use with function components
    }
};
