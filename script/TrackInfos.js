
function TrackInfos(){
  this.create = function(){}
  this.getTrackTitle = function(network, id){
    switch(network){
      case "yt":
        var ret = $.ajax({
          url: "https://www.googleapis.com/youtube/v3/videos?id="+id+"&key=AIzaSyBgskTMHaLUgFb4v60Ehrf1gzHZSFUOCjI&part=snippet",
          async: false
        }).responseText;
        ret = jQuery.parseJSON(ret);
        ret = ret.items[0].snippet.title;
        return ret;
        break;
      case "sc":
        var ret = $.ajax({
          url: "http://api.soundcloud.com/tracks/"+id+"?client_id=2d28682500313c875bb5bbd8fe96ebad",
          async: false
        }).responseText;
        ret = jQuery.parseJSON(ret);
        ret = ret.title;
        return ret;
        break;
      default:
        return null;
    }
  }
  this.getTrackAuthor = function(network, id){
    switch (network) {
      case "yt":
        var ret = $.ajax({
          url: "https://www.googleapis.com/youtube/v3/videos?id="+id+"&key=AIzaSyBgskTMHaLUgFb4v60Ehrf1gzHZSFUOCjI&part=snippet",
          async: false
        }).responseText;
        ret = jQuery.parseJSON(ret);
        ret = ret.items[0].snippet.channelTitle;
        return ret;
        break;
      case "sc":
        var ret = $.ajax({
          url: "http://api.soundcloud.com/tracks/"+id+"?client_id=2d28682500313c875bb5bbd8fe96ebad",
          async: false
        }).responseText;
        ret = jQuery.parseJSON(ret);
        ret = ret.user.username;
        return ret;
        break;
      default:
        return null;
    }
  }
}
