<?php
//TODO modifier pour que l'acces aux playlist à perm niveau 2 soir restrinte
include("../sql.php");
include("api.php");
$db = connect();
use api\api;
$apiHandler = new api();
$json = array("valid" => false, "SQLError" => false, "success" => false, "reason" => "", "result" => array());
if(!isset($_GET["uuid"]) || !isset($_GET["key"]) || !isset($_GET["perm"])){
    $json["reason"] = "please complete parameters";
    die(json_encode($json));
}
if(!$apiHandler->isApiToken($_GET["key"], $db)){
    $json["reason"] = "api token not valid";
    die(json_encode($json));
}
if(!is_numeric($_GET["perm"])){
    $json["reason"] = "permission level not valid";
    die(json_encode($json));
}
if($_GET["perm"] > 2 || $_GET["perm"] < 0){
    $json["reason"] = "permission level need to be between 0 -> 2";
    die(json_encode($json));
}
$uuid = htmlspecialchars($_GET["uuid"]);
$key = htmlspecialchars($_GET["key"]);
$perm = htmlspecialchars($_GET["perm"]);

//verification if the uuid is valid
$queryStr = "SELECT * FROM `users` WHERE `user_uuid`='$uuid'";
$res = $db->query($queryStr);
if($res) {
    if ($res->rowCount() != 1) {
        $json["reason"] = "uuid not valid";
        die(json_encode($json));
    }
}else{
    $json["reason"] = "SQL error: " . $db->errorInfo()[2];
    $json["SQLError"] = true;
    $json["valid"] = true;
    die(json_encode($json));
}
//playlist recovering
$queryStr = "SELECT * FROM `playlists` WHERE `author`='$uuid' AND `restrictionLevel`=$perm";
$res = $db->query($queryStr);
if($res){
    $json["result"] = array();
    foreach($res as $row){
        array_push($json["result"], $row["id"]);
    }
    $json["valid"] = true;
    $json["SQLError"] = false;
    $json["success"] = true;
    $json["reason"] = "";
    die(json_encode($json));
}else{
    $json["reason"] = "SQL error: " . $db->errorInfo()[2];
    $json["SQLError"] = true;
    $json["valid"] = true;
    die(json_encode($json));
}
?>