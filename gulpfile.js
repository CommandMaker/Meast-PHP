const { src, dest, watch, series } = require('gulp');
const cssMin = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

function cssMinify() {
    return src('res/css/**/*')
        .pipe(concat('all.min.css'))
        .pipe(cssMin({ compatibility: 'ie8' }))
        .pipe(dest('res/minify/css'));
}

// JavaScript Task
function jsTask() {
    return src('res/js/*.js', { sourcemaps: true })
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(dest('res/minify/js/', { sourcemaps: '.' }));
}

function browsersyncServe(cb) {
    browsersync.init({
        proxy: "localhost",
        notify: false,
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch('**/*.php', browsersyncReload);
    watch(['res/css/**/*.css', 'res/js/**/*.js'], series(cssMinify, jsTask, browsersyncReload));
}

exports.dev = series(
    cssMinify,
    jsTask,
    browsersyncServe,
    watchTask
);
exports.cssMinify = cssMinify;
exports.jsMinify = jsTask;
exports.browsersync = browsersyncServe;