var app = require('./app');
var one = new app.App();
var two = new app.App();
var methods = require('minimist-methods');
var cli = require('..')(require('minimist'))
  .use(require('minimist-expand'))
  .use(require('minimist-events'))
  .use(methods(app))
  .use(methods.namespace('one', one))
  .use(methods.namespace('two', two))

var help = {
  init: {},
  clone: {},
  build: {},
  deploy: {},
  update: {},
  related: {},
  auth: {},
  data: {}
};

var methods = [];

cli.on('_', function (arr) {
  arr.forEach(function (item) {
    if (help[item]) methods.push(item);
  });
});

cli.on('init', function () {
  console.log('init:', arguments);
});

cli.on('end', function () {
  if (methods.length > 1) {
    console.error('too many methods called!', methods);
  }
});

cli.on('*', function () {
  // console.log('set', arguments)
});

cli.one.on('set', function () {
  console.log('one', arguments)
});

cli.two.on('set', function () {
  console.log('two', arguments)
});

var args = process.argv.slice(2);
var argv = cli(args.length ? args : ['--set=a:b', '--set=c:d', '--one.set=a:b']);

console.log(app)
