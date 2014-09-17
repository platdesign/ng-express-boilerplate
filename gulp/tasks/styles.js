var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var lazypipe = require('lazypipe');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');


var src = global.gulp.basepath + '/src/scss/**/*.scss';
var dest = global.gulp.basepath + '/build/css';


var compile = function(){

	var task = lazypipe()
		.pipe(sass)
		.pipe(autoprefixer, "last 2 versions", "> 1%", "ie 8")
	;
	return task();

};




gulp.task('styles-clean', function(){
	return gulp.src(dest).pipe(clean());
});

gulp.task('styles-dev', ['styles-clean'], function() {
	livereload.listen();
	return gulp.src(src)
		.pipe( compile() )
		.pipe( gulp.dest(dest) )
		.pipe( watch(src, function(stream){
			return stream
				.pipe( compile() )
				.pipe( gulp.dest(dest) )
				.pipe( livereload({ auto: false }) );
		}) );

});

gulp.task('styles-build', ['styles-clean'], function() {

	return gulp.src(src)
		.pipe( compile() )
		.pipe( minifyCSS() )
		.pipe( gulp.dest(dest) );

});

