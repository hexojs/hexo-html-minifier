'use strict';
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const rirmaf = require('rimraf');

const lib = 'lib/**/*.js';
const index = 'index.js';

gulp.task('coverage', () => {
  return gulp.src(lib)
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire());
});

gulp.task('coverage:clean', callback => {
  rirmaf('coverage', callback);
});

gulp.task('mocha', gulp.series('coverage'), () => {
  return gulp.src('test/index.js')
    .pipe($.mocha({
      reporter: 'spec'
    }))
    .pipe($.istanbul.writeReports());
});

gulp.task('eslint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.formatEach('compact', process.stderr));
});

gulp.task('watch', () => {
  gulp.watch([lib, index], gulp.series(['mocha', 'eslint']));
  gulp.watch(['test/index.js'], gulp.series(['mocha']));
});

gulp.task('test', gulp.series(['mocha', 'eslint']));
