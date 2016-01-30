<?php
class web
{
    function isApiToken($token, $db){
        $queryStr = "SELECT * FROM `apiTokens` WHERE `public`=1;";
        foreach($db->query($queryStr) as $row){
            if($row["api_token"] == $token){
                return true;
            }
        }
        return false;
    }
    function UsernameExists($username, $db){
        $querySTR = ("SELECT * FROM `users` WHERE `user_username`=" . $username);
        $rt = $db->prepare($querySTR);
        $rt->execute();
        $rs0 = $rt->fetchAll();
        if(count($rs0) > 0){
            return true;
        }
        return false;
    }
    function EmailUsed($email, $db){
        $querySTR = ("SELECT * FROM `users` WHERE `user_email`=" . $email);
        $rt = $db->prepare($querySTR);
        $rt->execute();
        $rs0 = $rt->fetchAll();

        if(count($rs0) > 0){
            return true;
        }
        return false;
    }
    function ConnValid($Array, $db){
        $querySTR = ("SELECT * FROM `users` WHERE `user_username`=" . $Array['username'] . " `user_password`=" . $Array['password_hash'] . " `user_sessionID`=" . $Array['sessionID'] . ";");
        $rt = $db->prepare($querySTR);
        $rt->execute();
        $rs0 = $rt->fetchAll();

        if(count($rs0) > 0){
            return true;
        }
        return false;
    }
}
?>