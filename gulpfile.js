'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('compile', gulp.series(
  'clean:tmp',
  gulp.parallel(
    'html',
    'jade',
    'nunjucks',
    'markdown',
    'js',
    'ts',
    'coffee',
    'css',
    'less',
    'sass',
    'vendor'
  ),
  'inject:tmp'
));

gulp.task('watch', gulp.parallel(
  'watch:html',
  'watch:jade',
  'watch:nunjucks',
  'watch:markdown',
  'watch:js',
  'watch:ts',
  'watch:coffee',
  'watch:css',
  'watch:less',
  'watch:sass'
));

gulp.task('build', gulp.series(
  'compile',
  'clean:build',
  'compress',
  'inject:build'
));

gulp.task('serve', gulp.series(
  'compile',
  'browser-sync:tmp',
  'watch'
));

gulp.task('serve:nowatch', gulp.series(
  'compile',
  'browser-sync:tmp',
  'watch'
));

gulp.task('serve:build', gulp.series(
  'build',
  'browser-sync:build'
));

gulp.task('deploy', gulp.series(
  'build',
  'upload:build'
));

gulp.task('deploy:nobuild', gulp.series(
  'compile',
  'upload:tmp'
));
