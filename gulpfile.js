var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pleeease = require('gulp-pleeease');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var plumber = require("gulp-plumber");

// Sass

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true})) // Keep running gulp even though occurred compile error
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('content/2016ResasAPI/css'))
        .pipe(reload({stream:true}));
});


// Static server

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "content/2016ResasAPI", //　Target directory
            index  : "index.html" // index file
        }
    });
});

// Reload all browsers

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Task for `gulp` command

gulp.task('default',['browser-sync', 'sass'], function() {
    gulp.watch('sass/**/*.scss',['sass']);
    gulp.watch("./*.html", ['bs-reload']);
});
