const cleanCSS = require('gulp-clean-css');
const {src,dest} = require('gulp');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');

const cssConfig =  {
    mode:'production',
    rules:{ test: /\.css$/, loader: 'css-loader' },
};


function css(){
    return src('**/*.css',{cwd:'./src'})
        .pipe(cleanCSS())
        .pipe(autoprefixer({cascade: false,grid:'autoplace'}))
        .pipe(rename({dirname:'assets/css'}))
        .pipe(dest('build/'))
}

function js(){
    return src('./src/**/*.js')
        .pipe(webpack({mode:'production',output:{filename:'amongus.js'}}))
        .pipe(rename({dirname:'assets/js'}))
        .pipe(dest('build/'));
}

function copyHtml(){
    return src(['./src/**/*.html'])
        .pipe(dest('build/'));
}

function copyImages(){
    return src(['./src/**/*.{png,jpg}'])
        .pipe(rename({dirname:'assets/img'}))
        .pipe(dest('build/'));
}

module.exports = {
    css,
    js,
    copyHtml,
    copyImages
}