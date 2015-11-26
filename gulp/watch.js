'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('../config');
var helpers = require('./helpers');

gulp.task('browser-sync:tmp', function(cb) {
  browserSync.init({
    server: config.paths.tmp,
  }, cb);
});

gulp.task('browser-sync:build', function(cb) {
  browserSync.init({
    server: config.paths.dist,
  }, cb);
});

gulp.task('reload', function() {
  return browserSync.reload();
});

gulp.task('watch:html', function() {
  gulp.watch(helpers.src(config.paths.src, '.html'), gulp.series('html', 'inject:tmp', 'reload'));
});

gulp.task('watch:js', function() {
  gulp.watch(helpers.src(config.paths.src, '.js'), gulp.series('js', 'reload'));
});

gulp.task('watch:css', function() {
  gulp.watch(helpers.src(config.paths.src, '.css'), gulp.series('css', 'reload'));
});

gulp.task('watch:less', function() {
  gulp.watch(helpers.src(config.paths.src, '.less'), gulp.series('less', 'reload'));
});

gulp.task('watch:sass', function() {
  gulp.watch(helpers.src(config.paths.src, ['.sass', '.scss']), gulp.series('sass', 'reload'));
});
