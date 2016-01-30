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

      <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
      <script src="https://w.soundcloud.com/player/api.js"></script>
      <script src="https://www.youtube.com/iframe_api"></script>
      <script src="script/TrackInfos.js"></script>
      <script src="script/soundcloud.js"></script>
      <script src="script/youtube.js"></script>
      <script src="script/playlist.js"></script>
      <script src="script/playlistRender.js"></script>
      <script src="script/userPlaylist.js"></script>
      <script src="script/playerButton.js"></script>

    <style>
      *{
          font-family: Arial;
      }
      #playerDiv{
        border: solid 1px;
        height: 315px;
        width: 560px;
        margin: 20px;
      }
      #channelRow{
        width: 170px;
      }
      #titleRow{
        width: 450px;
      }
      #loading{
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(44, 62, 80,1);
          transition: display 0.5s;
      }
      #loading #ldingCen  {
          margin-left: calc(50% - 150px);
          margin-top: calc(50vh - 150px);
          text-align: center;
          color: #bdc3c7;
          font-family: Arial;
          width: 300px;
          font-size: 20px;
          font-weight: bold;
      }
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
