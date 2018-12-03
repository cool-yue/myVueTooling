//const webpackConfig = require('./webpack.config.js');
//console.log("123123",webpackConfig);
const { VueLoaderPlugin } = require('vue-loader');
const webpackConfig = {
  mode:"development",
  module:{
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ]
 },
 plugins:[new VueLoaderPlugin()]
}





module.exports = function(config) {
    config.set({
      basePath: '',
      exclude:["node_modules"],
      frameworks: ['jasmine'],
      autoWatch:true,
      browsers:['Chrome'],
      color:true,
      files:[
        {pattern:'./src/test/unit/*.spec.js',watch:true},
        //{pattern:'./src/*.vue',watch:true}
      ],
      webpack:webpackConfig,
      reporters: ["spec"],
      preprocessors: {
         './src/test/unit/*.vue.spec.js': ["webpack"]
      },
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        "karma-spec-reporter",
        "karma-webpack"
        //'karma-sourcemap-loader',这两个先不装
        //'karma-webpack'
      ],
      // webpackMiddleware: {
      //   noInfo: true
      // }
    });
};