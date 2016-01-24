var widgetSC = null;
//var list = [227701533, 96768400];
var isActive = false;
var SCFinishEvent = new CustomEvent("onSCFinishEvent");
function soundcloud(){

  var stopSCPlayer = function(){
    var playerDiv = $("#playerDiv");
    playerDiv.empty();
    isActive = false;
    console.log("soundcloud player stopped");
  }

  this.startPlayer = function(id){
    var playerDiv = $("#playerDiv");
    playerDiv.html('<iframe id="player1" width="560px" height="315px" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+id+'&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>');
    isActive = true;
    widgetSC = SC.Widget(document.querySelector('#player1'));
    widgetSC.bind(SC.Widget.Events.READY,function(){
      widgetSC.setVolume(volume/100);
      widgetSC.play();
    });

    widgetSC.bind(SC.Widget.Events.FINISH,function(){
      stopSCPlayer();
      document.body.dispatchEvent(SCFinishEvent);
    });
  }

  this.isPlaying = function(){

  }
}
var soundcloud = new soundcloud();
