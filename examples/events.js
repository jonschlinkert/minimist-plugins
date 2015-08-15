var minimist = require('minimist');
var plugins = require('..');

var cli = plugins(minimist)
  .use(require('minimist-events')())

cli.on('foo', console.log.bind(console, '[foo]'));
cli.on('bar', console.log.bind(console, '[bar]'));
cli.on('baz', console.log.bind(console, '[baz]'));

cli.on(0, console.log.bind(console, '[0]'));
cli.on(1, console.log.bind(console, '[1]'));
cli.on(2, console.log.bind(console, '[2]'));

var args = process.argv.slice(2);
cli.parse(args.length ? args : ['foo', 'bar', 'baz'], function (err, argv) {
  console.log(argv);
});

