$(document).ready()
{
    var playlistPlaying = null;
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
            playlistPlaying = this;
            actTrack = 0;
            array = array1;
        };
        this.next = function () {
            actTrack = actTrack + 1;
            start(actTrack);
        };
        this.prev = function () {
            actTrack = actTrack - 1;
            start(actTrack);
        };
        this.start = function start(trackNumber) {
            var FinishEvent = new CustomEvent("onFinishEvent");
            var PauseEvent = new CustomEvent("onPauseEvent");
            var PlayEvent = new CustomEvent("onPlayEvent");
            document.body.addEventListener("onFinishEvent", onStop);
            document.body.addEventListener("onPauseEvent", onPause);
            document.body.addEventListener("onPlayEvent", onPlay);
            actTrack = trackNumber;
            if (actTrack < array.length && actTrack >= 0) {
                console.log("next music: " + actTrack);
                var track = array[actTrack];
                switch (track[0]) {
                    case "yt":
                        console.log("YouTube");
                        Youtube.startPlayer(track[1]);
                        musicTitle = trackInfos.getTrackTitle(track[0], track[1]);
                        txtRenderer.setTrackName(musicTitle);
                        musicState = musicStates.play;
                        playerType = playerTypes.youtube;
                        var YTfinishHandler = function(){
                            document.body.dispatchEvent(FinishEvent);
                            actTrack++;
                            playerYT = null;
                            musicTitle = "";
                            musicState = musicStates.stop;
                            playerType = playerTypes.error;
                            document.body.removeEventListener("onYTFinishEvent", YTfinishHandler);
                            document.body.removeEventListener("onYTPauseEvent", YTPauseHandler);
                            document.body.removeEventListener("onYTPlayEvent", YTPlayHandler);
                            document.body.removeEventListener("onFinishEvent", onStop);
                            document.body.removeEventListener("onPauseEvent", onPause);
                            document.body.removeEventListener("onPlayEvent", onPlay);
                            start(actTrack);
                        };
                        document.body.addEventListener("onYTFinishEvent", YTfinishHandler);
                        var YTPauseHandler =  function(){
                            document.body.dispatchEvent(PauseEvent);
                            musicState = musicStates.pause;
                        };
                        document.body.addEventListener("onYTPauseEvent", YTPauseHandler);
                        var YTPlayHandler = function(){
                            document.body.dispatchEvent(PlayEvent);
                            musicState = musicStates.play;
                        };
                        document.body.addEventListener("onYTPlayEvent", YTPlayHandler);
                        break;
                    case "sc":
                        console.log("SoundCloud");
                        soundcloud.startPlayer(track[1]);
                        musicTitle = trackInfos.getTrackTitle(track[0], track[1]);
                        txtRenderer.setTrackName(musicTitle);
                        musicState = musicStates.play;
                        playerType = playerTypes.soundcloud;
                        var SCFinishHandler = function(){
                            document.body.dispatchEvent(FinishEvent);
                            actTrack++;
                            widgetSC = null;
                            musicTitle = "";
                            musicState = musicStates.stop;
                            playerType = playerTypes.error;
                            document.body.removeEventListener("onSCFinishEvent", SCFinishHandler);
                            document.body.removeEventListener("onSCPauseEvent", SCPauseHandler);
                            document.body.removeEventListener("onSCPlayEvent", SCPlayHandler);
                            document.body.removeEventListener("onFinishEvent", onStop);
                            document.body.removeEventListener("onPauseEvent", onPause);
                            document.body.removeEventListener("onPlayEvent", onPlay);
                            start(actTrack);
                        };
                        document.body.addEventListener("onSCFinishEvent", SCFinishHandler);
                        var SCPauseHandler = function(){
                            document.body.dispatchEvent(PauseEvent);
                            musicState = musicStates.pause;
                        };
                        document.body.addEventListener("onSCPauseEvent", SCPauseHandler);
                        var SCPlayHandler = function(){
                            document.body.dispatchEvent(PlayEvent);
                            musicState = musicStates.play;
                        };
                        document.body.addEventListener("onSCPlayEvent", SCPlayHandler);
                        break;
                    default:
                        console.log("type de réseau audio non déclaré");
                        break;
                }
            } else {
                console.log("playlist finished");
            }
        };
        this.getPL = function getPL() {
            return array;
        };
        this.setVolume = function setVolume() {
            if (playerYT != null) {
                playerYT.setVolume(volume);
            } else if (widgetSC != null) {
                widgetSC.setVolume(volume / 100);
            } else {
                console.log('error #95');
            }

        };
        this.setPL = function (arrayPl, lastIndex, newIndex) {
            if(lastIndex == newIndex)
                return;
            array = arrayPl;
            if (lastIndex == actTrack) {
                actTrack = newIndex;
            } else if (lastIndex < actTrack && actTrack < newIndex) {
                actTrack--;
            } else if (lastIndex > actTrack && actTrack > newIndex) {
                actTrack++;
            } else if (newIndex == actTrack) {
                actTrack++;
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