var gulp 		= require('gulp');
var sequence 	= require('gulp-run-sequence');
var watch		= require('gulp-watch');
var uglify 		= require('gulp-uglify');
var jshint 		= require('gulp-jshint');
var stylish 	= require('jshint-stylish');
var browserify 	= require('gulp-browserify');
var ignore 		= require('gulp-ignore');
var notify 		= require("gulp-notify");
var jsInclude 	= require('gulp-js-include');
var lazypipe 	= require('lazypipe');
var clean 		= require('gulp-clean');


var errorHandler = function(error) {
	console.error(error.message);
	var args = Array.prototype.slice.call(arguments);

	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};



var src = global.gulp.basepath + '/src/js/**/*.js';
var dest = global.gulp.basepath + '/build/js';






var compile = function() {
	var task = lazypipe()
		.pipe( ignore.exclude, '**/_*.js' )
		.pipe( jsInclude )
		.pipe(browserify, {
			insertGlobals : false,
			debug : false
		})
	;
	return task();
};


gulp.task('js-clean', function(){
	return gulp.src(dest).pipe(clean());
});

gulp.task('js-dev', ['js-clean'], function(){

	return gulp.src( src )
		.pipe(compile())
		.on('error', errorHandler)
		.pipe( gulp.dest( dest ))
		.pipe( watch(src, function(){

			gulp.src(src)
				.pipe( jshint() )
				.pipe( jshint.reporter(stylish) )
				.pipe(compile())
				.on('error', errorHandler)
				.pipe( gulp.dest( dest ));

		}))

	;

});


gulp.task('js-build', ['js-clean'], function(){

	return gulp.src( src )
		.pipe( jshint() )
		.pipe( jshint.reporter(stylish) )
		.pipe(compile())
		.on('error', errorHandler)
		.pipe(uglify())
		.pipe( gulp.dest( dest ));

});





