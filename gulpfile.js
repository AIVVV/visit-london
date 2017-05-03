var gulp = require('gulp');
var sass = require('gulp-sass');

// Creatin all tesk we need here 
// 1. Gulp sass compiler task
gulp.task('sass', function() {
    return gulp.src('src/scss/app.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});
// N. Gulp default task
gulp.task('default', ['sass']);
