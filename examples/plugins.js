var cli = require('..')(require('minimist'))
  .use(function (plugins) {
    return function (argv, next) {
      // do stuff to `argv`
      next(null, argv);
    };
  })

cli.parse(['--a=b'], function (err, argv) {
  console.log(argv);
});
