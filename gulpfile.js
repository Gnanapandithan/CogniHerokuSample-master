var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('inject', function() {

    var wiredep = require('wiredep').stream;
    var options = {
        directory: 'public/lib',
        bowerJson: require('./bower.json'),
        ignorePath: '../../public/'
    }

    var gulpInject = require('gulp-inject')
    var sources = gulp.src(['./public/js/*.js', './public/css/*.css'], { read: false });
    var optionsInject = {
        ignorePath: '/public/'
    }

    gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(gulpInject(sources, optionsInject))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('default', ['inject'], function() {
    nodemon({
            script: 'app.js',
            ext: 'js',
            env: {
                port: 8095
            },
            ignore: ['./node_modules/**', './bower_components/**']
        })
        .on('restart', function() {
            console.log('Restarted server')
        })
});