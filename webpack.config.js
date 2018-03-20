var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
const args = require('minimist')(process.argv.slice(2));
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin('css/[name].css', {
    allChunks: true,
});


let env = 'dev';
if (args.env) {
    env = args.env;
}

const files = [""];

const base = {
    entry: {
        main: './src/js/main.js',
    },
    output: {
        path: require("path").resolve("./public/"),
        filename: "js/[name].js",
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        extractSass
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                enforce: 'pre',
                loader: 'import-glob-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['env'],
                            plugins: ['transform-es2015-shorthand-properties'],
                            cacheDirectory: true
                        }
                    }
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                js: 'babel-loader'
                            }

                            // vue-loader options go here
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    }
};


if (env === 'dev') {
    base.devtool = "source-map";
    base.devServer = {inline: true};
}


if (env === 'prod') {
    base.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    base.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {warnings: false}
    }));

    base.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true
    }));

}

module.exports = base;
