var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var connect = require('gulp-connect');
var rev = require('gulp-rev');
var useminp = require('gulp-usemin');

gulp.task('less', function() {
    gulp.src('./src/static/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./src/static/css'))
        .pipe(connect.reload())
})

gulp.task('mergeLib', function() {
    gulp.src('./src/static/lib/*.js')
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./src/static/lib/build/'))
})

gulp.task('moveLib', function() {
    gulp.src('./src/static/lib/build/lib.js')
        .pipe(gulp.dest('./dist/static/lib/build'))
})

gulp.task('server', function() {
    connect.server({
        roop: 'src',
        port: 8090,
        livereload: true
    })
})

gulp.task('build', ['moveLib'], function() {
    gulp.src('./src/*.html')
        .pipe(usemin({
            js: [uglify, rev],
            css: [minifyCss, rev],
            html: [minifyHtml]
        }))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
    gulp.watch(['./src/static/js/*.js', './src/*.html'], function() {
        gulp.src('./src/*.html')
            .pipe(connect.reload())
    })
    gulp.watch('./src/static/less/*.less', ['less'])
})

gulp.task('default', ['less', 'mergeLib', 'server', 'watch'])