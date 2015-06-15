const gulp        = require('gulp'),
      through2    = require('through2'),
      babel       = require('babel'),
      fs          = require('fs'),
      serveTask   = require('./serve-task.es6'),
      pfy         = require('./promisify.es6')
;

const PACKAGE = JSON.parse(fs.readFileSync('./package.json')),
      DIST    = 'dist',
      BIN     = 'node_modules/.bin', 
      HEADER  = `/**
* Package         : ${PACKAGE.name}
* Version         : ${PACKAGE.version}
* GIT Repository  : ${PACKAGE.repository.url}
*
* Description     :
* ${PACKAGE.description.replace(/\n/g,'\n *')}
*
* Copyright ${PACKAGE.author}
*/

`;

pfy.verbose = true;

gulp.task('clean', pfy(`rm -rf ${DIST}`));

gulp.task('prepare', ['clean'], done=>
  pfy(`mkdir -p ${DIST}`)()
  .then(
    ()=>Promise.all([
      pfy(`cp node_modules/babel-core/browser-polyfill.js ${DIST}`)(),
      pfy(`cp bower_components/polymer/polymer*.html ${DIST}`)(),
      pfy(`cp bower_components/webcomponentsjs/webcomponents-lite.js ${DIST}`)(),
      pfy(`rsync -av --exclude '*.less' --exclude '*.es6' src/* ${DIST}`)()
    ])    
    //()=>pfy(fs.writeFile, `${DIST}/index.js`, `${babel.buildExternalHelpers()} \n\nexports.b = require('./b');`)()
    //pfy(`${BIN}/browserify node_modules/babel-runtime/node_modules/core-js/index.js node_modules/babel-runtime/regenerator/index.js $(find node_modules/babel-runtime/helpers/ -name "*.jsx") -s babelRuntime -d --outfile ${DIST}/babel-runtime.js`)
  )
);

  // compare with similar gulp https://babeljs.io/docs/using-babel/#gulp
gulp.task('compile', ['prepare'], ()=>
  Promise.all([
    pfy(`find src -name "bundle.less" -print | sed -rne 's:src/(.*)/([^/]+).less$:${BIN}/lessc & --verbose --source-map-map-inline ${DIST}/\\1/\\2.css:p' | sh`)(),
    pfy(`find src -name "bundle.es6" -print | sed -rne 's:src/(.*)/([^/]+\.es6)$:mkdir -p ${DIST}/\\1 \\&\\& ${BIN}/browserify & --debug -t [ babelify --stage 0 --sourceMaps inline] --outfile ${DIST}/\\1/bundle.js:p' | sh`, { verbose : true})()
  ]) 
);

gulp.task('build', ['compile', 'test:node'], ()=>
  pfy(`find ${DIST} -name "*.js" -print | sed -rne 's:(.*).js$:${BIN}/uglifyjs & -c -m > \\1.min.js:p' | sh`)()
  .then(()=>new Promise((resolve, reject)=>{
        // append header to all javascript files
      gulp.src([`${DIST}/**/*.css`, `${DIST}/**/*.js`, `!${DIST}/*.js`])
      .pipe(through2.obj(
        (file, enc, cb)=>(file.contents=new Buffer(HEADER + file.contents)) && cb(null, file)
      ))
      .pipe(gulp.dest(DIST))
      .on('finish',resolve)
      .on('reject',reject)
    })
  )
  .then(
    pfy(`find ${DIST} \\( -name "*.min.js" -o -name "polymer*.html" \\) -print | sed -rne 's:(.*)$:gzip -9vc \\1 > \\1.gz:p' | sh`),
  )  
);

gulp.task('test', ['build']);

gulp.task('test:node', ()=>
  pfy(`${BIN}/eslint src/dynamic-hello/*.es6 src/hello-events/*.es6 src/hello-modules/*.es6 src/hello-promise/*.es6 src/hello-world/*.es6 src/hello-testing/*.es6 test/*.es6`)()
  .then(
    pfy('node test/test-node-specs.js')    
  )
  .then(stdout=>
    (stdout.indexOf('0 failures')===-1) && process.exit(-1)
  )
);

gulp.task('serve', ['build'], serveTask);

gulp.task('default', ['test']);
