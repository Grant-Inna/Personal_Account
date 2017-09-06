var gulp = require('gulp'),
    groupMedia = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    uncss = require('gulp-uncss');


gulp.task('autoprefixer', function() {
    return gulp.src('./app/assets/css/themes/night-city1.scss')
        .pipe(groupMedia())
        .pipe(sass().on('error', sass.logError)) // Turn scss file into css
        .pipe(autoprefixer({browsers: ['last 5 versions', '> 3%']}))
        .pipe(rename("app.css"))
        .pipe(gulp.dest('./app/assets/css/'));
});
gulp.task('minCss', function() {
    return gulp.src('./app/assets/css/night-city.css')
        .pipe(cleanCSS())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('watch_autoprefixer', function() {
    gulp.watch('./app/assets/css/themes/night-city.scss', ['autoprefixer'])
});
gulp.task('watch_min', function() {
    gulp.watch('./app/assets/css/themes/night-city.css', ['minCss'])
});


gulp.task('default', ['autoprefixer', 'minCss', 'watch_min', 'watch_autoprefixer']);

gulp.task('cssComb', function() {
    return gulp.src('./app/assets/css/night-city.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('uncss', function () {
    return gulp.src('./app/assets/css/night-city.css')
        .pipe(uncss({
            html: ['./app/*.html']
        }))
        .pipe(gulp.dest('./'));
});


