function trackName(divName) {
  var div = $(divName);
  var trackName = "";
  this.setTrackName = function (tn) {
    trackName = tn;
    div.html("<p id='trackTitle'>" + trackName + "</p>");
  };
  this.actualize = function () {
    div.html("<p id='trackTitle'>" + trackName + "</p>");
  }
}
