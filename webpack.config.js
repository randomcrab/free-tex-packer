var path = require('path');
var webpack = require('webpack');

var argv = require('optimist').argv;

var plugins = [];
plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
}));

var devtool = "source-map";
var output = "static/js/index.js";
var debug = true;

if(argv.mode == "build") {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: true,
        compress: {
            warnings: false
        }
    }));

    devtool = null;
    output = "dist/static/js/index.js";
    debug = false;
}

module.exports = {
    entry: [
        'babel-polyfill',
		'./src/client/index',
        'webpack-dev-server/client?http://localhost:4000'
    ],
    output: { filename: output },
    debug: debug,
    devtool: devtool,
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: 'babel-loader',
                query: {presets: ["react", "es2015", "stage-0"]}
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: 'babel-loader',
                query: { presets: ["es2015", "stage-0"] }
            },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(html|htm)$/, loader: 'dom' }
        ],
        noParse: /.*[\/\\]bin[\/\\].+\.js/
    },
    devServer: { contentBase: path.resolve(__dirname, "dist") },
    plugins: plugins
};