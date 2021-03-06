<?php
class web
{
    function isApiToken($token, $db)
    {
        $queryStr = "SELECT * FROM `apiTokens` WHERE `public`=1;";
        foreach ($db->query($queryStr) as $row) {
            if ($row["api_token"] == $token) {
                return true;
            }
        }
        return false;
    }

    function UsernameExists($username, $db)
    {
        $querySTR = ("SELECT * FROM `users` WHERE `user_username`=" . $username);
        $rt = $db->prepare($querySTR);
        $rt->execute();
        $rs0 = $rt->fetchAll();
        if (count($rs0) > 0) {
            return true;
        }
        return false;
    }

    function EmailUsed($email, $db)
    {
        $querySTR = ("SELECT * FROM `users` WHERE `user_email`=" . $email);
        $rt = $db->prepare($querySTR);
        $rt->execute();
        $rs0 = $rt->fetchAll();

        if (count($rs0) > 0) {
            return true;
        }
        return false;
    }

    function ConnValid($Array, $db)
    {
        $querySTR = ("SELECT * FROM `users` WHERE `user_username`='" . $Array['username'] . "' AND `user_password`='" . $Array['password_hash'] . "' AND `user_sessionID`='" . $Array['sessionID'] . "' AND `user_uuid`='" . $Array['uuid'] . "';");
        //
        $rt = $db->prepare($querySTR);
        $rt->execute();
        $rs0 = $rt->fetchAll();

        if (count($rs0) > 0) {
            return true;
        }
        return false;
    }

    function getAvatar($uuid)
    {
        if (file_exists('imgs/avatars/' . $uuid . '.png')) {
            $avatar = 'imgs/avatars/' . $uuid . '.png';
        } else {
            $avatar = 'imgs/avatars/default.png';
        }
        return $avatar;
    }

    function getUserPlaylists($uuid, $db){
        $result = [];
        $queryStr = "SELECT * FROM `users` WHERE `user_uuid`='$uuid'";
        $res = $db->query($queryStr);
        if($res) {
            if ($res->rowCount() != 1)
                return null;
        }else{
            return null;
        }
        $queryStr = "SELECT * FROM `playlists` WHERE `author`='$uuid';";
        $res = $db->query($queryStr);
        if($res){
            foreach($res as $row){
                array_push($result, $row);
            }
            return $result;
        }else{
            return null;
        }
    }
}
?>