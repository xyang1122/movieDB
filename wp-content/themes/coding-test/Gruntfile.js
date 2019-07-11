module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tasks
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'asset/partial/',
                    src: ['*.scss'],
                    dest: 'asset/',
                    ext: '.css'
                }]
            }
        },
        prefix_css: {
            options: {
                prefix: '.asset',
                fileSrc: 'asset/partial/*.scss',
                fileDest: 'asset/style.css',
                separator: '\n',
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'asset/style.css'
            }
        },
        cssmin: {
            // Begin CSS Minify Plugin
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'css',
                        ext: '.min.css',
                    },
                ],
            },
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: [
                    'asset/js/header.js',
                    'asset/js/homepage.js',
                    'asset/js/singlePage.js'
                ],
                dest: 'asset/js/script.js',
            }
        },
        uglify: {
            // Begin JS Uglify Plugin
            build: {
                src: ['src/*.js'],
                dest: 'js/script.min.js',
            },
        },
        watch: {
            sass: {
                files: ['asset/partial/*.scss'],
                tasks: ['sass:dist', 'postcss:dist', ]
            },
            scripts: {
                files: ['assets/src/scripts/**/*.js'],
                tasks: ['concat']
            }
        }
    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-prefix-css');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Register Grunt tasks
    grunt.registerTask('default', ['sass:dist', 'concat:dist', 'postcss:dist']);
};

