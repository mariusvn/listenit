$(document).ready(function(){
  $('.closer').click(function(){
    $('.theater-mode').fadeOut(250);
    $('.theater-black').fadeOut(250);
  });
});

function renderPlaylistTH(playlistID){

  //OBJECTS
  var PlaylistC = getPlaylistV2(playlistID);
  var PlaylistO = new Playlist();
  var PlaylistP = $.parseJSON(PlaylistC);
  var PlaylistOB = $.parseJSON(PlaylistP[2]).playlist;

  //UTILS
  PlaylistO.create(PlaylistOB);
  var TrackI = new TrackInfos();

  var renderedHtml = "";

  renderedHtml += '<table>';
    renderedHtml += '<tbody class="playlistTable" style="color: white;  font-family: Lato;  margin: 0;  width: initial;">';
    renderedHtml += '<input type="hidden" id="tablePlaylistId" name="playlistId" value="' + playlistID + '"/>';
    renderedHtml += '<tr class="not_sortable"><td id="channelRow">Channel</td><td id="titleRow">Title</td>';

    for (var i = 0; i < jQuery.parseJSON(PlaylistP[2]).playlist.length; i++) {
      /**
       * Tracking
       */
      var tempTrack = jQuery.parseJSON(PlaylistP[2]).playlist[i];
      var title = TrackI.getTrackTitle(tempTrack[0], tempTrack[1]);
      var author = TrackI.getTrackAuthor(tempTrack[0], tempTrack[1]);

      renderedHtml += "<tr class='draggable sortable' onClick='start(" + i + ", " + playlistID + ");'>";
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

  $('#track-list-2').html(renderedHtml);
}
/**
 * TODO
 */
$( document ).setTimeout(function(){
  if(playlistPlaying !== "undefined" && playlistPlaying !== "null"){

    var TrackID = playlistPlaying.getCurrentTrackID();

    if($('input[value="' + TrackID + '"] #track-id').parent('tr'.hasClass("CurrentPL"))){

      return;

    }else{

      $('.CurrentPL').removeClass('CurrentPL');
      $('input[value="' + TrackID + '"] #track-id').parent('tr').addClass('CurrentPL');

    }

  }

}, 100);