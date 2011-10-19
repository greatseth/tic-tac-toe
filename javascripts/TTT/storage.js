TTT.Storage = function() {
}

TTT.Storage.prototype = {
  parsers: {
    Int: parseInt
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
  }
};
