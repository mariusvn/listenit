<?php

include("sql.php");
include("web.php");

$db = connect();
$apiHandler = new web();

$json = array("status" => "null", "details" => "null");

if(isset($_GET['id']) && $_GET['id'] != ""){
    if(isset($_GET['plJson']) && $_GET['plJson'] != "") {
        if (is_numeric($_GET["id"])) {
            $query = "SELECT * FROM `playlists` WHERE `id`=" . $_GET['id'] . ";";
            $query = $db->query($query);
            if ($query) {
                $query = $query->fetchAll();
                if (count($query) > 0) {
                    if ($query['restrictionLevel'] == 0 || $query['restrictionLevel'] == 1) {
                        //public or not displayed
                        $res = $db->query("UPDATE `playlists` SET `playlist`='".$_GET['plJson']."' WHERE `id`=".$_GET['id'].";");
                        if(!$res){
                            //SQLError
                            $json = array("status" => "error", "details" => "SQLError.1");
                            die(json_encode($json));
                        }
                        //SUCCESS
                        $json = array("status" => "valid", "details" => "success");
                        die(json_encode($json));

                    } elseif ($query['restrictionLevel'] == 2) {
                        //private
                        $json = array("status" => "error", "details" => "private.notImplemented");
                        die(json_encode($json));
                    } else {
                        //RESTRICTIONLEVEL NOT VALID
                        $json = array("status" => "error", "details" => "restrictionLevel.invalid");
                        die(json_encode($json));
                    }
                } else {
                    //PLAYLIST NOT EXISTS
                    $json = array("status" => "error", "details" => "playlist.notExists");
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
        $json = array("status" => "error", "details" => "playlist.empty");
        die(json_encode($json));
    }
}else{
    // ID EMPTY
    $json = array("status" => "error", "details" => "id.empty");
    die(json_encode($json));
}

?>