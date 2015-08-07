var App = require('./app').App;
var app = new App();
var one = new App();
var two = new App();

var minimist = require('minimist');
var methods = require('minimist-methods');
var cli = require('..')(minimist)
  .use(require('minimist-expand'))
  .use(require('minimist-events'))
  .use(methods(app))
  .use(methods.namespace('one', one))
  .use(methods.namespace('two', two))

cli.on('set', console.log.bind(console, '[set]'));

var args = process.argv.slice(2);
var argv = cli(args.length ? args : ['--set=a:b', '--set=c:d', '--one.set=a:b']);

console.log(app);
//=> { _: [], set: [ { a: 'b' }, { c: 'd' } ] }
