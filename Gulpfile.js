  /*
  * gulp bootstrap file
  */

require("babel/register")({
  extensions: ['.es6'],
  stage : 0
});

require('./tasks.es6');
