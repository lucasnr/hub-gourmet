const { src, dest, series, parallel } = require('gulp'),
  clean = require('gulp-clean'),
  // usemin = require('gulp-usemin'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  htmlmin = require('gulp-htmlmin');

function cleanDist() {
  return src('dist/', { read: false, allowEmpty: true }).pipe(clean());
}

function copyDist() {
  return src(['src/**/*']).pipe(dest('dist/'));
}

// function buildHtml() {
//   return src('src/**/*.html')
//     .pipe(
//       usemin({
//         css: [cssmin],
//         js: [
//           () =>
//             babel({
//               presets: ['@babel/preset-env'],
//             }),
//           uglify,
//         ],
//         html: [htmlmin]
//       })
//     )
//     .pipe(dest('dist/'));
// }

function minifyCss() {
  return src('src/**/*.css').pipe(cssmin()).pipe(dest('dist/'));
}

function buildJs() {
  return src(['src/**/*.js', '!src/assets/js/jquery.mask.min.js'])
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(dest('dist/'));
}

function minifyHtml() {
  return src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
}

exports.default = series(
  cleanDist,
  copyDist,
  parallel(minifyCss, buildJs, minifyHtml)
);
