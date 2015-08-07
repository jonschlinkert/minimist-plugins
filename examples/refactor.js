'use strict';

var minimist = require('minimist');
var cli = require('../index')(minimist, {help: true})
  .use(require('./minimist-expand')) // because the change
  .use(function demo (argv, args, opts) {
    console.log('demoPlugin:', this)
    //=> demoPlugin: { minimist: [Function],
    //  options: { help: true, qux: 'charlike', alias: { s: 'set', g: 'global' } },
    //  plugins: [ [Function: minimistExpand], [Function: demo] ],
    //  args: [ 'init', '--set=a:b', '-g' ],
    //  argv:
    //   { _: [ 'init' ],
    //     set: { a: 'b' },
    //     s: { a: 'b' },
    //     g: true,
    //     global: true } }
  })
  .parse(process.argv.slice(2), {
    qux: 'charlike',
    alias: {
      s: 'set',
      g: 'global'
    }
  })


console.log('cli.argv:', cli.argv)
//=> cli.argv: { _: [ 'init' ],
//  set: { a: 'b' },
//  s: { a: 'b' },
//  g: true,
//  global: true }
