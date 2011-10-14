TTT.UI = {
  setup_game: function(game) {
    game.mute = true;

    game.set_cells($("#board li"));

    game.cells.click(function(e) {
      var c    = $(e.target);
      var mark = game.mark_for_turn();

      if (!game.mark(c)) {
        game.mark(c, mark);
        // TODO mark callback

        if (!game.check_for_win()) {
          game.advance_turn();
        }
      }

      return false;
    }); // cells.click

    game.callbacks.turn = function() {
      $(".player.active").removeClass("active");
      $("#player_" + this.mark_for_turn()).addClass("active");
    };

    game.callbacks.mark = function(cell, mark) {
      cell.addClass("marked");
      this.play_audio(mark);
    };

    game.callbacks.draw = function() {
      this.play_audio("Sad-Trombone");
      $("#notice").text("It's a draw!");
    };

    game.callbacks.win = function(winning_set) {
      for (var i = 0; i < winning_set.length; i++) {
        $(this.cells[winning_set[i]]).addClass("winner");
      }

      this.play_audio("applause");

      $("#notice").text(this.mark_for_turn() + " wins!");
    };

    $.each(["X", "O", "Sad-Trombone", "applause"], function(i, basename) {
      game.load_audio(basename);
    });
  },

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
