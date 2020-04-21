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
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:react/recommended'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/camelcase': 'off', // Needed due to snake casing in protos
        '@typescript-eslint/explicit-function-return-type': 'off', // Ignore for use with function components
        '@typescript-eslint/no-unused-vars': ['error', { 
            "argsIgnorePattern": "^_" 
        }]
    }
};
