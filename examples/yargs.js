'use strict'

var cli = require('../')(require('yargs'))

cli.use(function () {
  return function (argv, next) {
    argv = {}
    argv.cleared = true
    next(null, argv)
  }
})

cli.parse(process.argv.slice(2), function (err, argv) {
  console.log(argv)
  //=> {cleared: true}
})
