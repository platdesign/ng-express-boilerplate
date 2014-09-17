var gulp = require('gulp');
var sequence = require('gulp-run-sequence');





gulp.task('build', ['js-build', 'styles-build', 'jade-build']);

gulp.task('dev', ['js-dev', 'styles-dev', 'jade-dev']);



