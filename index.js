/*!
 * minimist-plugins <https://github.com/jonschlinkert/minimist-plugins>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');

module.exports = function (minimist) {
  if (typeof minimist !== 'function') {
    throw new TypeError('expected minimist to be a function.');
  }

  var fn = minimist.parse || minimist;
  function proxy() {
    return fn.apply(fn, arguments);
  }

  extend(proxy, minimist);

  proxy.parse = function () {
    proxy.argv = proxy.apply(proxy, arguments);
    return proxy;
  };

  proxy.use = function (fn) {
    proxy.argv = fn(proxy.argv) || proxy.argv;
    return proxy;
  };
  return proxy;
};
