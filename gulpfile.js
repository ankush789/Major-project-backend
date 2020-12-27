const gulp = require('gulp');
const sass = require('gulp-sass');

const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

gulp.task('css',function(){
    console.log('minifying css..');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass()) //sass to css conversion
    .pipe(cssnano()) //compressing
    .pipe(gulp.dest('./assets/css')); //destination 

    return gulp.src('./assets/**/*.css')
    .pipe(rev()) //renaming - which attaches hash to the filename
    .pipe(gulp.dest('./public/assets'))
    //manifest file -> it stores the map of original file name to the new renamed file name
    //so that every time an ejs file is loaded it can have the required css from the manifest
    .pipe(rev.manifest({ 
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});