module.exports = {
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    roots: ['./src'],
    clearMocks: true,
    setupFiles: ['jest-localstorage-mock'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
};
