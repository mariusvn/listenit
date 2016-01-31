<?php
  include("./api/sql.php");
  include("php/track.php");
  $db = connect();
?>
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <title>listenIt</title>
      <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
      <link rel="stylesheet" href="style/indexTest.css">
      <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
      <script src="https://w.soundcloud.com/player/api.js"></script>
      <script src="https://www.youtube.com/iframe_api"></script>
      <script src="script/TrackInfos.js"></script>
      <script src="script/soundcloud.js"></script>
      <script src="script/youtube.js"></script>
      <script src="script/playlist.js"></script>
      <script src="script/playlistRender.js"></script>
      <script src="script/userPlaylist.js"></script>
      <script src="script/playerButton.js"></script>
      <script src="script/playlistModif.js"></script>

    <style>

    </style>
  </head>
  <body>
    <div id="TrackName"></div>
    <div id="playerDiv" >

    </div>

    <button onclick='start(0, 1);'>Start playlist</button>
    <div id="tab"></div><br/>
    <button onclick='start(0, 2);'>Start playlist</button>
    <div id="tab2"></div><br/>
    <button onclick="start(0, 4);">Start playlist</button>
    <div id="tab3"></div><br/>


    <script>
        $(document).ready()
        {
            function hideLoading(){
                $('#loading').fadeOut();
            }
            render("#tab", 1);
            render("#tab2", 2);
            render("#tab3", 4);
            var txtRenderer = new trackName("#TrackName");
            setTimeout(function(){
                hideLoading();
            }, 1000);


        }
    </script>
  </body>
</html>
