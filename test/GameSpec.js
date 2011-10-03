describe("TTT.Game instance methods", function() {
  beforeEach(function() {
    var cells = "";
    for (var i = 0; i < 9; i++) { cells = cells + "<li></li>"; }
    game = new TTT.Game($(cells)); 
  });

  describe("mark", function() {
    beforeEach(function() {
      TTT.Game.prototype.play_sound_for_mark = function(mark) {};
    });

    describe("with an argument", function() {
      it("marks the given cell", function() {
        game.mark(game.cells[0], "X");
        expect($(game.cells[0]).text()).toEqual("X")
      });
    });

    describe("with no arguments", function() {
      describe("when the cell is marked", function() {
        it("returns the mark", function() {
          game.mark(game.cells[0], "X");
          expect(game.mark(game.cells[0])).toEqual("X")
        });
      });

      describe("when the cell is not marked", function() {
        it("returns null", function() {
          expect(game.mark(game.cells[0])).toEqual(null)
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
    it("returns the winning set of cell indexes if there is a win",  function() {
      game.mark(game.cells[0], "X");
      expect(game.check_for_win(game.cells[0])).toEqual(false);

      game.mark(game.cells[1], "X");
      expect(game.check_for_win(game.cells[1])).toEqual(false);

      game.mark(game.cells[2], "X");
      expect(game.check_for_win(game.cells[2])).toEqual([0,1,2]);
    });

    it("returns null if there is a draw",  function() {

      game.mark(game.cells[0], "X");
      expect(game.check_for_win(game.cells[0])).toEqual(false);
      game.mark(game.cells[1], "X");
      expect(game.check_for_win(game.cells[1])).toEqual(false);
      game.mark(game.cells[2], "O");
      expect(game.check_for_win(game.cells[2])).toEqual(false);
      game.mark(game.cells[3], "O");
      expect(game.check_for_win(game.cells[3])).toEqual(false);
      game.mark(game.cells[4], "X");
      expect(game.check_for_win(game.cells[4])).toEqual(false);
      game.mark(game.cells[5], "X");
      expect(game.check_for_win(game.cells[5])).toEqual(false);
      game.mark(game.cells[6], "X");
      expect(game.check_for_win(game.cells[6])).toEqual(false);
      game.mark(game.cells[7], "O");
      expect(game.check_for_win(game.cells[7])).toEqual(false);
      game.mark(game.cells[8], "O");
      expect(game.check_for_win(game.cells[8])).toEqual(null);
    });
  });

  describe("advance_turn", function() {
    it("increments the current turn", function() {
      game.turn = 0;
      game.advance_turn();
      expect(game.turn).toEqual(1);
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
