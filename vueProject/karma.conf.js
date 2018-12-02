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
        //{pattern:'./src',watch:true}
      ],
      reporters: ["progress"],
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        //'karma-sourcemap-loader',这两个先不装
        //'karma-webpack'
      ]
    });
};