'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rirmaf = require('rimraf');

var lib = 'lib/**/*.js';
var index = 'index.js';

gulp.task('coverage', function() {
  return gulp.src(lib)
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire());
});

gulp.task('coverage:clean', function(callback) {
  rirmaf('coverage', callback);
});

gulp.task('mocha', gulp.series('coverage'), function() {
  return gulp.src('test/index.js')
    .pipe($.mocha({
      reporter: 'spec'
    }))
    .pipe($.istanbul.writeReports());
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.formatEach('compact', process.stderr));
});

gulp.task('watch', function() {
  gulp.watch([lib, index], gulp.series(['mocha', 'eslint']));
  gulp.watch(['test/index.js'], gulp.series(['mocha']));
});

gulp.task('test', gulp.series(['mocha', 'eslint']));
