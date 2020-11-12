"use strict";

/******************************************
******** SERVER DEPENDENCIES **************
*******************************************/
const { watch, parallel} = require('gulp');
var serveStatic = require('serve-static');
const proxy =  require('proxy-middleware');
const url = require('url');
const browserSync = require('browser-sync');
const {setCompression, setHeaders, setHost, setBody} =  require('./local.middlewares');


/******************************************
************** TASKS **********************
*******************************************/
const {css,js, copyHtml,copyImages} = require('./tasks');

/******************************************
************** CONFIG HOSTS ***************
*******************************************/
const pkg = require('./package.json');
const { copyFile } = require('fs');
const $_HOST = `${pkg.accountName}.vtexcommercestable.com.br`;
const  $_PROXY_CONFIG = url.parse(`https://${$_HOST}/`)
$_PROXY_CONFIG.preserveHost = true;
$_PROXY_CONFIG.cookieRewrite = `${pkg.accountName}.vtexlocal.com.br`;

/******************************************
************** SERVER INIT ****************
*******************************************/
function watchFiles(){
    watch('./src/**/*.css',function(done){
       css();
       browserSync.reload();
       done();
    });
    watch('./src/**/*.js',function(done){
        js();
        browserSync.reload();
        done();
     });
     watch(['./src/**/*.html'],function(done){
        copyHtml();
        browserSync.reload();
        done();
     });
     watch(['./src/**/*.{css,js,html}'],function(done){
        copyImages();
        browserSync.reload();
        done();
     });
}

/******************************************
************** SERVER INIT ****************
*******************************************/
function myServer(){
    browserSync.init({
        host: `${pkg.accountName}.vtexlocal.com.br`,
        port:80,
        server:'./build',
        watch:true,
        open:'external',
    })
    console.log('SERVIDOR INICIADO');
}

exports.default = parallel(
    myServer, 
    watchFiles,
)
exports.build = parallel(
    css,
    copyHtml,
    js,
    copyImages
)