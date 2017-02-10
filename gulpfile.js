var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Concatenate and minify scripts in the src directory
gulp.task('scripts', function() {
	return gulp.src('./src/*.js')
	.pipe(concat('build.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build'))
});

// Watch any changes in the src directory
gulp.task('watch', function() {
	gulp.watch('./src/*js', ['scripts']);
});


// Set the default gulp task to "watch"
gulp.task('default', ['watch']);