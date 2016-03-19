function renderPlaylistv2(divHolder, playlistID){

  //VARS & OBJS
  var playlistC = getPlaylistV2(playlistID);
  var playlistO = new Playlist();
  var playlistParsed = jQuery.parseJSON(playlistC);

  playlistO.create(jQuery.parseJSON(playlistParsed[2]).playlist);

  var playlistOBJ = jQuery.parseJSON(playlistParsed[2]).playlist;
  var playlistTitle = playlistParsed[4];
  var trackInfo = new TrackInfos();

  var renderedHtml = "";
  renderedHtml += '<div class="playlist-item">';
    renderedHtml += '<div class="playlist-item-title">';
      renderedHtml += playlistTitle;
      renderedHtml += '<button class="play-btn" onClick="start(0, ' + playlistID + ');">Lire</button>';
      renderedHtml += '<button class="theater-btn" onClick="startTH(' + playlistID + '); renderPlaylistTH(' + playlistID + ');">Mode theatre</button>';
      renderedHtml += '<button class="rem-btn" onClick="var mge = new playlistManager(); mge.removePlaylist(' + playlistID + ');">Supprimer</button>';
    renderedHtml += '</div>';
    renderedHtml += "<table>";
      renderedHtml += '<tbody class="playlistTable">';
        renderedHtml += '<input type="hidden" id="tablePlaylistId" name="playlistId" value="' + playlistID + '"/>';
        renderedHtml += '<tr class="not_sortable"><td id="row">#</td><td id="channelRow">Channel</td><td id="titleRow">Title</td>';
        for (var i = 0; i < jQuery.parseJSON(playlistParsed[2]).playlist.length; i++) {
          var tempTrack = jQuery.parseJSON(playlistParsed[2]).playlist[i];
          var title = trackInfo.getTrackTitle(tempTrack[0], tempTrack[1]);
          var author = trackInfo.getTrackAuthor(tempTrack[0], tempTrack[1]);
          renderedHtml += "<tr class='draggable sortable' onClick='start(" + i + ", " + playlistID + ");'>";
            renderedHtml += "<td>#" + (i + 1) + "</td>";
            renderedHtml += "<td id='channelRow'>" + author + "</td>";
            renderedHtml += "<td id='titleRow'>" + title + "</td>";
            renderedHtml += "<input type='hidden' name='track-id' id='track-id' value='" + tempTrack[1] + "'/>";
            renderedHtml += "<input type='hidden' name='track-network' id='track-network' value='" + tempTrack[0] + "'/> ";
            renderedHtml += "<input type='hidden' name='ply-index' id='ply-index' value='" + i + "' />";
            renderedHtml += "<input type='hidden' name='ply-id' id='ply-id' value='" + playlistID + "' />";
          renderedHtml += "</tr>";
        }
        renderedHtml += "</tbody>";
      renderedHtml += "</table>";
    renderedHtml += "</div>";
    $(divHolder).append(renderedHtml);
}
function getPlaylistV2(id) {
    return $.ajax({
        url: "api/playlistFinderV2.php?ide=" + id,
        async: false
    }).responseText;
}
