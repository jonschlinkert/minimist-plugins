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

  it('should throw if `minimist` not function', function (done) {
    function fixture () {
      plugins(123);
    }
    assert.throws(fixture, TypeError);
    assert.throws(fixture, /expect `minimist` be function/);
    done();
  });

  it('should parse arguments without any plugins:', function (done) {
    cli.parse(['--a', '--b'], function (err, argv) {
      assert.equal(argv.a, true);
      assert.equal(argv.b, true);
      done();
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
      assert.equal(argv.aaa, 'bbb');
      assert.equal(argv.ccc, 'ddd');
      assert.equal(argv.eee, 'fff');
      i++;
    });

    cli.parse(['a', 'b', 'c', '--foo=bar'], function (err, argv) {
      assert.equal(i, 1);
      assert.equal(argv.aaa, 'bbb');
      assert.equal(argv.ccc, 'ddd');
      assert.equal(argv.eee, 'fff');
      done();
    });
  });

  it('should done callback be optional', function (done) {
    var res = cli.parse(['a', 'b']);
    assert.equal(typeof res.minimist, 'function');
    done();
  });

  it('should result have parsed `.argv` property', function (done) {
    var res = cli.parse(['--foo=bar', '--baz=qux']);
    assert.equal(typeof res.minimist, 'function');
    assert.equal(res.argv.foo, 'bar');
    assert.equal(res.argv.baz, 'qux');
    done();
  });

  it('should result have processed `.argv` property', function (done) {
    cli.use(function () {
      return function (argv, next) {
        argv.foo = 'bar2';
        argv.baz = 'qux2';
        next(null, argv);
      };
    });
    var res = cli.parse(['--foo=bar', '--baz=qux']);
    assert.equal(typeof res.minimist, 'function');
    assert.equal(res.argv.foo, 'bar2');
    assert.equal(res.argv.baz, 'qux2');
    done();
  });

  it('should merge options', function (done) {
    cli = plugins(minimist, {a: 'b'});
    var res = cli.parse(['--foo=bar'], {c: 'd'});
    assert.equal(res.options.a, 'b');
    assert.equal(res.options.c, 'd');
    assert.equal(res.argv.foo, 'bar');
    done();
  });

  it('should add/modify options from plugins', function (done) {
    cli = plugins(minimist, {foo: 'bar'});
    cli.use(function (self) {
      return function (argv, next) {
        self.options.foo = 'abc';
        self.options.baz = 'qux';
        next(null, argv);
      };
    });

    cli.parse(['--abc=def'], function (err, argv) {
      assert.equal(argv.abc, 'def');
      assert.equal(cli.options.foo, 'abc');
      assert.equal(cli.options.baz, 'qux');
      done();
    });
  });

  it('should be able to emit events from plugins', function (done) {
    var i = 0;
    cli.use(function (self) {
      return function (argv, next) {
        self.emit('custom', argv.foo);
        i++;
        next(null, argv)
      };
    });
    cli.on('custom', function (foo) {
      assert.equal(foo, 'bar');
      i++;
    });
    cli.parse(['--foo=bar'], function (err, argv) {
      assert.equal(i, 2);
      assert.equal(argv.foo, 'bar');
      done();
    });
  });
});
