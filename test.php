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
    </style>
    <script>
      function right(){
        $('#wrapper').removeClass('left').addClass('right');
      }
      function left(){
        $('#wrapper').removeClass('right').addClass('left');
      }
    </script>
  </head>
  <body>
    <div id="wrapper">
      <div id="login"></div>
      <div id="register"></div>
      <div style="clear:both;"></div>
    </div>
  </br>
  </br>
  </br>
  </br>
    <button onClick="right()">Right</button>
    <button onClick="left()">Left</button>
    <?php
      session_start();
    var_dump($_SESSION['user']);
    include('api/web.php');
    include('api/sql.php');
    $apiH = new web();
    $db = connect();
    echo $apiH->ConnValid($_SESSION['user'], $db);
    ?>
  </body>
</html>
