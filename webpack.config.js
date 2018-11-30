const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'AWS EC2 Watcher',
            hash: true,
            filename: path.join(__dirname, 'dist', 'index.html')
        })
    ],
    externals: {
        fs: 'commonjs fs',
        path: 'commonjs path',
        os: 'commonjs os',
        electron: 'commonjs electron',
    }
}