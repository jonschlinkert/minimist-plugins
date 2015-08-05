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

  it('should use plugins defined after parse:', function () {
    cli.parse(['--a', '--b'])
      .use(function (argv) {
        argv.foo = 'bar';
      });

    assert.equal(cli.argv.foo === 'bar', true);
    assert.equal(cli.argv.a === true, true);
    assert.equal(cli.argv.b === true, true);
  });

  it('should chain plugins:', function () {
    cli.parse(['--a', '--b'])
      .use(function (argv) {
        argv.foo = 'bar';
      })
      .use(function (argv) {
        argv.baz = 'quux';
      });

    assert.equal(cli.argv.foo === 'bar', true);
    assert.equal(cli.argv.baz === 'quux', true);
    assert.equal(cli.argv.a === true, true);
    assert.equal(cli.argv.b === true, true);
  });

  it('should throw an error when minimist is not passed:', function () {
    assert.throws(function () {
      cmd()
    }, 'minimist should be passed as the first argument.');
  });
});
