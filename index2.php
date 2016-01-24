<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ListenIT - Playlists Multi-plateformes</title>
    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="style/theme.css">
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="script/main.js"></script>
  </head>
  <body>
    <div class="hidden-black"></div>
    <div class="error-box">
      <span id="title"></span></br>
      <span id="topic"></span>
    </div>
    <div class="bg-holder"></div>
    <div class="head-wrapper">
      <h1 id="title">ListenIT</h1>
      <h1 id="under">Des playlists multi-plateformes !</h1>
    </div>
    <div class="log-wrapper">
      <div class="login-form" id="login-form-block">
        <h2 id="head">Se connecter.</h2>
        </br>
        <input id="input" type="text" name="username_login" placeholder="Nom de compte">
        <input id="input" type="password" name="password_login" placeHolder="Mot de passe">
        <div>
          <button>Se connecter</button>
          <button onClick="right();">S'inscrire</button>
        </div>
      </div>
      <div class="login-form" id="register-form-block">
        <h2 id="head">S'inscrire</h2>
        </br>
        <input id="input" type="text" name="username_register" placeholder="Nom de compte">
        <input id="input" type="password" name="password_register" placeHolder="Mot de passe">
        <input id="input" type="password" name="password_confirm_register" placeHolder="Verif. Mot de passe">
        <input id="input" type="email" name="email_register" placeHolder="Email">
        <div>
          <button onClick="left();">Se connecter</button>
          <button onClick="">S'inscrire</button>
        </div>
      </div>
    </div>
  </body>
</html>
