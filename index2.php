<?php
  include('api/web.php');
  include('api/sql.php');
  session_start();
  $apiH = new web();
  $db = connect();
  //if(isset($_SESSION['user'])) {var_dump($_SESSION['user']);}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ListenIT - Playlists Multi-plateformes</title>
    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="style/theme.css">
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script type="text/javascript" src="script/main.js"></script>
  </head>
  <body>
    <div class="hidden-black"></div>
    <div class="error-box">
      <img src="imgs/warning48.png" width="48" height="48"/>
      <span id="title"></span></br>
      <span id="topic"></span>
    </div>
    <div class="bg-holder"></div>
    <?php
      if(!$apiH->ConnValid($_SESSION['user'], $db)) {
        unset($_SESSION['user']);
        ?>
        <div class="head-wrapper">
          <h1 id="title">ListenIT</h1>

          <h1 id="under">Des playlists multi-plateformes !</h1>
        </div>
        <div class="log-wrapper">
          <div class="login-form" id="login-form-block">
            <h2 id="head">Se connecter</h2>
            </br>
            <input id="input" class="login_form" type="text" name="username_login" placeholder="Nom de compte">
            <input id="input" class="login-form" type="password" name="password_login" placeHolder="Mot de passe">

            <div>
              <button onClick="login();" id="login_log">Se connecter</button>
              <button onClick="right();" id="register_log">S'inscrire</button>
            </div>
          </div>
          <div class="login-form" id="register-form-block">
            <h2 id="head">S'inscrire</h2>
            </br>
            <input id="input" class="signup_form" type="text" name="username_register" placeholder="Nom de compte">
            <input id="input" class="signup_form" type="password" name="password_register" placeHolder="Mot de passe">
            <input id="input" class="signup_form" type="password" name="password_confirm_register" placeHolder="Verif. Mot de passe">
            <input id="input" class="signup_form" type="email" name="email_register" placeHolder="Email">

            <div>
              <button onClick="left();" id="login_reg">Se connecter</button>
              <button onClick="register();" id="register_reg">S'inscrire</button>
            </div>
          </div>
        </div>
        <?php
      }else{
        ?>
        <div class="left-wrapper">
          <div class="user-space" onClick="displayError('Erreur','Fonctionalit&eacute; non developp&eacute;e')">
            <img class="img" src="<?php echo $apiH->getAvatar($_SESSION['user']['uuid']); ?>">
            <div class="username"><?php echo $_SESSION['user']['username']; ?></div>
            <div class="clear-fix"></div>
          </div>
          <div class="under-space">
            <div class="item-menu" onClick="displayError('Erreur','Fonctionalit&eacute; non developp&eacute;e')">
              [D]Tendances du moment
            </div>
            <div class="item-menu" onClick="displayError('Erreur','Fonctionalit&eacute; non developp&eacute;e')">
              [D]Playlists du mois
            </div>
            <div class="item-menu active">
              Mes playlists
            </div>
            <div class="item-menu-bottom disconnect">
              D&eacute;connection
            </div>
          </div>
        </div>
        <div class="main-wrapper">
          <div id="player"></div>
          <div id="track"></div>
        </div>
    <?php
      }
    ?>
  </body>
</html>
