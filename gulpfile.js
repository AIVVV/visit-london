// Define all gulp variables witch is needed
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoPrefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');

// Object for source folder paths
var SOURCEPATHS = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*html',
    jsSource: 'src/js/**'
};

// Object for app folder paths
var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
};

// Creating all tesk we need here 

// Task for cleaning html files - If html file is deleted form src folder it will deleted for app folder too.
gulp.task('clean-html', function() {
    return gulp.src(APPPATH.root + '/*.html', { read: false, force: true })
        .pipe(clean());
});
// Task for cleaning js files - If html file is deleted form src folder it will deleted for app folder too.
gulp.task('clean-scripts', function() {
    return gulp.src(APPPATH.js + '/*.js', { read: false, force: true })
        .pipe(clean());
});

// 1. Gulp sass - This task is for compile scss files to css files
gulp.task('sass', function() {
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoPrefixer())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});
// 2. Copy task - this task is for creating copies of html files form srs folder to app folder.
gulp.task('scripts', ['clean-scripts'], function() {
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(gulp.dest(APPPATH.js));
})

// 3. Copy task - this task is for creating copies of html files form srs folder to app folder.
gulp.task('copy', ['clean-html'], function() {
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
})

// 4. Browser sync task - this task is for automaticly update all changes in css, html and js files. Also create a localhost path and automaticly added in browser.
gulp.task('serve', ['sass'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    })
});

// 5. Gulp watch task - this task is for looking if there any changes in scss or js files of html files. If there are the watch task automaticly updated and refreshed in browser.
gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts'], function() {
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
    gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
    gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
})

// N. Gulp default task
gulp.task('default', ['watch']);
