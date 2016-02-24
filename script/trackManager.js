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
