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
//TODO faire le filtre pour le form register (verif si c'est bien un email, le username n'existe pas encore, etc ...
/*
  register return array(isSuccess(bool), reasonOfError(array(isErrorKey(bool), isErrorSQL(bool))));
 */
function register(){
  $.ajax({
    url: "api/register.php",
    method: 'GET',
    data: {
      username: $("input[name=username_register]").val(),
      password: $("input[name=password_register]").val(),
      mail: $("input[name=email_register]").val(),
      key: "AkVKGLCzAhjN"
    },
    success: function(page){
      alert(page);
      var json = jQuery.parseJSON(page);
      if(json.valid == true && json.SQLError == false && json.success == true){
        return [true, [false, false]];
      }else{
        var res = [false, false];
        if(json.valid == false){
          res[0] = true;
        }
        if(json.SQLError == true){
          res[1] = true;
        }
      }
    }
  })

}
