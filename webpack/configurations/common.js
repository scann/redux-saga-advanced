// Presets
import { source, build } from '../paths';

// Plugins
import { DefinePlugin, ContextReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

export const generateCommonConfiguration = () => {
    const BUILD_ENV = process.env.BUILD_ENV;
    const REPOSITORY_NAME = process.env.REPOSITORY_NAME;

    return {
        entry: {
            source,
            // ? Фикс периодического дисконнекта devserver. Убрать после перехода на webpack-serve
            client: 'webpack-dev-server/client?http://localhost:3000',
        },
        output: {
            path:       build,
            publicPath: '/',
        },
        resolve: {
            extensions: [
                '.mjs',
                '.js',
                '.json',
                '.css',
                '.m.css',
                '.png',
                '.jpg'
            ],
            modules: [source, 'node_modules'],
        },
        optimization: {
            nodeEnv: process.env.NODE_ENV,
        },
        module: {
            rules: [
                {
                    test:    /\.m?js$/,
                    include: source,
                    use:     'babel-loader',
                },
                {
                    test:    /\.eot|ttf|woff2?(\?v=\d+\.\d+\.\d+)?$/,
                    include: source,
                    use:     {
                        loader:  'file-loader',
                        options: {
                            name:       'fonts/[name].[hash:5].[ext]',
                            publicPath: REPOSITORY_NAME
                                ? `/${process.env.REPOSITORY_NAME}/`
                                : '',
                        },
                    },
                },
                {
                    test:    /\.jpe?g|png|svg$/,
                    include: source,
                    use:     {
                        loader:  'file-loader',
                        options: {
                            name:       'images/[name].[hash:5].[ext]',
                            publicPath: REPOSITORY_NAME
                                ? `/${process.env.REPOSITORY_NAME}/`
                                : '',
                        },
                    },
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject:   false,
                template: HtmlWebpackTemplate,
                title:    'Redux saga mechanics',
                meta:     [
                    {
                        name:    'viewport',
                        content:
                            'user-scalable=no, width=device-width, initial-scale=1',
                    }
                ],
                appMountIds: ['app', 'spinner'],
            }),
            new FaviconsWebpackPlugin('./source/theme/assets/favicon.png'),
            new ContextReplacementPlugin(/moment\/locale$/, /ru/),
            new DefinePlugin({
                __ENV__:  JSON.stringify(BUILD_ENV),
                __DEV__:  BUILD_ENV === 'development',
                __PROD__: BUILD_ENV === 'production',
            })
        ],
    };
};
