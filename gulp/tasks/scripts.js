var gulp = require('gulp'), /* require method is provided by Node */
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

gulp.task('js', function() { /* bc a stream (function chain with pipe method) is not returned, you pass callback as an argument to let gulp know the task does not return a stream AND when the task is complete by calling the callback function (callback()) */
// gulp.task('scripts', function(callback) { /* bc a stream (function chain with pipe method) is not returned, you pass callback as an argument to let gulp know the task does not return a stream AND when the task is complete by calling the callback function (callback()) */
    // webpack(require('../../../webpack.config'), function(err, stats) { 
    // webpack(require('../../webpack.config'), function(err, stats) { 
    //     if (err) {
    //         console.log(err.toString());
    //     }
    //     console.log(stats.toString());
    //     callback();
    // });
    return gulp.src('./src/js/main.js')
        .pipe(webpackStream({
            // watch: true,
            entry: {
                main: './src/js/main.js',
                vendor: './src/js/vendor.js'
            },
            output: {
                // path: path.resolve(__dirname, 'src/temp/js'),
                filename: '[name].js'
            },
            module: {
                rules: [ /* loaders are used for transforming */
                    {
                        test: /\.js$/, /* condition for file transformation */
                        exclude: /(node_modules|bower_components)/, /* prevents transforming js files in node_modules */
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }   
                        }
                    }
                ]
            }
        }, webpack))
        .pipe(gulp.dest('src/temp/js'));
});

gulp.task('scripts', gulp.series('modernizr', 'js'));
// gulp.task('scripts', gulp.series('modernizr', 'js'), function() {
    
// });
