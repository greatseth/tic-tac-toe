TTT.Storage = function() {
};

TTT.Storage.prototype = {
  parsers: {
    Int  : parseInt,
    JSON : JSON.parse
  },

  get: function(k, coerceType) {
    var result = localStorage[k];
    if (result && coerceType) {
      result = this.parsers[coerceType](result);
    }
    return result;
  },

  set: function(k, v) {
    localStorage[k] = v;
    return v;
  },

  increment: function(k) {
    var v = this.get(k, "Int");
    if (undefined === v) { v = 0; }
    this.set(k, v + 1);
    return this.get(k, "Int");
  },

  save_object: function(k, obj) {
    this.set(k, JSON.stringify(obj));
    return obj;
  },

  get_object: function(k) {
    return this.get(k, "JSON");
  }
};
