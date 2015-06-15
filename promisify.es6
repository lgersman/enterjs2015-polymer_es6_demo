const stream = require('stream'),
      through2    = require('through2'),
      exec   = require('child_process').exec
;

const promisify = (arg,...params)=>
  ()=>{
    /*
    if(arg instanceof stream.Stream) {
      return promisify.stream(arg);
    } else*/ if(typeof(arg)==='string') {
      return promisify.exec(arg);
    } else if(typeof(arg)==='function') {
      return promisify.func(arg, ...params);
    } else {
      Promise.reject(`Don't know how to handle argument ${arg}`);
    }
  }
;

/*
  // we cannot ensure that end is called (https://github.com/gulpjs/gulp/issues/82)
  // but wrapping it with es.merge guarantees it
promisify.stream = (stream)=>new Promise((resolve, reject)=>{
  stream
  .pipe(through2.obj(
    (file, enc, cb)=>cb(null, file),
    cb=>cb()
  ))
  .on('finish', resolve)
  .on('error', reject);
});
*/

promisify.func = (func, ...args)=>{
  let reject,resolve;
  const p = new Promise((_resolve,_reject)=>(resolve=_resolve) && (reject=_reject));
  func(...args, (err, res)=>(err && reject(err)) || resolve(res));
};

promisify.exec = (cmd)=>{
  return new Promise((resolve,reject)=>{
    promisify.verbose && console.log(`[exec] ${cmd}`);
    exec(cmd, (err, stdout, stderr)=>{
      if(err) {
        const message = `[exec] "${cmd}" exited with error code ${err.code} : ${stderr} ${stdout}`;
        //promisify.verbose && console.error(message);
        reject(message);        
      } else {
        promisify.verbose && (stdout || stderr) && console.log(`[exec] ${stdout} ${stderr}`);
        resolve(stdout);
      }
    });
  });    
}

module.exports=promisify;
