
// var gulp = require('gulp');
// var $    = require('gulp-load-plugins')();

// gulp.task('default', ['sass'], function() {
//     gulp.watch(['scss/**/*.scss'], ['sass']);
// });
var gulp = require('gulp'), /* require method is provided by Node */
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({ /* configurations for browserSync */
        notify: false, /* removes notifications in upper right corner */
        server: {
            baseDir: 'src' /* what folder to show in browser */
        }
    });

    watch('./src/index.html', function() { /* watches file specified for changes */
        // gulp.start('html');
        // return gulp.src('./src/index.html')
        //     .pipe(browserSync.stream());
        browserSync.reload();
    });

    // watch('./src/scss/**/*.scss', function() { /* watches file specified for changes */
    //     // gulp.start('styles');
    //     gulp.start('cssInject');
    // });

    // watch('./src/scss/**/*.scss', function() { /* watches file specified for changes */
    watch('./src/scss/**/*.scss', gulp.series('sass', 'cssInject'));

    // watch('./src/js/**/*.js', gulp.series('scripts', 'scriptsRefresh'));
    watch('./src/js/**/*.js', gulp.series('js', 'scriptsRefresh'));

});

gulp.task('preview', function() {

    browserSync.init({ /* configurations for browserSync */
        notify: false, /* removes notifications in upper right corner */
        server: {
            baseDir: 'src' /* what folder to show in browser */
        }
    });
});

// gulp.task('cssInject', ['sass'], function() { /* update browserSync after css files finished compiling */
gulp.task('cssInject', function() { /* update browserSync after css files finished compiling */
    // return gulp.src('./src/temp/css/app.css') 
    //     .pipe(browserSync.stream());
    browserSync.reload();
});

// gulp.task('scriptsRefresh', ['scripts'], function() { /* update browserSync after js files finished compiling */
gulp.task('scriptsRefresh', function() { /* update browserSync after js files finished compiling */
    browserSync.reload();
});

gulp.task('default', gulp.series('watch'));