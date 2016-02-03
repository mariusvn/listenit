<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <style>
      *{padding:0;margin:0;overflow:hidden;}
      #wrapper{
        position:relative;
        left:50%;

        width:4096px;
        transition:2s;
        position:absolute;
      }
      #login{
        float:left;
        background-color:green;
        padding:25px;
        height: 10%;
        width:200px;
      }
      #register{
        float:right;
        background-color:yellow;
        padding:25px;
        height: 10%;
        width:200px;
      }
      .right{
        transform: translate(-3846px, 0);
      }
      .left{
        transform: translate(0, 0);
      }
      #player-holder{
        display:none;
      }
      #playlist{
        padding:15px;
        background-color:red;
      }
      #player{
        float:left;

      }
      #tracklist{
        float:left;
      }
      .clearfix{
        clear:both;
      }
    </style>
    <script>
      function right(){
        $('#wrapper').removeClass('left').addClass('right');
      }
      function left(){
        $('#wrapper').removeClass('right').addClass('left');
      }
      $(document).ready(function(){
        $("#playlist").click(function(){
          var ret = ($('#player-holder').css('display') == "none") ? "block" : "none";
          $('#player-holder').css('display', ret);
        });
      });

    </script>
  </head>
  <body>
    <div id="wrapper">
      <div id="login"></div>
      <div id="register"></div>
      <div style="clear:both;"></div>
    </div>
    <button onClick="right()">Right</button>
    <button onClick="left()">Left</button>

    <div id="playlist">
      <span>TITRE</span>
      <div id="player-holder">
        <div id="player">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/PVbQDYzPRYQ" frameborder="0" allowfullscreen></iframe>
        </div>
        <div id="tracklist">
          <table>
            <tr><td>TEST</td></tr>
            <tr><td>TEST2</td></tr>
            <tr><td>TEST3</td></tr>
          </table>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </body>
</html>
