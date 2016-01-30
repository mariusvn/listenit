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

        $query = "SELECT * FROM `users` WHERE `user_username`='$username' AND `user_password`='$password';";
        $result = $db->query($query);
        if(!$result){
            $json = array("status" => "error", "details" => "SQLError");
            die(json_encode($json));
        }
        $result = $result->fetchAll();
        if(count($result) == 1){
            $json = array("status" => "valid", "details" => "login.sucess");
            $_SESSION['user']['username'] = $username;
            $_SESSION['user']['password_hash'] = $password;
            //TODO SESSION ID
            die(json_encode($json));
        }else{
            $json = array("status" => "error", "details" => "login.wrong");
            die(json_encode($json));
        }

    }else{
        //PASSWORD IS EMPTY
        $json = array("status" => "error", "details" => "password.empty");
        die(json_encode($json));
    }
}else{
    //USERNAME IS EMPTY
    $json = array("status" => "error", "details" => "username.empty");
    die(json_encode($json));
}



?>