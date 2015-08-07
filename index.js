/*!
 * minimist-plugins <https://github.com/jonschlinkert/minimist-plugins>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('is-extendable');
var extend = require('extend-shallow');

function MinimistPlugins(minimist, opts) {
  if (!(this instanceof MinimistPlugins)) {
    return new MinimistPlugins(minimist, opts);
  }
  if (!isObject(minimist)) {
    throw new TypeError('expect `minimist` to be function or object');
  }

  this.minimist = minimist;
  this.options = isObject(opts) ? opts : {};
  this.plugins = [];
}

MinimistPlugins.prototype.use = function use(plugin) {
  this.plugins.push(plugin);
  return this;
}

MinimistPlugins.prototype.parse = function parse(args, opts) {
  if (arguments.length === 1 && (!Array.isArray(args) && typeof args === 'object')) {
    opts = args;
    args = false;
  }
  this.options = extend({}, this.options, opts);
  this.args = args || this.options.args || process.argv.slice(2);
  this.argv = this.minimist.call(this.minimist, this.args, this.options);

  var len = this.plugins.length;
  var i = 0;

  while (i < len) {
    var plugin = this.plugins[i++];
    plugin.call(this, this.argv, this.args, this.options);
  }
  return this;
}

/**
 * expose
 */

module.exports = MinimistPlugins;

