// based on http://www.storiesinflight.com/html5/audio.html

var TTT.UI.Audio = {
  channel_max: 10,									

	audiochannels: [],

  prepare_audio_channels: function() {
    for (var a = 0; a < channel_max; a++) {
      TTT.UI.Audio.audiochannels[a] = new Array();
      TTT.UI.Audio.audiochannels[a]['channel'] = new Audio();
      TTT.UI.Audio.audiochannels[a]['finished'] = -1;
    }
  },

	play_multi_sound: function(s) {
		for (var a = 0; a < TTT.UI.Audio.audiochannels.length; a++) {
			thistime = new Date();

			if (TTT.UI.Audio.audiochannels[a]['finished'] < thistime.getTime()) {
				TTT.UI.Audio.audiochannels[a]['finished'] = thistime.getTime() + 
          document.getElementById(s).duration * 1000;

				TTT.UI.Audio.audiochannels[a]['channel'].src = document.getElementById(s).src;
				TTT.UI.Audio.audiochannels[a]['channel'].load();
				TTT.UI.Audio.audiochannels[a]['channel'].play();
				break;
			}
		}
	}
};
