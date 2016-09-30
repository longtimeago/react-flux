const path = require('path');

const PATHS = {
    app: "./js/app",
    build: path.join(__dirname, 'build')
};

module.exports = {
    devtool: 'source-map',
    entry: {
        app: PATHS.app
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },{
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }

        ]
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    }
};
