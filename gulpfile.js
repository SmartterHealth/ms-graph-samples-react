const del = require('del');
const gulp = require('gulp');
const exec = require('child_process').execSync;
const util = require('util');
const connect = require('gulp-connect');
const wp = require('gulp-stream')

function clean() {
    return del('./.www');
}
exports.clean = clean;

function copy() {
    return gulp.src(['./src/index.html'])
    .pipe(gulp.dest('./.www'))
}

exports.copy = copy;


function webpack(cb) {
    exec('./node_modules/.bin/webpack');
    return gulp.src('./src/**/*.*')
    .pipe(connect.reload())
}
exports.webpack = webpack;



const build = gulp.series(clean, copy, webpack);

function serve(cb) {
    connect.server({
        livereload: true,
        root: "./.www",
        port: 9000
    });
    cb();
}


exports.build = build;




function watch() {
    return gulp.watch("./src/**/*.*", gulp.series(build));
}

exports.watch = watch;
exports.serve = gulp.series(build, serve, watch)