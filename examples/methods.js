var app = require('./app');
var minimist = require('minimist');
var methods = require('minimist-methods');

var cli = require('..')(minimist)
  .use(require('minimist-expand'))
  .use(methods('one', app))
  .use(methods('two', app))

cli.one.on('set', console.log.bind(console, '[set]'));
cli.one.on('get', console.log.bind(console, '[get]'));

var args = process.argv.slice(2);
var argv = cli(args.length ? args : ['--set=a:b', '--set=c:d']);
console.log(app);
