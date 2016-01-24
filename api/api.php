<?php

namespace api;


class api
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
}
?>