
function userPlaylist(){
    /*
     * getUserTrack(uuid, persission)
     * uuid = user unique id
     * permission = level of permission of the Playlist:    0: public
     *                                                      1: not displayed
     *                                                      2: private
     */
    this.getUserPlaylist = function(uuid, permission){

        var res = $.ajax({
            url: "api/userPlaylist.php",
            method: 'GET',
            async: false,
            data: {
                "uuid": uuid,
                "key": "h8RK9ZSNZRdAvrgc",
                "perm": permission
            }
        }).responseText;
        res = jQuery.parseJSON(res);
        if(res.success){
            return res.result;
        }else{
            return [];
        }
    }
}