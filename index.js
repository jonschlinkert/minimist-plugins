/*!
 * minimist-plugins <https://github.com/jonschlinkert/minimist-plugins>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var forward = require('forward-object');

module.exports = function (minimist) {
  if (typeof minimist !== 'function') {
    throw new TypeError('expected minimist to be a function.');
  }

  function proxy() {
    return minimist.apply(minimist, arguments);
  }

  proxy.use = function (fn) {
    return (proxy = (fn(proxy) || proxy));
  };

  forward(proxy, minimist);
  return proxy;
};
