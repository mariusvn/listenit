Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};

function playlistManager() {
    this.move = function (playlistId, baseIndex, nextIndex) {
        var pl = getPlaylist(playlistId);
        pl.playlist.move(baseIndex, nextIndex);
        var res = $.ajax({
            url: "api/updatePlaylist.php",
            method: "GET",
            data: {
                id: playlistId,
                plJson: JSON.stringify(pl)
            },
            success: function (resText) {
                res = jQuery.parseJSON(resText);
                if (res.status == "error") {
                    alert("error: " + resText);
                } else {
                    playlistPlaying.setPL(pl.playlist, baseIndex, nextIndex);
                    $('#add-form').fadeOut(250);
                    $('#bg-black').fadeOut(250);
                }
            }
        })

    };
    var getPlaylist = function (index) {

        var res = $.ajax({
            url: "api/playlistFinder.php",
            method: "GET",
            data: {
                ide: index
            },
            async: false
        }).responseText;
        res = jQuery.parseJSON(res);
        return res;

    }
    this.add = function(network, trackId, playlistId){
        var pl = getPlaylist(playlistId);
        pl.playlist.push([network, trackId]);
        var res = $.ajax({
            url: "api/updatePlaylist.php",
            method: "GET",
            data: {
                id: playlistId,
                plJson: JSON.stringify(pl)
            },
            success: function (resText){
                res = jQuery.parseJSON(resText);
                if(res.status == "error"){
                    displayError(resText);
                }else{
                    playlistPlaying.setPL(pl.playlist, 0, 0); // 0, 0 is to not modify the actual reading number
                }
            }
        })
    }
    this.remove = function(trackIndex, playlistID){
      var PL = getPlaylist(playlistID);
      PL.playlist.splice(trackIndex, 1);

      var res = $.ajax({
          url: "api/updatePlaylist.php",
          method: "GET",
          data: {
              id: playlistID,
              plJson: JSON.stringify(PL)
          },
          success: function (resText){
              res = jQuery.parseJSON(resText);
              if(res.status == "error"){
                  displayError(resText);
              }else{
                  playlistPlaying.setPL(PL.playlist, 0, 0); // 0, 0 is to not modify the actual reading number
              }
          }
      })
    }
    this.create = function(plName, musicId, musicNetwork){
        var res = $.ajax({
            url: "api/createPlaylist.php",
            method: "GET",
            data: {
                playlistName: plName
            },
            success: function(resText){
                res = jQuery.parseJSON(resText);
                if(res.status == "error"){
                    displayError(resText);
                }else{
                    //todo add the music to the playlist
                }
            }
        })
    }
}
function makeSortable(){
    var PlaylistManager = new playlistManager();
    var pos = [0, 0, 0];
    $('.playlistTable').sortable({
        items: "tr:not(.not_sortable)",
        start: function (event, ui) {
            pos[1] = ui.item.index() - 2;
            pos[0] = ui.item.parent(".playlistTable").children("#tablePlaylistId").val();
        },
        stop: function (event, ui) {
            pos[2] = ui.item.index() - 2;
            PlaylistManager.move(pos[0], pos[1], pos[2]);
        }
    });
}

function openAddMenu(network, trackId){
    var trackInfos = new TrackInfos();

    $("#title-w").html(trackInfos.getTrackTitle(network, trackId));
    $("#img-w").html("<img style='width:320px;height:180px;' src='" + trackInfos.getTrackThumb(network, trackId) + "'>");
    $("#add-btn-done").attr("onClick", 'new playlistManager().add("' + network + '","' + trackId + '", $("#playlist-selector").val(), function(){$(\"#add-form\").fadeOut(250);});');
    $('#bg-black').fadeIn(250);
    $("#add-form").fadeIn(250);

}

$(document).ready(function () {
    makeSortable();
});
