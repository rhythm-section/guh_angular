// Karma configuration
// Generated on Mon Apr 28 2014 17:46:02 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/app/bower_components/angular/angular.min.js',
      'src/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'src/app/bower_components/restangular/dist/restangular.min.js',
      // 'src/app/**/*_test.js'
      // 'src/app/components/**/*_test.js',
      // 'src/app/devices/**/*_test.js',
      // 'src/app/home/**/*_test.js',
      // 'src/app/rules/**/*_test.js',
      // 'src/app/settings/**/*_test.js',
      'src/app/app.js',
      'src/app/app-controller.js',
      'src/app/app-controller_test.js'
    ],


    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],


    // list of files to exclude
    exclude: [
      '**/angular-scenario.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    hostname: 'localhost',


    // web server port
    port: 9876,


    // enable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // disable file watching because we are using grunt.js for this task
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
