const jasmine = require('minijasminenode2'),
      path = require('path')
; 

require('babel/register')({
  extensions: ['.es6']
});

process.chdir( path.join(__dirname, '/..'));

jasmine.executeSpecs({
  specs: ['test/add-spec.es6'],
  isVerbose: true,
  showColors: true,
  includeStackTrace: true
});
