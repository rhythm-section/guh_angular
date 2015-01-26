// General
var src = './src';
var dest =  './build';
var config = './config';
var rails = './../guh_rails/public';

// Task: styles
var bourbon = require('node-bourbon');

module.exports = {
  browserSync: {
    files: [
      '!' + dest + '/assets/fonts/**/*',
      '!' + dest + '/sourcemaps/*.map'
    ],
    open: false,
    port: 1234,
    proxy: "localhost:3000",
    // server: {
    //   baseDir: [dest]
    // }
  },
  general: {
    src: src,
    dest: dest,
    config: config
  },
  copyBuild: {
    src: src + '/**/*.{scss,js,html,eot,ttf,woff,woff2,svg,png,jpg,jpeg,gif}',
    dest: dest
  },
  copyRails: {
    src: dest + '/**/*',
    dest: rails
  },
  markup: {
    src: src + '/**/*.html',
    dest: dest
  },
  scripts: {
    src: [
      // Components: Services
      src + '/components/services/api/api.js',
      src + '/components/services/api/*.js',
      src + '/components/services/models/models.js',
      src + '/components/services/models/*.js',

      // Components: Directives
      src + '/components/directives/ui.js',
      src + '/components/directives/**/*.js',

      // App
      src + '/app/app.js',
      src + '/app/app-controller.js',

      // App: Devices
      src + '/app/devices/devices.js',
      src + '/app/devices/**/*.js',

      // App: Rules
      src + '/app/rules/rules.js',
      src + '/app/rules/**/*.js',
    ],
    dest: dest
  },
  styles: {
    src: src + '/**/*.scss',
    srcMain: src + '/app/app.scss',
    dest: dest,
    settings: {
      errLogToConsole: true,
      includePaths: bourbon.includePaths
    }
  }
};