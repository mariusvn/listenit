<?php
  include("sql.php");
  include("php/track.php");
  //include("php/playlist.php");&abc
  $db = connect();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>listenIt</title>
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://w.soundcloud.com/player/api.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="script/soundcloud.js"></script>
    <script src="script/youtube.js"></script>
    <script src="script/playlist.js"></script>
    <script src="script/playlistRender.js"></script>
    <script src="script/TrackInfos.js"></script>
    <script>

    </script>
  </head>
  <body>
    <div id="playerDiv" height="168" width="302" draggable="true">

    </div>
    <button onclick='start(0, 1);'>Start playlist</button>
    <div id="tab"></div>
    <button onclick='start(0, 2);'>Start playlist</button>
    <div id="tab2"></div>
    <script>
    render("#tab", 1);
    render("#tab2", 2);
    </script>

  </body>
</html>
