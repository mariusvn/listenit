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
}


$(document).ready(function () {
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


});
