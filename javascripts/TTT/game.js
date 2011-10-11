// depends on jQuery

TTT.Game = function(configuration) {
  this.callbacks = {};
  if (configuration) { configuration(this); }
  this.advance_turn();
};

TTT.Game.STATES = {
  WIN:  "WIN",
  DRAW: "DRAW"
};

TTT.Game.prototype = {
  callback_defined: function(callback_name) {
    return (this.callbacks[callback_name] !== undefined);
  },

  run_callback: function() {
    var args = Array.prototype.slice.call(arguments);
    var callback_name = args.shift();

    if (this.callback_defined(callback_name)) {
      this.callbacks[callback_name].apply(this, args);
    }
  },

  mute: false,

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

  set_cells: function(cells) {
    this.cells = cells;

    $.each(this.cells, function(i,c) {
      $(c).data("index", i).text("");
    });
  },

  advance_turn: function() {
    if (this.turn === undefined) { this.turn = 0; }
    this.turn = this.turn + 1;
    this.run_callback('turn');
    return this.turn;
  },

  o_turn: function() {
    return ((this.turn % 2) === 0);
  },

  x_turn: function() {
    return !(this.o_turn());
  },

  mark_for_turn: function() {
    return (this.x_turn() ? "X" : "O");
  },

  mark: function(cell, mark) {
    if (typeof(cell.text) !== 'function') { cell = $(cell); }

    if (mark) {
      cell.text(mark);
      this.run_callback('mark', cell, mark);
    }


    if (cell.text() !== "") {
      return cell.text();
    } else {
      return null;
    }
  },

  check_for_win: function() {
    // first, check for a win
    var win          = false;
    var mark         = this.mark_for_turn();

    var possible_win_set, winning_set;

    for (var i = 0; i < this.wins.length; i++) {
      possible_win_set = this.wins[i];

      win = ( $(this.cells[possible_win_set[0]]).text() == mark &&
              $(this.cells[possible_win_set[1]]).text() == mark &&
              $(this.cells[possible_win_set[2]]).text() == mark );

      if (win) {
        winning_set = possible_win_set;
        break;
      }
    }

    if (win) {
      this.run_callback('win', winning_set);

      return {
        state: TTT.Game.STATES.WIN,
        winning_set: winning_set
      };
    }

    // now, check for a draw
    var draw = true;

    $.each(this.cells, function(i,c) {
      if ("" === $(c).text()) {
        draw = false;
      }
    });

    if (draw) {
      this.run_callback('draw');

      return {
        state: TTT.Game.STATES.DRAW
      };
    }

    return null;
  },

  load_audio: function(basename) {
    var sound = new Audio();

    if (sound.canPlayType("audio/mpeg")) {
      sound.src = "audio/" + basename + ".mp3";
    } else {
      sound.src = "audio/" + basename + ".ogg";
    }

    sound.load();

    if (!this.audio) { this.audio = {}; }
    this.audio[basename] = sound;

    return sound;
  },

  play_audio: function(basename) {
    if (this.mute) { return; }
    this.audio[basename].play();
  }
};
