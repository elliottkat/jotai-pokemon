/* eslint @typescript-eslint/no-var-requires: "off" */
import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists

module.exports = (env: any) => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev: { [index: string]: any }, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: 
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        }
                    },
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],                    
                }
            ],
        },
        devtool: "source-map",
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[contenthash].bundle.js',
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                async: false,
                eslint: {
                    files: './src/**/*.{ts,tsx,js,jsx}',
                },
            }),
            new HtmlWebpackPlugin({
                title: 'Software Defined Opportunity Engine',
                template: path.resolve(__dirname, 'index.html'),
                filename: 'index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [{ from: path.resolve(__dirname, 'src/assets/images'), to: 'images' }],
            }),
            new CopyWebpackPlugin({
                patterns: [{ from: path.resolve(__dirname, 'src/assets/sdoefiles'), to: 'sdoefiles' }],
            }),
            new webpack.DefinePlugin(envKeys),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '0.0.0.0',
            port: 8081,
            publicPath: '/',
            historyApiFallback: true,
            https: true,
        },
    };
};