var minimist = require('minimist');
var plugins = require('..');

var cli = plugins(minimist)
  .use(require('minimist-expand'))

var args = process.argv.slice(2);

cli.parse(args.length ? args : ['--set=a:b', '--set=c:d'], function (err, argv) {
  console.log(argv);
  //=> { _: [], set: [ { a: 'b' }, { c: 'd' } ] }
});

