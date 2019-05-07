"use strict";

var gulp   = require('gulp'),
watch      = require('gulp-watch'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
sourcemaps = require('gulp-sourcemaps'),
prefixer = require('gulp-autoprefixer'),
mqpacker   = require('css-mqpacker'),
cssmin = require('gulp-minify-css'),
babel = require('gulp-babel'),
sortCSSmq  = require('sort-css-media-queries'),
autopolyfiller = require('gulp-autopolyfiller'),
merge = require('event-stream').merge;

var path = {
  dist: {
    jsDir: 'dist/js/',
    cssDir: 'dist/css/',
  },
  src: {
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.css',
  },
  watch: {
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.css',
  }
};

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.jsDir))
});
