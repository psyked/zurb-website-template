module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                includePaths: ['components/foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                options: { livereload: true },
                files: 'scss/**/*.scss',
                tasks: ['sass']
            },

            html: {
                options: { livereload: true },
                files: '**/*.html'
            },

            js: {
                options: { livereload: true },
                files: 'js-source/**/*.js',
                tasks: ['uglify']
            }
        },

        open: {
            server: {
                path: 'http://localhost:9000'
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: "*",
                    base: "./",
                    middleware: function (connect, options) {
                        var path = require('path');
                        return [
                            require('connect-livereload')(),
                            connect.static(path.resolve('.'))
                        ];
                    }
                }
            }
        },

        uglify: {
            js: {
                options: {
                    sourceMap: 'js/app.js.map'
                },
                files: {
                    'js/app.js': ['js-source/app.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['sass', 'uglify']);
    grunt.registerTask('default', ['build', 'connect', 'open', 'watch']);
}