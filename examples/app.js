var Emitter = require('component-emitter');
var visit = require('collection-visit');

var colors = {
  warn: require('ansi-yellow'),
  info: require('ansi-cyan'),
  success: require('ansi-green'),
  error: require('ansi-red')
};

var action = {
  set: 'success',
  get: 'info',
  del: 'error'
};

/**
 * Example application, used in the other examples
 */

function App(cache) {
  Emitter.call(this);
  this.cache = cache || {};
}

Emitter(App.prototype);

App.prototype.set = function(key, value) {
  if (typeof key === 'object') {
    return this.visit('set', key);
  }
  this.cache[key] = value;
  this.emit('set', key, value);
  this.logEvent('set')(key, value);
  return this;
};

App.prototype.get = function(key) {
  var res = this.cache[key];
  this.emit('get', key, res);
  this.logEvent('get')(key, res);
  return res;
};

App.prototype.del = function(key) {
  if (Array.isArray(key)) {
    return this.visit('del', key);
  }
  delete this.cache[key];
  this.emit('del', key);
  this.logEvent('del')(key);
  return key;
};

App.prototype.logEvent = function(method) {
  return function () {
    var args = [].slice.call(arguments);
    args.unshift(colors[action[method]](method));
    var str = JSON.stringify(args, null, 2);
    console.log.apply(console, args);
    return str;
  };
};

App.prototype.has = function(key) {
  return this.cache.hasOwnProperty(key);
};

App.prototype.visit = function(method, val) {
  if (Array.isArray(method)) {
    method.map(this.visit.bind(this));
  } else if (typeof method === 'object') {
    for (var key in method) {
      visit(this, key, method[key]);
    }
  } else {
    visit(this, method, val);
  }
  return this;
};

/**
 * Expose an instance of `App`
 */

module.exports = new App();

/**
 * Expose the `App` constructor
 */

module.exports.App = App;
