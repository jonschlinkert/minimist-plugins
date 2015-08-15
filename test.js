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

  it('should parse arguments without any plugins:', function (done) {
    cli.parse(['--a', '--b'], function (err, argv) {
      assert.equal(argv.a, true);
      assert.equal(argv.b, true);
      done();
    });
  });

  it('should chain plugins:', function (done) {
    cli.use(function () {
        return function (argv, next) {
          argv.foo = 'bar';
          next(null, argv);
        };
      })
      .use(function () {
        return function (argv, next) {
          argv.baz = 'quux';
          next(null, argv);
        };
      });

    cli.parse(['--a', '--b'], function (err, argv) {
      assert.equal(argv.foo === 'bar', true);
      assert.equal(argv.baz === 'quux', true);
      assert.equal(argv.a === true, true);
      assert.equal(argv.b === true, true);
      done();
    });
  });

  it('should expose args on the `argv` object:', function (done) {
    cli.parse(['a', 'b', 'c'], function (err, res) {
      assert.deepEqual(res._, ['a', 'b', 'c']);
      done();
    });
  });

  it('should expose options on the `argv` object:', function (done) {
    cli.parse(['a', 'b', 'c', '--foo=bar'], function (err, res) {
      assert.equal(res.foo, 'bar');
      done();
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
