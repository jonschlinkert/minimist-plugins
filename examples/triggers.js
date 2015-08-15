'use strict';

var minimist = require('minimist');
var methods = require('minimist-methods');
var App = require('./app').App;
var plugins = require('..');

// mock out applications with different instances of `App`
var assemble = new App();
var composer = new App();
var generate = new App();
var scaffold = new App();
var snippets = new App();
var template = new App();

var cli = plugins(minimist, {})
  .use(require('minimist-expand'))
  .use(require('minimist-events')())
  .use(require('minimist-methods')(snippets))

cli.on('assemble', function (key) {
  console.log('[assemble]:');
  assemble.visit(key);
  console.log('----');
});

cli.on('snippets', function (key) {
  console.log('[snippets]:');
  snippets.visit(key);
  console.log('----');
});

cli.on('scaffold', function (key) {
  console.log('[scaffold]:');
  scaffold.visit(key);
  console.log('----');
});


var argv = process.argv.slice(2);
if (!argv.length) {
  argv = [];
  argv.push('--snippets.set=foo.bar:a,b,c');
  argv.push('--assemble.set=foo.bar:baz');
  argv.push('--assemble.get=foo');
  argv.push('--assemble.del=foo');
  argv.push('--scaffold.set=foo.bar:a,b,c');
}

cli.parse(argv, function (err, res) {
  // console.log(res);
});

