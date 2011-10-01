var TTT = {
  current_game: null,

  Game: function() {
    var game = this;

    game.turn  = 1;
    game.board = $('#board');
    game.cells = game.board.find('li');

    game.cells.click(function(e) {
      var c = $(e.target);

      if (!game.mark(c)) {
        game.mark(c, game.x_turn() ? "X" : "O");
        game.advance_turn();
      } else {
        return;
      }
    });
  }
};

TTT.Game.prototype = {
  o_turn: function() {
    return ((this.turn % 2) == 0);
  },

  x_turn: function() {
    return !(this.o_turn());
  },

  mark: function(cell, mark) {
    if (mark) {
      cell.text(mark);
    } else {
      cell.text();
    }

    return (cell.text() !== "");
  },

  advance_turn: function() {
    this.turn = this.turn + 1;
  }
};

window.onload = function() {
  TTT.current_game = new TTT.Game();
};
