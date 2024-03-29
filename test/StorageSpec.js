describe("TTT.Storage", function() {
  var storage;

  beforeEach(function() {
    localStorage.clear();
    storage = new TTT.Storage();
  });

  describe("set", function() {
    it("sets the given value to the given key", function() {
      storage.set("foo", "bar");
      expect(localStorage["foo"]).toEqual("bar");
    });
  });

  describe("get", function() {
    describe("when given only a key", function() {
      describe("when the given key has a value set", function() {
        it("returns the value as a string", function() {
          localStorage["foo"] = "bar";
          expect(storage.get("foo")).toEqual("bar");
        });
      });

      describe("when the given key does not have a value set", function() {
        it("returns null", function() {
          expect(storage.get("undefined")).toEqual(null);
        });
      });
    });
  });

  describe("get_int", function() {
    describe("when the given key has a value set", function() {
      it("returns the value as an integer", function() {
        localStorage["foo"] = 42;
        expect(localStorage["foo"]).toEqual("42");
        expect(storage.get_int("foo")).toEqual(42);
      });
    });

    describe("when the given key does not have a value set", function() {
      it("returns null", function() {
        expect(storage.get_int("foo")).toEqual(null);
      });
    });
  });

  describe("increment", function() {
    describe("when given a non-existing key", function() {
      it("sets the key to 1 and returns 1", function() {
        expect(storage.increment("undefined")).toEqual(1);
      });
    });

    describe("when given an existing key", function() {
      beforeEach(function() {
        storage.set("counter", 0);
      });

      it("increments the counter", function() {
        expect(storage.increment("counter")).toEqual(1);
        expect(storage.increment("counter")).toEqual(2);
        expect(storage.increment("counter")).toEqual(3);
      });
    });
  });

  describe("save_object", function() {
    var obj;
   
    beforeEach(function() {
      obj = { foo: "bar" };
    });

    it("saves a JSON an object", function() {
      storage.save_object('foo', obj);
      expect(JSON.parse(storage.get('foo'))).toEqual(obj);
    });
  });

  describe("get_object", function() {
    var obj;
   
    beforeEach(function() {
      obj = { foo: "bar" };
      storage.set('foo', JSON.stringify(obj));
    });

    it("returns a parsed JSON object", function() {
      expect(storage.get_object('foo')).toEqual(obj);
    });
  });
});
