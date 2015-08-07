var minimist = require('minimist');
var cli = require('..')(minimist)
  .use(require('minimist-expand'))

var args = process.argv.slice(2);
var argv = cli(args.length ? args : ['--set=a:b', '--set=c:d']);

console.log(argv);
//=> { _: [], set: [ { a: 'b' }, { c: 'd' } ] }
