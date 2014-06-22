'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // require('time-grunt')(grunt);


  // Define configuration for all the tasks.
  grunt.initConfig({

    // automatically inject bower components into the app
    // bowerInstall: {
    //   app: {
    //     src: [
    //       'app/app.html'
    //     ]
    //   }
    // },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          base: 'app/'/*,
          keepalive: true*/
        }
      }
    },

    // empty folders to start fresh
    clean: {
      app: {
        files: [{
          dot: true,
          src: [
            '.sass-cache',
            '.tmp',
            'app'
          ]
        }]
      },

      rails: {
        options: {
          force: true
        },

        files: [{
          dot: true,
          src: [
            '../guh_rails/public/**/*'
          ]
        }]
      }
    },

    // copy files and folders
    copy: {
      app: {
        files: [{
          expand: true,
          cwd: 'src/app/',
          src: ['**/*', '!**/*.{scss,png,jpg,gif}'],
          dest: 'app/'
        }]
      },

      rails: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['**/*'],
          dest: '../guh_rails/public/'
        }]
      }
    },

    // compile sass to css
    sass: {
      options: {
        sourcemap: true,
        style: 'nested',
        precision: 6,
        quiet: true,              // just added to get rid of SASS 3.3 warnings => remove
        lineNumbers: true,
        loadPath: [
          require('node-bourbon').includePaths,
          'src/app/components/lib/styles/',
          'src/app/bower_components/reset-scss/'
        ]
      },
      tmp: {
        files: [{
          expand: true,
          cwd: 'src/app/',
          src: ['**/*.scss'],
          dest: '.tmp/',
          ext: '.css'
        }]
      }
    },

    // minify css
    cssmin: {
      app: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: ['**/*.css', '**/*.min.css'],
          dest: 'app/',
          ext: '.min.css'
        }]
      }
    },

    // minify images
    imagemin: {
      app: {
        files: [{
          expand: true,
          cwd: 'src/app/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'app/'
        }]
      }
    },

    // svg icon sprite
    // grunticon: {
    //   app: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src/app/components/lib/images/icons/',
    //       src: ['*.svg'],
    //       dest: 'app/components/lib/images/icons/'
    //     }],
    //     options: {
    //       datasvgcss: 'icons.svg.css',
    //       datapngcss: 'icons.png.css',
    //       previewhtml: 'icon-preview.html'
    //     }
    //   }
    // },

    // karma: {
    //   unit: {
    //     configFile: 'karma.conf.js',
    //     background: true
    //   }
    // },

    watch: {
      // karma: {
      //   files: ['src/app/**/*.js'],
      //   tasks: ['karma:unit:run']
      // },

      sass: {
        files: ['src/app/**/*.scss'],
        tasks: ['sass', 'cssmin']
      },

      imagemin: {
        files: ['src/app/**/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      },

      copy: {
        files: ['src/app/**/*.html'],
        tasks: ['copy']
      },

      rails: {
        files: ['src/app/**/*'],
        tasks: ['clean', 'copy', 'sass', 'cssmin', /*'imagemin',*/ 'rails']
      }
    }

  });

  // Register task
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('build', ['clean:app', 'copy:app', 'sass', 'cssmin'/*, 'imagemin', 'karma:unit'*/]);
  grunt.registerTask('serve', ['watch:rails']);

  // grunt.registerTask('rails', ['clean', 'copy', 'sass', 'cssmin', 'imagemin', 'clean:rails', 'copy:rails']);
  grunt.registerTask('rails', ['clean:rails', 'copy:rails']);
};
