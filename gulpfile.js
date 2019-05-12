"use strict";

var gulp   = require('gulp'),
watch      = require('gulp-watch'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
sourcemaps = require('gulp-sourcemaps'),
postcss    = require('gulp-postcss'),
cleanCSS = require('gulp-clean-css'),
mqpacker   = require('css-mqpacker'),
sortCSSmq  = require('sort-css-media-queries'),
babel = require('gulp-babel'),
plumber = require('gulp-plumber'),
sortCSSmq  = require('sort-css-media-queries'),
streamqueue = require('streamqueue'),
rimraf     = require('rimraf');

var path = {
  dist: {
    distDir: 'dist/',
    jsDir: 'dist/js/',
    jsMain: 'main.js',
    cssDir: 'dist/css/',
    cssMain: 'main.css',
  },
  src: {
    jsExclude: ['assets/js/jquery.js'],
    js: ['assets/js/**/*.js', '!assets/js/jquery.js'],
    cssExclude: 'assets/css/single/*.css',
    css: ['assets/css/**/*.css', '!assets/css/single/*.css'],
  },
  watch: {
    js: 'assets/js/**/*.js',
    css: 'assets/css/**/*.css',
  }
};

var processors_dev = [
  mqpacker({
    sort: sortCSSmq.desktopFirst
  }),
]

gulp.task('js:dev', function () {
  return streamqueue({ objectMode: true },
    gulp.src(path.src.js)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat(path.dist.jsMain))
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(sourcemaps.write('.')),

    gulp.src(path.src.jsExclude)
  )
    .pipe(gulp.dest(path.dist.jsDir));
});

gulp.task('css:dev', function () {
  return streamqueue({ objectMode: true },
    gulp.src(path.src.css)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat(path.dist.cssMain))
      .pipe(postcss(processors_dev))
      .pipe(sourcemaps.write('.')),

    gulp.src(path.src.cssExclude)
  )
    .pipe(gulp.dest(path.dist.cssDir));
});

gulp.task('js:prod', function () {
  return streamqueue({ objectMode: true },
    gulp.src(path.src.js)
      .pipe(plumber())
      .pipe(concat(path.dist.jsMain))
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(uglify()),

    gulp.src(path.src.jsExclude)
      .pipe(uglify())
  )
    .pipe(gulp.dest(path.dist.jsDir));
});

gulp.task('css:prod', function () {
  return streamqueue({ objectMode: true },
    gulp.src(path.src.css)
      .pipe(plumber())
      .pipe(concat(path.dist.cssMain))
      .pipe(postcss(processors_dev))
      .pipe(cleanCSS()),

    gulp.src(path.src.cssExclude)
      .pipe(cleanCSS())
  )
    .pipe(gulp.dest(path.dist.cssDir));
});

gulp.task('dev', [
          'js:dev',
          'css:dev'
]);

gulp.task('build', function(cd){
  rimraf(path.dist.distDir, cd);
  gulp.start('js:prod');
  gulp.start('css:prod');
});

gulp.task('watch', function(){
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:dev');
  });
  watch(path.watch.css, function(event, cb) {
    gulp.start('css:dev');
  });
});

gulp.task('default', ['dev','watch']);