// Define all gulp variables witch is needed
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Source paths for input and output the files
var SOURCEPATHS = {
    sassSource: 'src/scss/*.scss'
};
var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
};

// Creatin all tesk we need here 
// 1. Gulp sass compiler task
gulp.task('sass', function() {
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

// 2. Browser sync task - this task is for automaticly update all changes in css, html and js files. Also create a localhost path and automaticly added in browser.
gulp.task('serve', ['sass'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    })
});

// 3. Gulp watch task - this task is for looking if there any changes in scss or js files. If there are the watch task automaticly updated and refreshed in browser
gulp.task('watch', ['serve', 'sass'], function() {
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
})

// N. Gulp default task
gulp.task('default', ['watch']);
