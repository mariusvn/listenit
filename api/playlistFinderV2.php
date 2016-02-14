<?php
  if(!isset($_GET['ide']) || $_GET['ide'] == null ){
    die("no id");
  }
  include("sql.php");
  $db = connect();
  $id = htmlspecialchars($_GET['ide']);
  $stringQuery = "SELECT * FROM `playlists` WHERE `id`=$id";
  $playlist = $db->query($stringQuery)->fetchAll();
  echo(json_encode($playlist[0]));
?>
