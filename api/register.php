<?php
    session_start();
    include("sql.php");
    include("web.php");

    $db = connect();
    $apiHandler = new api();

    $json = array("status" => "null", "details" => "null");

    if(!isset($_GET["key"])){

        $json = array("status" => "error", "details" => "Empty ApiKey");
        die(json_encode($json));

    }else{
        if(!$apiHandler->isApiToken($_GET["key"], $db)){

            $json = array("status" => "error", "details" => "Invalid ApiKey");
            die(json_encode($json));

        }
    }
    // IF WAR *-*
    if(!isset($_GET["username"]) || ($_GET["username"] != "")){
        if(!isset($_GET["password"]) || ($_GET["password"] != "")){
            if(!isset($_GET["mail"]) || ($_GET["mail"] != "")){
                if(!isset($_GET['password2']) || ($_GET["password2"] != "")){
                    if($_GET['password2'] == $_GET['password']){
                        if(($apiHandler->UsernameExists($_GET['username'], $db)) == false){
                            if(($apiHandler->EmailUsed($_GET['mail'], $db)) == false){

                                $hashed_password = md5($_GET['password'] + "PjSalt"); // md5 + salt
                                $username = htmlspecialchars($_GET['username']);
                                $email = htmlspecialchars($_GET['mail']);

                                $UUID = uniqid("table_");

                                $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
                                $sessionID = array();
                                $alphaLength = strlen($alphabet) - 1;

                                for ($i = 0; $i < 25; $i++)
                                {
                                    $n = rand(0, $alphaLength);
                                    $sessionID[] = $alphabet[$n];
                                }
                                $sessionID_ = implode($sessionID);

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
                                $result = $sth->execute(array($username,
                                    $hashed_password,
                                    $email,
                                    $UUID,
                                    $sessionID_,
                                    0,              // premium
                                    0,     // premium date limit
                                    0               // is admin
                                ));
                                if(!$result){
                                    $json = array("status" => "error", "details" => "SQLError");
                                    die(json_encode($json));
                                }
                                $_SESSION['user']['username'] = $username;
                                $_SESSION['user']['password_hash'] = $hashed_password;
                                $_SESSION['user']['sessionID'] = $sessionID_;
                                $json = array("status" => "valid", "details" => "apikey.invalid");
                                die(json_encode($json));

                            }else{ // EMAIL ALREADY TAKEN
                                $json = array("status" => "error", "details" => "email.took");
                                die(json_encode($json));
                            }
                        }else{ // USERNAME ALREADY TAKEN
                            $json = array("status" => "error", "details" => "username.took");
                            die(json_encode($json));
                        }
                    }else{ // PASSWORDS DOESN'T MATCH
                        $json = array("status" => "error", "details" => "passwords.nomatch");
                        die(json_encode($json));
                    }
                }else{ // EMPTY PASSWORD2 OR NOT SET
                    $json = array("status" => "error", "details" => "password2.empty");
                    die(json_encode($json));
                }
            }else{ // EMPTY EMAIL OR NOT SET
                $json = array("status" => "error", "details" => "email.empty");
                die(json_encode($json));
            }
        }else{ // EMPTY PASSWORD1 OR NOT SET
            $json = array("status" => "error", "details" => "password.empty");
            die(json_encode($json));
        }
    }else{ //EMPTY USERNAME OR NOT SET
        $json = array("status" => "error", "details" => "username.empty");
        die(json_encode($json));
    }
?>
