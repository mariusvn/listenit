<?php
session_start();
include("sql.php");
include("web.php");

$db = connect();
$apiHandler = new web();

$json = array("status" => "null", "details" => "null");
if(isset($_SESSION['user']['uuid']) && $_SESSION['user']['uuid'] != ""){
    if (isset($_GET['playlistName']) && $_GET['playlistName'] != "") {
        $request = "INSERT INTO `playlists` (`author`, `name`, `playlist`) VALUES (\"" . $_SESSION['user']["uuid"] . "\",\"" . $_GET['playlistName'] . "\", '{\"playlist\":[]}');";
        $ret = $db->query($request);
        if (!$ret) {
            //request error
            $json = array("status" => "error", "details" => "SQLError");
            die(json_encode($json));
        }
        $lastId = $db->lastInsertId();
        $jsonId = array("id" => $lastId);
        $json = array("status" => "success", "details" => $jsonId);
        die(json_encode($json));
    } else {
        //playlistName isn't defined
        $json = array("status" => "error", "details" => "playlistName.empty");
        die(json_encode($json));
    }
}else{
    $json = array("status" => "error", "details" => "status.disconnected");
    die(json_encode($json));
}
?>