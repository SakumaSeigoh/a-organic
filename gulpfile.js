const gulp          = require('gulp');
const notify        = require("gulp-notify");
const plumber       = require("gulp-plumber");
const sass          = require('gulp-sass');
const pug           = require('gulp-pug');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const browserSync   = require('browser-sync');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const config        = require('./webpack.config.js');

//setting : paths
const paths = {
  'root'    : './dist/',
  'html'    : './dist/',
  'cssDist' : './dist/css/',
  'jsDist'  : './dist/js/',
  'pug'     : './src/pug/**/*.pug',
  'cssSrc'  : './src/scss/**/*.scss',
  'jsSrc'   : './src/js/**/*.js',
}

//gulpコマンドの省略
const { watch, series, task, src, dest, parallel } = require('gulp');

//Sass
task('sass', function () {
  return (
    src(paths.cssSrc)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(sass({
        outputStyle: 'expanded'// Minifyするなら'compressed'
      }))
      // autoprefixer をアップデートの影響で削除。定義をpackage.jsonへ移動
      // .pipe(autoprefixer({
      //   browsers: ['ie >= 11'],
      //   cascade: false,
      //   grid: true
      // }))
      .pipe(dest(paths.cssDist))
  );
});

//Pug
task('pug', function () {
  return (
    src([paths.pug, '!./src/pug/**/_*.pug'])
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(pug({
        pretty: true,
        basedir: "./src/pug"
      }))
      .pipe(dest(paths.html))
  );
});

// JS Compress
// jsのビルドはwebpackに任せるため未使用
task('js', function () {
  return (
    src(paths.jsSrc)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(dest(paths.jsDist))
  );
});

// ※追加
task('webpack', function () {
  return webpackStream(
    config.webpack, webpack)
    .pipe(gulp.dest(config.js.dist));
});

// browser-sync
task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: paths.root
    },
    // 8080はVueJsの学習、8000はPugのオリジナル学習
    // 8010はmana氏の書籍で使用中のため念のため回避
    port: 8020,
    reloadOnRestart: true
  });
});

// browser-sync reload
task('reload', (done) => {
  browserSync.reload();
  done();
});

//watch
task('watch', (done) => {
  watch([paths.cssSrc], series('sass', 'reload'));
  watch([paths.jsSrc], series('js', 'reload'));
  watch([paths.jsSrc], series('webpack', 'reload'));
  watch([paths.pug], series('pug', 'reload'));
  done();
});
task('default', parallel('watch', 'browser-sync'));