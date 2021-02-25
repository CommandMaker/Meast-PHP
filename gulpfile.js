const { src, dest, watch, series } = require('gulp');
const cssMin = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

const sassCompiler = require('gulp-sass');

function sass () {
    return src('src/sass/**/*.scss')
        .pipe(sassCompiler())
        .pipe(dest('src/css'));
}

function sassComponents () {
    return src('src/components/global/*.scss')
        .pipe(sassCompiler())
        .pipe(concat('components.min.css'))
        .pipe(cssMin({ compatibility: 'ie8' }))
        .pipe(dest('src/minify/css'));
}

function cssMinify() {
    return src('src/css/**/*.css')
        .pipe(concat('all.min.css'))
        .pipe(cssMin({ compatibility: 'ie8' }))
        .pipe(dest('src/minify/css'));
}

// JavaScript Task
function jsTask() {
    return src('src/js/**/*.js', { sourcemaps: true })
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(dest('src/minify/js', { sourcemaps: '.' }));
}

function browsersyncServe(cb) {
    if (process.platform === "linux") {
        console.log('[Meast log] Proxy version Linux');
        browsersync.init({
            proxy: "meast.localhost",
            notify: false,
        });
    } else {
        console.log('[Meast log] Proxy version Windows');
        browsersync.init({
            proxy: "localhost",
            notify: false,
        });
    }
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch('**/*.php', browsersyncReload);
    watch(['src/css/**/*.css'], series(cssMinify, browsersyncReload));
    watch('src/sass/**/*.scss', series(sass, cssMinify, browsersyncReload));
    watch('src/components/**/*.scss', series(sassComponents, browsersyncReload));
    watch('src/js/**/*.js', series(jsTask, browsersyncReload));
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
exports.sass = sass;
exports.sassComponents = sassComponents;