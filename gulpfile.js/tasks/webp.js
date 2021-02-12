const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const webp = require('gulp-webp');
const changed = require('gulp-changed');

module.exports = () => (
  gulp.src('app/static/images/nd/**/*.{jpg, png}')
  .pipe(plumber({
    errorHandler: errorHandler('Error in webp task'),
  }))
  .pipe(changed('dist/assets/images/nd'))
  .pipe(webp({
    quality: 90,
    preset: 'photo',
    method: 6,
  }))
  .pipe(gulp.dest('dist/assets/images/nd'))
);
