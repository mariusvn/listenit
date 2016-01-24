<?php
class Track{

  function getTrackTitle($network, $id){
    ini_set('memory_limit','-1');
    if($network == "yt"){
      $file = file_get_contents('https://www.googleapis.com/youtube/v3/videos?id='.$id.'&key=AIzaSyBgskTMHaLUgFb4v60Ehrf1gzHZSFUOCjI&part=snippet');
      $decoded = json_decode($file);
      $decoded = $decoded->items[0]->snippet->title;
      return $decoded;
    }elseif($network == "sc"){
      $file = file_get_contents('http://api.soundcloud.com/tracks/'.$id.'?client_id=2d28682500313c875bb5bbd8fe96ebad');
      $decoded = json_decode($file);
      return $decoded->title;
    }
  }

  function getTrackAuthor($network, $id){
    ini_set('memory_limit','-1');
    if($network == "yt"){
      $file = file_get_contents('https://www.googleapis.com/youtube/v3/videos?id='.$id.'&key=AIzaSyBgskTMHaLUgFb4v60Ehrf1gzHZSFUOCjI&part=snippet');
      $decoded = json_decode($file);
      $decoded = $decoded->items[0]->snippet->channelTitle;
      return $decoded;
    }elseif($network == "sc"){
      $file = file_get_contents('http://api.soundcloud.com/tracks/'.$id.'?client_id=2d28682500313c875bb5bbd8fe96ebad');
      $decoded = json_decode($file);
      return $decoded->user->username;
    }
  }
}

?>
