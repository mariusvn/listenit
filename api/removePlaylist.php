<?php
session_start();
include("sql.php");
include("web.php");

$db = connect();
$apiHandler = new web();

$json = array("status" => "null", "details" => "null");

if(isset($_GET['id']) && $_GET['id'] != ""){
    if (is_numeric($_GET["id"])) {
        $queryS = "SELECT * FROM `playlists` WHERE `ìd` = " . $_GET['id'] . " AND `author` = '" . $_SESSION['user']['uuid'] . "';";
        $query = $db->query($queryS);
        if ($query) {
            $query = $query->fetchAll();
            if (count($query) > 0) {
                //public or not displayed
                $res = $db->query("DELETE FROM `playlists` WHERE `id` = '" . $_GET['id'] . "';");
                if(!$res){
                    //SQLError
                    $json = array("status" => "error", "details" => "SQLError.1");
                    die(json_encode($json));
                }
                //SUCCESS
                $json = array("status" => "success", "details" => "success");
                die(json_encode($json));

            } else {
                //PLAYLIST NOT EXISTS
                $json = array("status" => "error", "details" => "remove.notAllowed");
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
    // ID EMPTY
    $json = array("status" => "error", "details" => "id.empty");
    die(json_encode($json));
}

?>
