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
        //skip();
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
      password: $("input[name=passzword_login]").val()
    },
    success: function(ret){
      var json = jQuery.parseJSON(ret);
      if(json.status = "error" && json.details != null){
        displayError("Erreur", json.details);
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
