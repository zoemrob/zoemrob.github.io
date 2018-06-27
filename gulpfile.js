"use strict";
const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    gutil = require('gulp-util'),
    sassRoot = './sass',
    jsRoot = './js';


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
