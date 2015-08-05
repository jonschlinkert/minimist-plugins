var minimist = require('minimist-events')(require('minimist'));
var cli = require('..')(minimist);

cli.on('foo', function (val) {
  console.log('foo:', val);
});

cli.on('bar', function (val) {
  console.log('bar:', val);
});

cli.on('baz', function (val) {
  console.log('whooohooo!:', val);
});

cli.parse(process.argv.slice(2))
  .use(function (argv) {
    cli.emit('baz', 'whatever');
    return argv;
  })
  .use(function (argv) {
    console.log(argv)
    return argv;
  })

var argv = cli.argv;
console.log(argv);
