var path = require("path");

module.exports = {
    entry: {
        main: ['./app/client/main.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "http://localhost:8080/assets/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
                include: path.join(__dirname, 'app/client')
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test:/\.(png|jpg|bmp)$/,
                loader: 'url?limit=8192'
            },
            {
                test: /\.(otf|woff|woff2)(\?.+)$/,
                loader: 'url?limit=8192'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    }
};