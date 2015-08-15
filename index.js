/*!
 * minimist-plugins <https://github.com/jonschlinkert/minimist-plugins>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Emitter = require('component-emitter');
var plugins = require('plugins');

function Plugins(minimist, options) {
  if (!(this instanceof Plugins)) {
    return new Plugins(minimist);
  }
  Emitter.call(this);
  this.options = options || {};
  this.plugins = new plugins();
  this.minimist = minimist;
}

Plugins.prototype = Emitter({
  constructor: Plugins,

  use: function (fn) {
    this.plugins.use(fn(this));
    return this;
  },

  parse: function (argv, opts, next) {
    if (typeof opts === 'function') {
      next = opts;
      opts = null;
    }
    argv = this.minimist(argv, opts);
    this.plugins.run(argv, function (err, args) {
      if (err) return next(err);
      args = Array.isArray(args) ? args[0] : args;
      this.emit('end', args);
      next(null, args);
    }.bind(this));
    return this;
  }
});


/**
 * Expose `Plugins`
 */

module.exports = Plugins;
