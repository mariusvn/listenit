var volume = 50;
function playlist(){

  var actTrack = 0;
  var array = null;

  this.create = function(array1){
    actTrack = 0;
    array = array1;
  }
  this.next = function(){
    actTrack = actTrack + 1;
    start(actTrack);
  }
  this.prev = function(){
    actTrack = actTrack - 1;
    start(actTrack);
  }
  this.start = function start(trackNumber){
    actTrack = trackNumber;
    if(actTrack < array.length && actTrack >= 0){
      console.log("next music");
      var track = array[actTrack];
      switch(track[0]){
        case "yt":
          console.log("YouTube");
          youtube.startPlayer(track[1]);
          document.body.addEventListener("onYTFinishEvent", function(){
            actTrack++;
            playerYT = null;
            start(actTrack);
          });

          break;
        case "sc":
          console.log("SoundCloud");
          soundcloud.startPlayer(track[1]);
          document.body.addEventListener("onSCFinishEvent", function(){
            actTrack++;
            widgetSC = null;
            start(actTrack);
          });
          break;
        default:
          console.log("type de réseau audio non déclaré");
          break;
      }
    }else{
      console.log("playlist finished");
    }
  }
  this.getPL = function getPL(){
    return array;
  }
  this.setVolume = function setVolume(){
    if(playerYT != null){
      playerYT.setVolume(volume);
    }else if(widgetSC != null){
      widgetSC.setVolume(volume/100);
    }else{
      console.log('error #95');
    }

  }
}

function getPlaylist(id){
  return $.ajax({
    url: "api/playlistFinder.php?ide="+id,
    async: false
  }).responseText;
}


function start(number, id){
  var playlistOBJ = jQuery.parseJSON(getPlaylist(id));
  var list = playlistOBJ.playlist;
  var playlistObj = new playlist();
  playlistObj.create(list);
  playlistObj.start(number);
}