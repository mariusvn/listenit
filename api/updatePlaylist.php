<?php

include("sql.php");
include("web.php");

$db = connect();
$apiHandler = new web();

$json = array("status" => "null", "details" => "null");

if(isset($_GET['id']) && $_GET['id'] != ""){
    if(isset($_GET['plJson']) && $_GET['plJson'] != "") {
        if (is_numeric($_GET["id"])) {
            $queryS = "SELECT * FROM `playlists` WHERE `id`=" . $_GET['id'] . ";";
            $query = $db->query($queryS);
            if ($query) {
                $query = $query->fetchAll();
                if (count($query) > 0) {
                      //public or not displayed
                      $res = $db->query("UPDATE `playlists` SET `Playlist`='".$_GET['plJson']."' WHERE `id`=".$_GET['id'].";");
                      if(!$res){
                          //SQLError
                          $json = array("status" => "error", "details" => "SQLError.1");
                          die(json_encode($json));
                      }
                      //SUCCESS
                      $json = array("status" => "valid", "details" => "success");
                      die(json_encode($json));

                } else {
                    //PLAYLIST NOT EXISTS
                    $json = array("status" => "error", "details" => "Playlist.notExists");
                    die(json_encode($json));
                }
            } else {
                //SQLError
                $json = array("status" => "error", "details" => "SQLError.0");
                die(json_encode($json));
            }
        } else {
            //ID NOT NUMERIC
            $json = array("status" => "error", "details" => "id.NaN");
            die(json_encode($json));
        }
    }else{
        //PLAYLIST EMPTY
        $json = array("status" => "error", "details" => "Playlist.empty");
        die(json_encode($json));
    }
}else{
    // ID EMPTY
    $json = array("status" => "error", "details" => "id.empty");
    die(json_encode($json));
}

?>
