var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('compile', gulp.series(
  'clean:tmp',
  gulp.parallel(
    'html',
    'js',
    'css',
    'less',
    'sass',
    'vendor'
  ),
  'inject:tmp'
));

gulp.task('watch', gulp.parallel(
  'watch:html',
  'watch:js',
  'watch:css',
  'watch:less',
  'watch:sass'
));

gulp.task('serve', gulp.series(
  'compile',
  'watch'
));

gulp.task('build', gulp.series(
  'compile',
  'clean:build',
  'compress',
  'inject:build'
));

gulp.task('deploy', gulp.series(
  'build',
  'upload:build'
));
