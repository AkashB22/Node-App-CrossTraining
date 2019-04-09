var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var sass = require('gulp-sass');

gulp.task('default', function(){
    console.log("gulp is running successfully");
});

gulp.task('watch',function(){
    var watcher = gulp.watch('routes/*.js');
    watcher.on('change', function(event){
        console.log('File :' + event.path + " was changed");
    });
});

gulp.task('uglify', function(){
    gulp.src('routes/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('routes1/'));
});

gulp.task('styles', function(){
    gulp.src('public/css1/style.css')
    .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
    .pipe(csso())
    .pipe(gulp.dest('public1/css'));
});