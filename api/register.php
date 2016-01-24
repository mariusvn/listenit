<?php
include("../sql.php");
include("api.php");
$db = connect();
use api\api;
$apiHandler = new api();
$json = array("valid" => false, "SQLError" => false, "success" => false);
if(!isset($_GET["key"])){

    die(json_encode($json));
}else{
    if(!$apiHandler->isApiToken($_GET["key"], $db)){
        die(json_encode($json));
    }
}
if(!isset($_GET["username"]) || !isset($_GET["password"]) || !isset($_GET["mail"])) {
    die(json_encode($json));
}
$username = htmlspecialchars($_GET["username"]);
$password = md5($_GET["password"]);
$mail = htmlspecialchars($_GET["mail"]);
$uuid = uniqid();
$sessionId = 1; //TODO modify
$requestStr = "INSERT INTO `users` (`user_username`,
                                    `user_password`,
                                    `user_email`,
                                    `user_uuid`,
                                    `user_sessionID`,
                                    `user_premium`,
                                    `user_datepremium`,
                                    `user_admin`
                                     ) VALUES (?,?,?,?,?,?,?,?);";
$sth = $db->prepare($requestStr);
$result = $sth->execute(array(   $username,
                                                                                            $password,
                                                                                            $mail,
                                                                                            $uuid,
                                                                                            $sessionId,
                                                                                            0,              // premium
                                                                                            "1/1/2000",     // premium date limit
                                                                                            0               // is admin
                                                                                            ));
if(!$result){
    $json = array("valid" => true, "SQLError" => true, "success" => false);
    die(json_encode($json));
}
$json = array("valid" => true, "SQLError" => false, "success" => true);
echo(json_encode($json));
?>
