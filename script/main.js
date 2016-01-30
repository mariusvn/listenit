$(document).ready(function(){
  var xcenter = (screen.width / 2) - ($('#login-form-block').width() / 2 + 20);
  $('.log-wrapper').css('margin-left', xcenter);
  setTimeout(function(){
    $('.log-wrapper').css('transition', '1.5s cubic-bezier(0.5, 0, 0, 0.5)');
  }, 500);
  $('.hidden-black').click(function(){
    $('.hidden-black').css('z-index', '-999');
    $('.error-box').css('z-index', '-999');
  });
});
function right(){
  $('.log-wrapper').removeClass('left').addClass('right');
}
function left(){
  $('.log-wrapper').removeClass('right').addClass('left');
}
function displayError(title, message){
  $('.hidden-black').css('z-index', '999');
  $('.error-box').css('z-index', '999');
  $('.error-box #title').html(title);
  $('.error-box #topic').html(message);

}
function getString(str){
  if(str == "username.empty")
      return "Le champ nom d'utilisateur est vide.";
  if(str == "password.empty")
      return "Le champ mot de passe est vide.";
  if(str == "email.empty")
      return "Le champ e-mail est vide.";
  if(str == "password2.empty")
      return "le champ confirmation de mot de passe est vide.";
  if(str == "login.wrong")
      return "le nom d'utilisateur ou le mot de passe est éronné.";
  if(str == "SQLError")
      return "Bug de requête SQL, veuillez reporter l'erreur \"SQLError\"";
  if(str == "passwords.nomatch")
      return "Les deux mots de passes ne sont pas les mêmes.";
  if(str == "username.took")
      return "Le nom d'utilisateur est déjà utilisé par un autre utilisateur";
  if(str == "email.took")
      return "L'e-mail est déjà utilisé.";

  return str;

}
function register(){
  $('#register_reg').prop('disabled', true);
  $.ajax({
    url: "api/register.php",
    method: 'GET',
    data: {
      username: $("input[name=username_register]").val(),
      password: $("input[name=password_register]").val(),
      password2: $("input[name=password_confirm_register]").val(),
      mail: $("input[name=email_register]").val(),
      key: "h8RK9ZSNZRdAvrgc"
    },
    success: function(page){
      var json = jQuery.parseJSON(page);

      if(json.status == "error" && json.details != null){
        displayError("Erreur", json.details);
        $('#register_reg').prop('disabled', false);
      }else{
        $("input[name=username_register]").val("");
        $("input[name=password_register]").val("");
        $("input[name=password_confirm_register]").val("");
        $("input[name=email_register]").val("");
      }
    }
  });
}
function login(){
  $("login_log").prop('disabled', true);
  $.ajax({
    url: "api/login.php",
    method: 'GET',
    data: {
      username: $("input[name=username_login]").val(),
      password: $("input[name=password_login]").val()
    },
    success: function(ret){
      var json = jQuery.parseJSON(ret);
      if(json.status == "error" && json.details != null){
        displayError("Erreur", getString(json.details));
        $("login_log").prop('disabled', false);
      }else{
        //skip();
      }
    }
  });
}
function valid(){
  $("body").html("");
}
