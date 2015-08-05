var cli = require('..')(require('minimist'))

cli.parse(process.argv.slice(2))
  .use(function (argv) {
    return argv;
  })
  .use(function (argv) {
    return argv;
  })

var argv = cli.argv;
console.log(cli);
