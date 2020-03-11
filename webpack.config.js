import path from 'path';
import webpack from 'webpack';

const featureFlags = require('dotenv').config({
    path: `${__dirname}/.env.feature-flags`,
});

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': featureFlags.parsed,
        }),
    ],
    entry: {
        auditor: './src/entrypoint_auditor.js',
        retailer: './src/entrypoint_retailer.js',
        factory: './src/entrypoint_factory.js',
        standardsBody: './src/entrypoint_standards_body.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
    },
    resolve: {
        alias: {
            App: path.resolve(__dirname, './src'),
        },
        extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader' },
            { test: /\.js$/, use: 'source-map-loader' },
        ],
    },
};
