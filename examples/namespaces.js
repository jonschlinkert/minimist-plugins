'use strict';

var minimist = require('minimist');
var plugins = require('..');
var n = require('minimist-methods');
var App = require('./app').App;
var ctx = new App();

var cli = plugins(minimist, {})
  .use(require('minimist-expand'))
  .use(require('minimist-events')())
  .use(n('assemble', new App()))
  .use(n('composer', new App()))
  .use(n('generate', new App()))
  .use(n('scaffold', new App()))
  .use(n('snippets', new App()))
  .use(n('template', new App()))

cli.scaffold.on('set', function () {
  console.log('[assemble] set');
});

cli.assemble.on('set', function () {
  console.log('[assemble] set');
});

cli.snippets.on('set', function () {
  console.log('[snippets] set');
});

cli.parse(process.argv.slice(2), function (err, res) {
  console.log(res);
});

