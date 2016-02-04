
var playerYT = null;

function youtube(){
  var YTFinishEvent = new CustomEvent("onYTFinishEvent");
  var YTPauseEvent = new CustomEvent("onYTPauseEvent");
  var YTPlayEvent = new CustomEvent("onYTPlayEvent");
  this.startPlayer = function(videoID){

    var playerDiv = $("#playerDiv");
    playerDiv.html('<iframe id="player" width="100%" height="200px" src="https://www.youtube.com/embed/'+videoID+'?&amp;autoplay=1&amp;theme=dark&amp;controls=1&amp;rel=0&amp;fs=0&amp;showinfo=0&amp;enablejsapi=1" frameborder="0" allowfullscreen></iframe>');
    playerYT = new YT.Player('player', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onStateChange
      }
    });
    console.log("Youtube player created");
  }
  var ready = false;
  var onPlayerReady = function(event){
    console.log("onPlayerReady released");
    ready = true;
    event.target.setVolume(volume);
    event.target.playVideo();
  }
  var onStateChange = function(event){
    if(event.data == YT.PlayerState.ENDED){
      var playerDiv = $("#playerDiv");
      playerDiv.empty();
      document.body.dispatchEvent(YTFinishEvent);
    }else if(event.data == YT.PlayerState.PAUSED){
      document.body.dispatchEvent(YTPauseEvent);
    }else if(event.data == YT.PlayerState.PLAYING){
      document.body.dispatchEvent(YTPlayEvent);
    }
  }
  this.pausePlayer = function(){
    if(playerYT.getPlayerState() == 1){
      playerYT.pauseVideo();
    }
  }
  this.playPlayer = function(){
    if(playerYT.getPlayerState() == 2 && ready){
      playerYT.playVideo();
    }
  }
}
var Youtube = new youtube();
