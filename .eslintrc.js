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
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    rules: {
        "@typescript-eslint/prefer-namespace-keyword": "off"
    }
};
