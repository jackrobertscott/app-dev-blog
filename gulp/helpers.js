'use strict';

var path = require('path');

function Helpers() {
  this.exts = [];
}

Helpers.prototype.filter = function filter(dir, ext) {
  return [
    path.join(dir, '**/*' + ext || ''),
    '!' + path.join(dir, '**/_**'),
  ];
};

Helpers.prototype.src = function src(dir, exts) {
  var sources = [];
  if (Array.isArray(exts)) {
    exts.forEach(function(ext) {
      if (this.exts.indexOf(ext) === -1) {
        this.exts.push(ext);
      }
      sources = sources.concat(this.filter(dir, ext));
    }.bind(this));
  } else {
    if (this.exts.indexOf(exts) === -1) {
      this.exts.push(exts);
    }
    sources = sources.concat(this.filter(dir, exts));
  }
  return sources;
};

Helpers.prototype.others = function others(dir) {
  return [
    path.join(dir, '**'),
    '!' + path.join(dir, '**/*{' + this.exts.join(',') + '}'),
  ];
};

Helpers.prototype.uncached = function uncached(_module) {
  delete require.cache[require.resolve(_module)];
  return require(_module);
};

module.exports = new Helpers();