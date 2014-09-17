var gulp 	= require('gulp');
var ignore 	= require('gulp-ignore');
var	jade	= require('gulp-jade');
var watch	= require('gulp-watch');
var clean 	= require('gulp-clean');
var lazypipe 	= require('lazypipe');



var src = global.gulp.basepath + '/src/jade/**/*.jade';
var dest = global.gulp.basepath + '/build/html';



var compile = function() {
	var task = lazypipe()
		.pipe( ignore.exclude, '**/_*.jade' )
		.pipe( jade )
	;
	return task();
};




gulp.task('jade-clean', function(){
	return gulp.src(dest).pipe(clean());
});

gulp.task('jade-dev', ['jade-clean'], function() {

	return gulp.src(src)
		.pipe(compile())
		.pipe( gulp.dest(dest) )
		.pipe(watch(src, function(){
			return gulp.src(src)
				.pipe(compile())
				.pipe( gulp.dest(dest) );
		}))
	;

});


gulp.task('jade-build', ['jade-clean'], function() {

	return gulp.src(src)
		.pipe(compile())
		.pipe( gulp.dest(dest) );

});




