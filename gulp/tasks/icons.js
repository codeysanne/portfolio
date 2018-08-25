var gulp = require('gulp'), /* require method is provided by Node */
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    svg2png= require('gulp-svg2png');

var config = { /* gulp-svg-sprite config */
    shape: {
        // dimension: { // Set maximum dimensions
        //     maxWidth: 20,
        //     maxHeight: 20
        // },
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    };
                }
            },
            sprite: 'sprite.svg', /* renames sprite graphic file */
            render: {
                css: {
                    template: './gulp/template/sprite.css' /* points to css template for each graphic. provides width, height, and position */
                }
            }
        }
    }
};

/* deletes assets sprite folder. the eventual folder where the svg sprite will live*/
gulp.task('beginClean', function() { 
    return del('./src/assets/sprite');
});


/* createSprite depends on beginClean. beginClean must complete before createSprite */
/* creates SVG sprite from icons in icons folder and saves to temp*/

// gulp.task('createSprite', ['beginClean'], function() {  
gulp.task('createSvgSprite', function() {  
    return gulp.src('./src/assets/icons/**/*.svg') /* source is the icons folder in assets/icons  */
        .pipe(svgSprite(config)) /* gulp-svg-sprite config */
        .pipe(gulp.dest('./src/temp/sprite/')); /* destination folder is temp folder */
});


/* creates PNG version of SVG sprite and saves to temp*/

// gulp.task('createPngCopy', ['createSprite'], function() {
gulp.task('createPngSprite', function() {
    return gulp.src('./src/temp/sprite/css/*.svg') 
        .pipe(svg2png()) 
        .pipe(gulp.dest('./src/temp/sprite/css')); 
});


/* copies svg sprite from temp to assets. createSprite must complete before copySpriteGraphic */

// gulp.task('copySpriteGraphic', ['createPngCopy'], function() { 
gulp.task('copyAndMoveSprites', function() { 
    return gulp.src('./src/temp/sprite/css/*.{svg,png}') /* gets svg sprite from destination folder of createSprite */
        .pipe(gulp.dest('./src/assets/sprite/')); /* outputs to assets folder */
});


/* copies svg sprite CSS from temp to assets. createSprite must complete before copySpriteCSS */

// gulp.task('copySpriteCSS', ['createSprite'], function() { 
gulp.task('copyAndMoveSpritesCSS', function() { 
    return gulp.src('./src/temp/sprite/css/*.css') /* gets svg sprite CSS from destination folder of createSprite */
        .pipe(rename('_sprite.scss')) /* rename to fit partial naming convention */
        .pipe(gulp.dest('./src/scss/modules/')); /* outputs to css modules */
});


/* deletes temp folder after svg graphic and CSS copied to assets folder */

// gulp.task('finishClean', ['copySpriteGraphic', 'copySpriteCSS'], function() { 
gulp.task('finishClean', function() { 
// gulp.task('finishClean', function() { /* deletes temp folder after svg graphic and CSS copied to assets folder */
    return del('./src/temp/sprite'); 
});

/* the ultimate task of sprite.js - the one used in terminal */
// gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'finishClean']);
gulp.task('icons', gulp.series('beginClean', 'createSvgSprite', 'createPngSprite', gulp.parallel('copyAndMoveSprites', 'copyAndMoveSpritesCSS'), 'finishClean'));