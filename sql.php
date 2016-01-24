<?php
  function connect(){
    $user = "wd5tjb_listenit";
    $ip = "sql.otherwize.fr";
    $db = "wd5tjb_listenit";
    $pass = "admin";
    $dsn = "mysql:dbname=$db;host=$ip;charset=utf8";
    try{
      return new PDO($dsn, $user, $pass);
    }catch(Exception $e){
      die("impossible de se connecter à la base de données");
    }
  }
?>
