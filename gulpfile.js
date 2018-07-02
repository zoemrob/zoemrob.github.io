"use strict";
const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    gutil = require('gulp-util'),
    sassRoot = './sass',
    jsRoot = './js',
    apiProjectRoot = './projects/api-project';


gulp.task('styles', function () {
    gulp.src(sassRoot + '/**/*.sass')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['styles'], function () {
    gulp.watch(sassRoot + '/**/*.sass', ['styles'])
        .on('change', browserSync.reload);
    browserSync.init({
        server: './'
    });
});

gulp.task('js', function() {
    return gulp.src(jsRoot + '/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error'), err.toString());
        })
        .pipe(gulp.dest('./dist'));
});

gulp.task('api-project', ['api-project-js'], function() {
    gulp.watch(apiProjectRoot + '/index.html').on('change', browserSync.reload);
    gulp.watch(apiProjectRoot + '/sass/**/*.sass', function() {
        gulp.src(apiProjectRoot + '/sass/**/*.sass')
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(gulp.dest(apiProjectRoot + '/dist'))
            .pipe(browserSync.stream());
    })
});

gulp.task('api-project-js', function() {
    return gulp.src(apiProjectRoot + '/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error'), err.toString())
        })
        .pipe(gulp.dest(apiProjectRoot + '/dist'))
});