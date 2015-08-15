'use strict';

var minimist = require('minimist');
var n = require('minimist-methods');
var App = require('./app').App;
var plugins = require('..');

var cli = plugins(minimist, {})
  .use(require('minimist-expand'))
  .use(require('minimist-events')())
  .use(n('assemble', new App()))
  .use(n('composer', new App()))
  .use(n('generate', new App()))
  .use(n('scaffold', new App()))
  .use(n('snippets', new App()))
  .use(n('template', new App()))

cli.scaffold.on('set', function (val) {
  console.log('[assemble] set', val);
});

cli.assemble.on('set', function (val) {
  console.log('[assemble] set', val);
});

cli.snippets.on('set', function (val) {
  console.log('[snippets] set', val);
});

var argv = process.argv.slice(2);
if (!argv.length) {
  argv = ['--snippets.set=foo.bar:a,b,c'];
}

cli.parse(argv, function (err, res) {
  console.log(res);
});

