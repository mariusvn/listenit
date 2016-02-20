
  function render(divName, playlistId) {

    //Json object
    var playlistJSON = getPlaylist(playlistId);
    var PLT = new Playlist();
    PLT.create(jQuery.parseJSON(playlistJSON));

    $(divName).empty();
    var textToHtml = "<tbody class='playlistTable'><input type='hidden' id='tablePlaylistId' name='playlistId' value='" + playlistId + "'/> <tr class='not_sortable'><td id='channelRow'>Channel</td><td id='titleRow'>Title</td><td class='playRow'>Play</td></tr>";

    var trackInfo = new TrackInfos();
    var PLTArray = jQuery.parseJSON(getPlaylist(playlistId)).playlist;

    for (var i = 0; i < PLTArray.length; i++) {

      var tempTrack = PLTArray[i];
      var title = trackInfo.getTrackTitle(tempTrack[0], tempTrack[1]);
      var author = trackInfo.getTrackAuthor(tempTrack[0], tempTrack[1]);
      textToHtml += "<tr class='draggable sortable'><td id='channelRow'>" + author + "</td><td id='titleRow'>" + title + "</td><td class='plerRow playRow'><a onclick='start(" + i + ", " + playlistId + ");'><img src='imgs/media23.png'/> </a></td></tr>";
    }
    textToHtml += "</tbody>";
    $(divName).html(textToHtml);
  }

  function trackName(divName) {
    var div = $(divName);
    var trackName = "";
    this.setTrackName = function (tn) {
      trackName = tn;
      this.actualize();
    };
    this.actualize = function () {
      div.html("<p id='trackTitle'>" + trackName + "</p>");
    }

  }
