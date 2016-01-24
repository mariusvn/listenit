var YTFinishEvent = new CustomEvent("onYTFinishEvent");
var playerYT = null;
function youtube(){

  this.startPlayer = function(videoID){

    var playerDiv = $("#playerDiv");
    playerDiv.html('<iframe id="player" width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'?&amp;autoplay=0&amp;theme=dark&amp;enablejsapi=1" frameborder="0" allowfullscreen></iframe>');
    playerYT = new YT.Player('player', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onStateChange
      }
    });
    console.log("Youtube player created");
  }
  var onPlayerReady = function(event){
    console.log("onPlayerReady released");
    event.target.setVolume(volume);
    event.target.playVideo();
  }
  var onStateChange = function(event){
    if(event.data == YT.PlayerState.ENDED){
      var playerDiv = $("#playerDiv");
      playerDiv.empty();
      document.body.dispatchEvent(YTFinishEvent);
    }
  }
  this.pausePlayer = function(){
    if(playerYT.getPlayerState() == 1){
      playerYT.pauseVideo();
    }
  }
}
var youtube = new youtube();
