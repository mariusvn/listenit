<?php
session_start();
include("sql.php");
include("web.php");

$db = connect();
$apiHandler = new web();

$json = array("status" => "null", "details" => "null");

if(isset($_GET["username"]) && $_GET["username"] != ""){
    if(isset($_GET["password"]) && $_GET["password"] != ""){

        $username = htmlspecialchars($_GET["username"]);
        $password = md5($_GET["password"] . "PjSalt");

        $query = "SELECT * FROM `users` WHERE `user_username`='" . $username . "' AND `user_password`='" . $password . "';";
        $result = $db->query($query);
        if(!$result){
            $json = array("status" => "error", "details" => "SQLError");
            die(json_encode($json));
        }
        $result = $result->fetchAll();
        if(count($result) == 1){

            $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
            $sessionID = array();
            $alphaLength = strlen($alphabet) - 1;

            for ($i = 0; $i < 25; $i++)
            {
                $n = rand(0, $alphaLength);
                $sessionID[] = $alphabet[$n];
            }
            $sessionID_ = implode($sessionID);

            $json = array("status" => "valid", "details" => "login.success");
            $_SESSION['user']['username'] = $username;
            $_SESSION['user']['password_hash'] = $password;

            $qr = "UPDATE `users` SET `user_sessionID` = '" . $sessionID_ . "' WHERE `ROWID_INDEX` = " . $result[0]['ROWID_INDEX'] . ";";
            $rs = $db->query($qr);

            if(!$rs){
                $json = array("status" => "error", "details" => "SQLError : SESSIONID (" . $qr . ')');
                die(json_encode($json));
            }
            $_SESSION['user']['sessionID'] = $sessionID_;
            $_SESSION['user']['uuid'] = $result['user_uuid'];

            die(json_encode($json));

        }else{ // UNKNOWN USERNAME AND PASSWORDS
            $json = array("status" => "error", "details" => "login.wrong");
            die(json_encode($json));
        }
    }else{ // PASSWORD IS EMPTY
        $json = array("status" => "error", "details" => "password.empty");
        die(json_encode($json));
    }
}else{ // USERNAME IS EMPTY
    $json = array("status" => "error", "details" => "username.empty");
    die(json_encode($json));
}



?>