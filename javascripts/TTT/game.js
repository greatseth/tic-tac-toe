TTT.reset_game = function() {
  TTT.current_game = new TTT.Game($("#board li"));
}

TTT.Game = function(cells) {
  var game = this;

  game.turn  = 1;
  game.set_cells(cells);

  game.cells.click(function(e) {
    var c = $(e.target);

    if (!game.mark(c)) {
      game.mark(c, game.x_turn() ? "X" : "O");
      
      // TODO this is a nightmare API done while sleep deprived. Fix.
      var game_state = game.check_for_win(c);

      if (null === game_state) {
        if (confirm("It's a draw! Reset?")) {
          TTT.reset_game();
        }
      } else if (game_state.length) {
        if (confirm(game.mark(c) + " wins! Reset?")) {
          TTT.reset_game();
        }
      } else {
        game.advance_turn();
      }
    }
    
    return false;
  });

  this.audio = {}
  var audio = this.audio;

  $.each(["X", "O"], function(i,mark) {
    audio[mark] = new Audio();

    if (audio[mark].canPlayType("audio/mpeg")) {
      audio[mark].src = "audio/" + mark + ".mp3";
    } else {
      audio[mark].src = "audio/" + mark + ".ogg";
    }

    audio[mark].load();
  });
}

TTT.Game.prototype = {
  wins: [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
  ],

  wins_index: {
    "0": [0,3,6],
    "1": [0,4],
    "2": [0,5,7],
    "3": [1,3],
    "4": [1,4,6,7],
    "5": [1,5],
    "6": [2,3,7],
    "7": [2,4],
    "8": [2,5,6]
  },

  set_cells: function(cells) {
    this.cells = cells;

    $.each(this.cells, function(i,c) {
      $(c).data("index", i).text("");
    });
  },

  advance_turn: function() {
    this.turn = this.turn + 1;
  },

  o_turn: function() {
    return ((this.turn % 2) === 0);
  },

  x_turn: function() {
    return !(this.o_turn());
  },

  mark: function(cell, mark) {
    if (typeof(cell.text) !== 'function') {
      cell = $(cell);
    }

    if (mark) {
      cell.text(mark);
      this.play_sound_for_mark(mark);
    }

    if (cell.text() !== "") {
      return cell.text();
    } else {
      return null;
    }
  },

  play_sound_for_mark: function(mark) {
    this.audio[mark].play();
  },

  check_for_win: function(cell) {
    if (typeof(cell.text) !== 'function') {
      cell = $(cell);
    }

    // first, check for a win
    var win          = false;
    var mark         = cell.text();
    var marked_index = cell.data("index");

    var possible_win_set_indexes = this.wins_index[marked_index];

    for (var i = 0; i < possible_win_set_indexes.length; i++) {
      var possible_win_set_index = possible_win_set_indexes[i];
      var possible_win_set       = this.wins[possible_win_set_index];

      win = ( $(this.cells[possible_win_set[0]]).text() == mark &&
              $(this.cells[possible_win_set[1]]).text() == mark &&
              $(this.cells[possible_win_set[2]]).text() == mark );

      if (win) { break; }
    }

    if (win) {
      return possible_win_set;
    }

    // now, check for a draw
    var draw = true;
    
    $.each(this.cells, function(i,c) {
      if ("" === $(c).text()) {
        draw = false;
      }
    });

    if (draw) return null;
    return false;
  }
};
