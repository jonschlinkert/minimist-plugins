/*!
 * minimist-plugins <https://github.com/jonschlinkert/minimist-plugins>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(minimist) {
  if (typeof minimist !== 'function') {
    throw new TypeError('expected minimist to be a function.');
  }

  var fn = minimist.parse || minimist;
  var plugins = {};

  plugins.parse = function () {
    plugins.argv = fn.apply(fn, arguments);
    return plugins;
  };

  plugins.use = function (fn) {
    plugins.argv = fn(plugins.argv);
    return plugins;
  };
  return plugins;
};
