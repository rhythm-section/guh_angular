(function () {
  'use strict';

  module.exports = function(grunt) {

    // Load grunt tasks automatically.
    require('load-grunt-tasks')(grunt);

    // Show time how long grunt tasks take to run
    require('time-grunt')(grunt);

    grunt.initConfig({

      // Project settings
      config:  {
        path: {
          bower: {
            root: 'bower_components/'
          },
          src: {
            root: 'src/'
          },
          temp: {
            root: 'temp/'
          },
          app: {
            root: 'app/'
          }
        }
      },

      clean: {
        build: {
          options: {
            force: true
          },
          files: [{
            dot: true,
            src: [
              '<%= config.path.temp.root %>',
              '<%= config.path.app.root %>',
              '.sass-cache',
              '../guh_rails/public/'
            ]
          }]
        }
      },

      copy: {
        build: {
          files: [{
            expand: true,
            cwd: '<%= config.path.src.root %>/',
            src: ['**/*', '!**/*.{scss,png,jpg,gif}', '!lib/sass'],
            dest: '<%= config.path.app.root %>/'
          }]
        },
        rails: {
          files: [{
            expand: true,
            cwd: '<%= config.path.app.root %>/',
            src: ['**/*', '!**/*.{scss,png,jpg,gif}', '!lib/sass'],
            dest: '../guh_rails/public/'
          }]
        }
      },

      sass: {
        options: {
          lineNumbers: true,
          loadPath: [
            require('node-bourbon').includePaths,
            '<%= config.path.src.root %>/lib/sass/',
            '<%= config.path.bower.root %>/reset-scss/'
          ],
          precision: 6,
          quiet: true              // added to get rid of SASS 3.3 warnings => remove
          // sourcemap: true,
          // style: 'nested'
        },
        build: {
          files: [{
            expand: true,
            cwd: '<%= config.path.src.root %>/',
            src: ['**/*.scss'],
            dest: '<%= config.path.temp.root %>/',
            ext: '.css'
          }]
        }
      },

      cssmin: {
        build: {
          files: [{
            expand: true,
            cwd: '<%= config.path.temp.root %>/',
            src: '**/*.css',
            dest: '<%= config.path.app.root %>/',
            ext: '.min.css'
          }]
        }
      },

      'bower-install-simple': {
        options: {
          color: true,
          production: false
        }
      },

      jshint: {
        watch: ['Gruntfile.js', 'karma.js', 'src/**/*.js', '!src/lib/**/*.js']
      },

      watch: {
        rails: {
          files: ['Gruntfile.js', 'karma.js', '<%= config.path.src.root %>/**/*'],
          tasks: ['clean', 'sass', 'cssmin', 'copy', 'jshint']
        }
      }

    });

    grunt.registerTask('build', [
      'clean',
      'sass',
      'cssmin',
      'copy',
      'bower-install-simple'
    ]);

    grunt.registerTask('dev', [
      'watch:rails'
    ]);

  };

}());