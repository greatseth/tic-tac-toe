describe("TTT.Game instance methods", function() {
  beforeEach(function() {
    var cells = "";
    for (var i = 0; i < 9; i++) { cells = cells + "<li></li>"; }
    game = new TTT.Game(function(g) {
      g.set_cells($(cells));
    });
  });

  describe("callback_defined", function() {
    describe("the given callback is defined", function() {
      it("returns true", function() {
        game.callbacks.turn = function() {};
        expect(game.callback_defined("turn")).toBeTruthy();
      });
    });

    describe("the given callback is undefined", function() {
      it("returns false", function() {
        expect(game.callback_defined("turn")).toBeFalsy();
      });
    });
  });

  describe("run_callback", function() {
    describe("when the given callback is undefined", function() {
      it("does not call the given callback", function() {
        // you can't spy on undefined
        game.callbacks.turn = function() {};
        // but we can stub our check for defined callbacks
        game.callback_defined = function(c) { return false; };
        // yeah.. annoying
        spyOn(game.callbacks, 'turn');

        game.advance_turn();
        expect(game.callbacks.turn).not.toHaveBeenCalled();
      });
    });

    describe("when the given callback is defined", function() {
      it("calls the given callback", function() {
        game.callbacks.turn = function() {};
        spyOn(game.callbacks, 'turn');
        game.advance_turn();
        expect(game.callbacks.turn).toHaveBeenCalled();
      });
    });
  });

  describe("mark_for_turn", function() {
    it("returns X or O depending on the current turn", function() {
      expect(game.mark_for_turn()).toEqual("X");
      game.advance_turn();
      expect(game.mark_for_turn()).toEqual("O");
      game.advance_turn();
      expect(game.mark_for_turn()).toEqual("X");
    });
  });

  describe("mark", function() {
    describe("with an argument", function() {
      it("marks the given cell", function() {
        game.mark(game.cells[0], "X");
        expect($(game.cells[0]).text()).toEqual("X");
      });
    });

    describe("with no arguments", function() {
      describe("when the cell is marked", function() {
        it("returns the mark", function() {
          game.mark(game.cells[0], "X");
          expect(game.mark(game.cells[0])).toEqual("X");
        });
      });

      describe("when the cell is not marked", function() {
        it("returns null", function() {
          expect(game.mark(game.cells[0])).toEqual(null);
        });
      });
    });
  });

  describe("cells", function() {
    it("returns an array of 9 cells",  function() {
      expect(game.cells.length).toEqual(9);

      expect(game.mark(game.cells[0])).toEqual(null);

      game.mark(game.cells[0], "X");

      expect(game.mark(game.cells[0])).toEqual("X");
    });
  });

  describe("check_for_win", function() {
    describe("not a win or a draw", function() {
      it("returns null",  function() {
        expect(game.check_for_win()).toEqual(null);
      });
    });

    describe("a win", function() {
      beforeEach(function() {
        game.mark(game.cells[0], "X");
        game.mark(game.cells[1], "X");
        game.mark(game.cells[2], "X");
      });

      it("returns the winning set of cell indexes",  function() {
        expect(game.check_for_win()).toEqual({
          state: TTT.Game.STATES.WIN,
          winning_set: [0,1,2]
        });
      });

      it("calls the win callback", function() {
        game.callbacks.win = function(winning_set) {};
        spyOn(game.callbacks, 'win');
        game.check_for_win();
        expect(game.callbacks.win).toHaveBeenCalledWith([0,1,2]);
      });
    });

    describe("a draw", function() {
      beforeEach(function() {
        game.mark(game.cells[0], "X");
        game.mark(game.cells[1], "X");
        game.mark(game.cells[2], "O");
        game.mark(game.cells[3], "O");
        game.mark(game.cells[4], "X");
        game.mark(game.cells[5], "X");
        game.mark(game.cells[6], "X");
        game.mark(game.cells[7], "O");
        game.mark(game.cells[8], "O");
      });

      it("returns object with state:TTT.Game.STATES.DRAW",  function() {
        expect(game.check_for_win()).toEqual({
          state: TTT.Game.STATES.DRAW
        });
      });

      it("calls the draw callback", function() {
        game.callbacks.draw = function() {};
        spyOn(game.callbacks, 'draw');
        game.check_for_win();
        expect(game.callbacks.draw).toHaveBeenCalled();
      });
    });
  });

  describe("advance_turn", function() {
    it("increments the current turn", function() {
      expect(game.turn).toEqual(1);
      game.advance_turn();
      expect(game.turn).toEqual(2);
      game.advance_turn();
      expect(game.turn).toEqual(3);
    });

    it("calls the turn callback", function() {
      game.callbacks.turn = function() {};
      spyOn(game.callbacks, 'turn');
      game.advance_turn();
      expect(game.callbacks.turn).toHaveBeenCalled();
    });
  });

  describe("x_turn", function() {
    it("returns true if current turn is odd", function() {
      game.turn = 1;
      expect(game.x_turn()).toBeTruthy();
      game.advance_turn();
      expect(game.x_turn()).toBeFalsy();
    });
  });

  describe("o_turn", function() {
    it("returns true if current turn is even", function() {
      game.turn = 1;
      expect(game.o_turn()).toBeFalsy();
      game.advance_turn();
      expect(game.o_turn()).toBeTruthy();
    });
  });
});
