'use strict';

/* deps: mocha */
var assert = require('assert');
var minimist = require('minimist');
var plugins = require('./');
var cli;


describe('minimist', function () {
  beforeEach(function () {
    cli = plugins(minimist);
  });

  it('should parse arguments without any plugins:', function () {
    cli.parse(['--a', '--b'], function (err, argv) {
      assert.equal(argv.a, true);
      assert.equal(argv.b, true);
    });
  });

  it('should chain plugins:', function () {
    cli.use(function () {
        return function (argv) {
          argv.foo = 'bar';
        };
      })
      .use(function () {
        return function (argv) {
          argv.baz = 'quux';
        };
      });

    cli.parse(['--a', '--b'], function (err, argv) {
      assert.equal(argv.foo === 'bar', true);
      assert.equal(argv.baz === 'quux', true);
      assert.equal(argv.a === true, true);
      assert.equal(argv.b === true, true);
    });
  });

  it('should expose args on the `argv` object:', function () {
    cli.parse(['a', 'b', 'c'], function (err, res) {
      assert.deepEqual(res._, ['a', 'b', 'c']);
    });
  });

  it('should expose options on the `argv` object:', function () {
    cli.parse(['a', 'b', 'c', '--foo=bar'], function (err, res) {
      assert.equal(res.foo, 'bar');
    });
  });

  it('should emit `end` after all args are emitted:', function (done) {
    var i = 0;
    function set(key, value) {
      return function (cli) {
        return function (argv, next) {
          argv[key] = value;
          next(null, argv);
        };
      };
    }

    cli.use(set('aaa', 'bbb'))
    cli.use(set('ccc', 'ddd'))
    cli.use(set('eee', 'fff'))

    cli.on('end', function (argv) {
      i++;
    });

    cli.parse(['a', 'b', 'c', '--foo=bar'], function (err, res) {
      assert.equal(i, 1);
      done();
    });
  });
});
