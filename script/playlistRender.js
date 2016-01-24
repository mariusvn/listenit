function render(divName, playlistId){

  //Json object
  var playlistJSON = getPlaylist(playlistId);
  var PLT = new playlist();
  PLT.create(jQuery.parseJSON(playlistJSON));

  $(divName).empty();
  var textToHtml = "<table border='1px'><tr><td id='channelRow'>Channel</td><td id='titleRow'>Title</td><td id='playRow'>Play</td></tr>";

  var trackInfo = new TrackInfos();
  var PLTArray = PLT.getPL()['playlist'];

  for(var i = 0; i < PLTArray.length; i++){

    var tempTrack = PLTArray[i];
    var title = trackInfo.getTrackTitle(tempTrack[0], tempTrack[1]);
    var author = trackInfo.getTrackAuthor(tempTrack[0], tempTrack[1]);
    textToHtml += "<tr><td>"+author+"</td><td>"+title+"</td><td><button onclick='start("+i+", "+playlistId+");'>Lire</button></td></tr>";
  }
  textToHtml += "</table>";
  $(divName).html(textToHtml);
}