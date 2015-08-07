/*!
 * minimist-expand <https://github.com/jonschlinkert/minimist-expand>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var expandArgs = require('expand-args');
var forward = require('forward-object');

module.exports = function minimistExpand(minimist) {
  // plugin signature
  var plugin = this && this.minimist && this.use && this.parse
  if (plugin) {
    this.argv = expandArgs(this.argv)
    return this
  }

  // otherwise, expect minimist to be a function
  var fn = minimist;
  if (typeof fn !== 'function') {
    throw new TypeError('expected minimist to be a function.');
  }

  // if this is already registered as a plugin, return minimist
  fn.plugin = fn.plugin || {};
  if (fn.plugin.expand) {
    return fn;
  }

  function proxy() {
    return expandArgs(fn.apply(fn, arguments));
  }

  forward(proxy, fn);
  proxy.plugin.expand = true;
  return proxy;
};
