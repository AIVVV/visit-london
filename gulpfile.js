// Define all gulp variables witch is needed
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoPrefixer = require('gulp-autoprefixer');

// Source paths for input and output the files
var SOURCEPATHS = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*html'
};
var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
};

// Creating all tesk we need here 

// 1. Gulp sass compiler task
gulp.task('sass', function() {
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoPrefixer())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

// 2. Copy task - this task is for creating copies of html files form srs folder to app folder.
gulp.task('copy', function() {
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
})

// 3. Browser sync task - this task is for automaticly update all changes in css, html and js files. Also create a localhost path and automaticly added in browser.
gulp.task('serve', ['sass'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    })
});

// 3. Gulp watch task - this task is for looking if there any changes in scss or js files. If there are the watch task automaticly updated and refreshed in browser
gulp.task('watch', ['serve', 'sass', 'copy'], function() {
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
    gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
})

// N. Gulp default task
gulp.task('default', ['watch']);
