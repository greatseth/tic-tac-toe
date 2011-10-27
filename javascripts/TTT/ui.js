TTT.UI = {
  setup_game: function(game) {
    game.set_cells($("#board li"));

    game.cells.click(function(e) {
      var c    = $(e.target);
      var mark = game.mark_for_turn();

      if (!game.mark(c)) {
        game.mark(c, mark);

        if (!game.check_for_win()) {
          game.advance_turn();
        }
      }

      return false;
    });

    game.callbacks.turn = function() {
      $(".player.active").removeClass("active");
      $("#player_" + this.mark_for_turn()).addClass("active");
    };

    game.callbacks.mark = function(cell, mark) {
      cell.addClass("marked");
      var phonetone = this.cells.index(cell[0]) + 1;
      this.play_audio(phonetone);
    };

    game.callbacks.draw = function() {
      this.play_audio("Sad-Trombone");
      $(".player").removeClass("active");
      $("#notice").text("It's a draw!");
    };

    game.callbacks.win = function(winning_set) {

      this.play_audio("applause");
      $(".player").removeClass("active");
      for (var i = 0; i < winning_set.length; i++) {
        $(this.cells[winning_set[i]]).addClass("winner");
      }
      $("#notice").text(this.mark_for_turn() + " wins!");
    };


    for (var i = 0; i < TTT.UI.sounds.length; i++) {
      game.load_audio(TTT.UI.sounds[i]);
    }

    game.advance_turn();
  },

  sounds: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "Sad-Trombone",
    "applause"
  ],

  observe_mute: function() {
    var mute = $("#mute");

    if (TTT.current_game.mute) {
      mute.attr("checked", "checked");
    }

    mute.click(function() {
      TTT.current_game.mute = !$(this).attr("checked");
    });
  },

  load: function() {
    TTT.current_game = new TTT.Game(TTT.UI.setup_game);
    TTT.UI.observe_mute();
  }
};
