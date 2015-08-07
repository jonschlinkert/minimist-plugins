var cli = require('..')(require('minimist'))
  .use(function (parser) {
    return parser;
  })

var argv = cli(['--a=b']);
console.log(argv);
