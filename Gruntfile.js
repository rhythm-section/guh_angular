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
          dist: {
            root: 'dist/'
          },
          rails: {
            root: '../guh_rails'
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
              '<%= config.path.dist.root %>',
              '.sass-cache',
              '<%= config.path.rails.root %>/public/'
            ]
          }]
        }
      },

      copy: {
        build: {
          files: [{
            expand: true,
            cwd: '<%= config.path.src.root %>/',
            src: ['**/*', '!**/*.{scss,png,jpg,gif}', '!app/shared/sass'],
            dest: '<%= config.path.dist.root %>/'
          }]
        },
        bower: {
          files: [{
            expand: true,
            cwd: '<%= config.path.bower.root %>/',
            src: '**/*',
            dest: '<%= config.path.dist.root %>/assets/lib/'
          }]
        },
        rails: {
          files: [{
            expand: true,
            cwd: '<%= config.path.dist.root %>/',
            src: ['**/*', '!**/*.{scss,png,jpg,gif}', '!app/shared/sass'],
            dest: '<%= config.path.rails.root %>/public/'
          }]
        },
      },

      // scp: {
      //   options: {
      //       host: '192.168.1.43',
      //       username: 'root',
      //       password: 'guh',
      //       readyTimeout: 30000
      //   },
      //   rails: {
      //     files: [{
      //       expand: true,
      //       cwd: '<%= config.path.app.root %>/',
      //       src: ['**/*', '!**/*.{scss,png,jpg,gif}', '!lib/sass'],
      //       dest: '../opt/guh-web-build/guh_rails/public/'
      //     }]
      //   }
      // },

      // livereload: {
      //   options: {
      //     livereload: true
      //   },
      //   files: ['app/index.html']
      // },

      sass: {
        options: {
          lineNumbers: true,
          loadPath: [
            require('node-bourbon').includePaths,
            '<%= config.path.src.root %>/app/shared/sass/',
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
            dest: '<%= config.path.dist.root %>/',
            ext: '.min.css'
          }]
        }
      },

      jshint: {
        watch: ['Gruntfile.js', 'karma.js', 'src/**/*.js']
      },

      karma: {
        unit: {
          configFile: 'config/karma.js',
          background: true
        }
      },

      watch: {
        rails: {
          files: ['Gruntfile.js', 'karma.js', '<%= config.path.src.root %>/**/*'],
          tasks: [
            'clean',
            'sass',
            'cssmin',
            'copy',
            'jshint'
          ]
        },
        karma: {
          files: ['<%= config.path.src.root %>/**/*'],
          tasks: ['karma:unit:run']
        }
      }

      // connect: {
      //   server: {
      //     options: {
      //       hostname: '127.0.0.1',
      //       port: 9000,
      //       base: 'app/'
      //       // livereload: true
      //     }
      //   }
      // },

      // docular: {
      //   useHtml5Mode: true,
      //   docular_webapp_target: '/docs',
      //   showAngularDocs: true,
      //   showDocularDocs: true,
      //   examples: {},
      //   groups: []
      // }

    });

    grunt.registerTask('build', [
      'clean',
      'sass',
      'cssmin',
      'copy',
      'jshint',
      'karma'
    ]);

    grunt.registerTask('test', [
      'karma'
    ]);

    grunt.registerTask('dev', [
      'clean',
      'sass',
      'cssmin',
      'copy',
      'jshint',
      'watch:rails'
    ]);

  };

}());