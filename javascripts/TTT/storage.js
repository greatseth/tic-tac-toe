TTT.Storage = function() {
};

TTT.Storage.prototype = {
  parsers: {
    Int  : parseInt,
  },

  get: function(k, coerceType) {
    return localStorage[k];
  },

  get_int: function(k) {
    var n = parseInt(this.get(k));
    if (!isNaN(n)) return n;
  },

  set: function(k, v) {
    localStorage[k] = v;
    return v;
  },

  increment: function(k) {
    var v = this.get_int(k);
    if (undefined === v) { v = 0; }
    this.set(k, v + 1);
    return this.get_int(k);
  },

  save_object: function(k, obj) {
    this.set(k, JSON.stringify(obj));
    return obj;
  },

  get_object: function(k) {
    return JSON.parse(this.get(k));
  }
};
