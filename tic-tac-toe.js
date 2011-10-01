var TTT = {
  current_game: null,

  Game: function() {
    this.board = $('#board');
    this.cells = this.board.find('li');

    this.cells.click(function(e) {
      console.log(e);
    });
  }
};

// TTT.Game.prototype = { };

window.onload = function() {
  TTT.current_game = new TTT.Game();
};
