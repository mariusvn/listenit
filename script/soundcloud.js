var widgetSC = null;
//var list = [227701533, 96768400];
var isActive = false;

function soundcloud(){
    var SCFinishEvent = new CustomEvent("onSCFinishEvent");
    var SCPauseEvent = new CustomEvent("onSCPauseEvent");
    var SCPlayEvent = new CustomEvent("onSCPlayEvent");
  var stopSCPlayer = function(){
    var playerDiv = $("#playerDiv");
    playerDiv.empty();
    isActive = false;
    console.log("soundcloud player stopped");
  }

  this.startPlayer = function(id){
    var playerDiv = $("#playerDiv");
    playerDiv.html('<iframe id="player1" width="100%" height="200px" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+id+'&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;color=E9E9E9&amp;buying=false&amp;sharing=false&amp;download=false&amp;theme_color=000000&amp;show_artwork=false"></iframe>');
    isActive = true;
    widgetSC = SC.Widget(document.querySelector('#player1'));
    widgetSC.bind(SC.Widget.Events.READY,function(){
      widgetSC.setVolume(volume/100);
      widgetSC.play();
    });
    widgetSC.bind(SC.Widget.Events.PAUSE, function(){
        document.body.dispatchEvent(SCPauseEvent);
    });
    widgetSC.bind(SC.Widget.Events.PLAY,function(){
        document.body.dispatchEvent(SCPlayEvent);
    });
    widgetSC.bind(SC.Widget.Events.FINISH,function(){
      stopSCPlayer();
      document.body.dispatchEvent(SCFinishEvent);
    });
  }

  this.isPlaying = function(){

  }
  this.pausePlayer = function(){
      widgetSC.pause();
  }
  this.playPlayer = function(){
      widgetSC.play();
  }
}
var soundcloud = new soundcloud();
