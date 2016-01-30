$(document).ready()
{
  var volume = 50;
  var musicTitle = "";
  var musicStates = {
    play: 0,
    pause: 1,
    stop: 2
  };
  var musicState = musicStates.stop;
  var trackInfos = new TrackInfos();
  var playerTypes = {
    youtube: "yt",
    soundcloud: "sc",
    error: "error"
  };
  var playerType = playerTypes.error;

  function onPause() {
    console.log("State: pausing");
  }

  function onPlay() {
    console.log("State: playing");
  }

  function onStop() {
    console.log("State: stopping");
  }

  function playlist() {

    var actTrack = 0;
    var array = null;

    this.create = function (array1) {
      actTrack = 0;
      array = array1;
    }
    this.next = function () {
      actTrack = actTrack + 1;
      start(actTrack);
    }
    this.prev = function () {
      actTrack = actTrack - 1;
      start(actTrack);
    }
    this.start = function start(trackNumber) {
      var FinishEvent = new CustomEvent("onFinishEvent");
      var PauseEvent = new CustomEvent("onPauseEvent");
      var PlayEvent = new CustomEvent("onPlayEvent");
      document.body.addEventListener("onFinishEvent", function () {
        onStop();
      });
      document.body.addEventListener("onPauseEvent", function () {
        onPause();
      });
      document.body.addEventListener("onPlayEvent", function () {
        onPlay();
      });
      actTrack = trackNumber;
      if (actTrack < array.length && actTrack >= 0) {
        console.log("next music");
        var track = array[actTrack];
        switch (track[0]) {
          case "yt":
            console.log("YouTube");
            Youtube.startPlayer(track[1]);
            musicTitle = trackInfos.getTrackTitle(track[0], track[1]);
            txtRenderer.setTrackName(musicTitle);
            musicState = musicStates.play;
            playerType = playerTypes.youtube;
            document.body.addEventListener("onYTFinishEvent", function () {
              document.body.dispatchEvent(FinishEvent);
              actTrack++;
              playerYT = null;
              musicTitle = "";
              musicState = musicStates.stop;
              playerType = playerTypes.error;
              start(actTrack);
            });
            document.body.addEventListener("onYTPauseEvent", function () {
              document.body.dispatchEvent(PauseEvent);
              musicState = musicStates.pause;
            });
            document.body.addEventListener("onYTPlayEvent", function () {
              document.body.dispatchEvent(PlayEvent);
              musicState = musicStates.play;
            })
            break;
          case "sc":
            console.log("SoundCloud");
            soundcloud.startPlayer(track[1]);
            musicTitle = trackInfos.getTrackTitle(track[0], track[1]);
            txtRenderer.setTrackName(musicTitle);
            musicState = musicStates.play;
            playerType = playerTypes.soundcloud;
            document.body.addEventListener("onSCFinishEvent", function () {
              document.body.dispatchEvent(FinishEvent);
              actTrack++;
              widgetSC = null;
              musicTitle = "";
              musicState = musicStates.stop;
              playerType = playerTypes.error;
              start(actTrack);
            });
            document.body.addEventListener("onSCPauseEvent", function () {
              document.body.dispatchEvent(PauseEvent);
              musicState = musicStates.pause;
            });
            document.body.addEventListener("onSCPlayEvent", function () {
              document.body.dispatchEvent(PlayEvent);
              musicState = musicStates.play;
            })
            break;
          default:
            console.log("type de réseau audio non déclaré");
            break;
        }
      } else {
        console.log("playlist finished");
      }
    }
    this.getPL = function getPL() {
      return array;
    }
    this.setVolume = function setVolume() {
      if (playerYT != null) {
        playerYT.setVolume(volume);
      } else if (widgetSC != null) {
        widgetSC.setVolume(volume / 100);
      } else {
        console.log('error #95');
      }

    }
  }

  function getPlaylist(id) {
    return $.ajax({
      url: "api/playlistFinder.php?ide=" + id,
      async: false
    }).responseText;
  }


  function start(number, id) {
    var playlistOBJ = jQuery.parseJSON(getPlaylist(id));
    var list = playlistOBJ.playlist;
    var playlistObj = new playlist();
    playlistObj.create(list);
    playlistObj.start(number);
  }
}