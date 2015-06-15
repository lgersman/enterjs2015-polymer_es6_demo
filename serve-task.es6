const fs         = require('fs'),
      express    = require('express'),
      gzipStatic = require('connect-gzip-static'),
      path       = require('path'),
      gulp       = require('gulp'),
      globby     = require('globby'),
      babel      = require("babel"),
      //browserSync= require('browser-sync'),
      less       = require('less'),
      ent        = require('ent'),
      serveIndex =require('serve-index')
;

less.logger.addListener(console);

const BROWSER_PORT = 4000/*,
      BROWSERSYNC_PORT = 4002*/
;

module.exports = ()=>{
  let app = express();

  app
    .use(serveIndex(__dirname, {'icons': true}))
    .use(gzipStatic(__dirname))
    .listen(BROWSER_PORT)
  ;
  
  /*
  browserSync.init(null, {
      // Don't try to inject, just do a page refresh
    injectChanges: false,
    logLevel: "silent",
    open : false,
    files : [],
    port  : BROWSERSYNC_PORT,
    proxy : `http://localhost:${BROWSER_PORT}`
  });
  */

  //gulp.watch(['./src/**/*.js', './examples/**/*.*'], [ 'build', 'test']);
  //gulp.watch(['./src/**/*.js', './examples/**/*.*'], /*notifyLiveReload*/ browserSync.reload);
};
