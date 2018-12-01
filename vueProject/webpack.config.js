const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const devSeverConfig = require('./webpack.devServer.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    mode:"development",
    devtool:'cheap-module-eval-source-map',
    entry:{
        app:path.join(__dirname,'app.js'),
    },
    output:{
        path:path.join(__dirname,'build'),
        filename:'[name].[hash:7].js'
    },
    module:{
        rules:[
            {
                 test:/\.js$/,
                 exclude:/node_modules/,
                 use:'babel-loader'
            },
            {test:/\.vue$/,use:'vue-loader'},
            {
                test:/\.(jpg|JPG)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:50000,
                        name:'img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test:/\.(ttf|woff)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:50000,
                        name:'webFont/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test:/\.css$/,
                use:[
                     {
                         loader:MiniCssExtractPlugin.loader
                     },
                    "css-loader"
                ]
            },
            {
                test:/\.scss$/,
                use:'sass-loader'
            },
            {
                test:/\.txt$/,
                use:[
                    {
                        loader:path.resolve(__dirname,'myLoader','myLoader.js')
                    }
                ]
            }
        ]
    },
    // devServer: {
    //     contentBase:path.join(__dirname,'bulid'),
    //     port:9000
    // },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name].[hash:7].css'
        }),
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{
        alias:{
            com:path.resolve(__dirname,'./src/component'),
            pic:path.resolve(__dirname,'./static/img')
        }
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i
        })],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
      }
}

Object.assign(module.exports,devSeverConfig);
// Object.assign(config,devSeverConfig);
// console.log(process.env.NODE_ENV);
// webpack(config,(err,stat) => {
//     console.log(process.env.NODE_ENV);
// });