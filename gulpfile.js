var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var babel = require('babel-register');

gulp.task('test', function () {
  return gulp.src(['test/**/*.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec',
        compilers: ['js:babel-core/register']
      }))
      .on('error', util.log);
});

gulp.task('watch-test', function () {
  gulp.watch(['lib/**', 'test/**'], ['test']);
});

gulp.task('docs', function() {

});

gulp.task('watch-docs', function () {
  gulp.watch(['lib/**', 'test/**'], ['docs']);
});