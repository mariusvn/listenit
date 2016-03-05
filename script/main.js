$(document).ready(function () {
    if (Notification.permission !== "granted"){
      Notification.requestPermission();
    }
    var xcenter = ($('#login-form-block').width() / 2 + 20);
    $('.log-wrapper').css('margin-left', 'calc(50vw - ' + xcenter + 'px)');
    setTimeout(function () {
        $('.log-wrapper').css('transition', '1.5s cubic-bezier(0.5, 0, 0, 0.5)');
    }, 500);
    $('.hidden-black').click(function () {
        hideError();
    });
    $('.disconnect').click(function () {
        $.ajax({
            url: "dc.php",
            success: function (result) {
                location.reload();
            },
            error: function () {
                alert("erreur");
            }
        })
    });
    $('#body-container').css('left', $('.left-wrapper').width());
    enterForm();

    //context menu NON FONCTIONNEL
    //TODO finir le context menu
    $(document).on("contextmenu", ".draggable", function(e){

        var context = $( this );
        e.preventDefault();
        var vTrack = new TrackInfos();
        var context_render = "";

        context_render += "<div id='context-menu-container'>";
          context_render += "<table>";
            context_render += "<tr id='ctx'>";
              context_render += "<input type='hidden' id='track-id-temp' value='" + $( this ).find('#ply-index').val() + "' />";
              context_render += "<input type='hidden' id='ply-id-temp' value='" + $( this ).find('#ply-id').val() + "' />";
              context_render += "<td>Delete " + vTrack.getTrackTitle($( this ).find('#track-network').val(), $( this ).find('#track-id').val()) + "</td>";
            context_render += "</tr>";
          context_render += "</table>";
        context_render += "</div>";

        $(".context-menu").html(context_render);
        $(".context-menu").finish().toggle(100);
        $(".context-menu").css({
            top: e.pageY + "px",
            left: e.pageX + "px"
        });
        $("#ctx").click(function(){
          console.log('id : ' + $( this ).find("#track-id-temp").val());
          var plmg = new playlistManager();

          plmg.remove($( this ).find('#track-id-temp').val(), $( this ).find('#ply-id-temp').val());

          $(".context-menu").hide(100);
          showUserPlaylists();
        });
    });
    $(document).on("mousedown", function(e){
        if (!$(e.target).parents(".context-menu").length > 0) {
            $(".context-menu").hide(100);
        }
    });

    $(".draggable").contextmenu({
        selector: ".draggable",
        callback: function(key, option){
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m);
        },
        items: {
            delete: {name: "edit"}
        }
    });
});
var gui = {
    userPlaylist: "userPlaylist",
    search: "search",
    help: "help"
};
var activeGui = gui.userPlaylist;

function right() {
    $('.log-wrapper').removeClass('left').addClass('right');
}
function left() {
    $('.log-wrapper').removeClass('right').addClass('left');
}

var isErrorDisplayed = false;
function displayError(title, message) {
    $('.hidden-black').fadeIn(250);
    $('.error-box').fadeIn(250);
    $('.error-box #title').html(title);
    $('.error-box #topic').html(message);
    isErrorDisplayed = true;

}
function hideError(){
    if(isErrorDisplayed == true){
        $('.hidden-black').fadeOut(250);
        $('.error-box').fadeOut(250);
        isErrorDisplayed = false;
    }

}
function getString(str) {

  var userLang = navigator.language || navigator.userLanguage;

  var URL_tr = "lang/" + userLang.toUpperCase() + "_" + userLang + ".json";
  var JS_OBJ = $.ajax({
      url: URL_tr,
      async: false
  }).responseText;

  var array = jQuery.parseJSON(JS_OBJ);
  console.log(URL_tr);
  console.log(array);
  console.log(array[str]);
  return array[str];

}
function register() {
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
        success: function (page) {
            var json = jQuery.parseJSON(page);

            if (json.status == "error" && json.details != null) {
                displayError("Erreur", getString(json.details));
                $('#register_reg').prop('disabled', false);
            } else {
                $("input[name=username_register]").val("");
                $("input[name=password_register]").val("");
                $("input[name=password_confirm_register]").val("");
                $("input[name=email_register]").val("");
                skip();
            }
        }
    });
}
function login() {
    $("login_log").prop('disabled', true);
    $.ajax({
        url: "api/login.php",
        method: 'GET',
        data: {
            username: $("input[name=username_login]").val(),
            password: $("input[name=password_login]").val()
        },
        success: function (ret) {
            var json = jQuery.parseJSON(ret);
            if (json.status == "error" && json.details != null) {
                displayError("Erreur", getString(json.details));
                console.log(json.details);
                $("login_log").prop('disabled', false);
            } else {
                skip();
            }
        }
    });
}
function skip() {
    location.reload();
}
function enterForm() {
    $('.login-form').on("keypress", function(e){
        if(e.which != 13)
            return;
        $('#login_log').click();
    });
    $('.signup_form').on("keypress", function (e) {
        if(e.which != 13)
            return;
        $('#register_reg').click();
    });
}
function showUserPlaylists(){
    $('#menu-my-playlists').addClass('active');
    $('#menu-search').removeClass('active');
    $('#menu-help').removeClass('active');
    $('#body-container').html('<div id="rl-black" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.6);"></div><div class="uil-ellipsis-css" style="transform:scale(0.6);position: absolute;    top: 50%;    left: 50%;    margin: -60px 0 0 -60px;"><div class="ib"><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div></div></div>');
    $.ajax({
        url: "gui/UserPlaylists.php",
        dataType: "text",
        success: function(data){
            $('#body-container').html(data);
            document.title = 'ListenIT - Mes Playlists';
        }
    });
    activeGui = gui.userPlaylist;

}
function reloadUserPlaylists(){
  $('#menu-my-playlists').addClass('active');
  $('#menu-search').removeClass('active');
  $('#menu-help').removeClass('active');
  $('#body-container').append('<div id="rl-black" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.6);"></div>');
  $('#body-container').append('<div class="uil-ellipsis-css" style="transform:scale(0.6);position: absolute;    top: 50%;    left: 50%;    margin: -60px 0 0 -60px;"><div class="ib"><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div></div></div>');
  console.log('reloaded');
  $.ajax({
      url: "gui/UserPlaylists.php",
      dataType: "text",
      success: function(data){
          $('#body-container').html(data);
          document.title = 'ListenIT - Mes Playlists';
      }
  });
  activeGui = gui.userPlaylist;

}
function showSearch(){
    $('#menu-my-playlists').removeClass('active');
    $('#menu-search').addClass('active');
    $('#menu-help').removeClass('active');
    $('#body-container').append('<div id="rl-black" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.6);"></div>');
    $('#body-container').append('<div class="uil-ellipsis-css" style="transform:scale(0.6);position: absolute;    top: 50%;    left: 50%;    margin: -60px 0 0 -60px;"><div class="ib"><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div></div></div>');
    $.ajax({
        url: "gui/search.php",
        dataType: "text",
        success: function(data){
            $('#body-container').html(data);
            document.title = 'ListenIT - Recherche';
        }
    });
    activeGui = gui.search;
}

function showHelp(){
    $('#menu-my-playlists').removeClass('active');
    $('#menu-search').removeClass('active');
    $('#menu-help').addClass('active');
    $('#body-container').html("loading ...");
    $.ajax({
        url: "gui/help.php",
        dataType: "text",
        success: function(data){
            $('#body-container').html(data);
            document.title = 'ListenIT - Aide';
        }
    });
    activeGui = gui.help;
}
function NotifyNext(name){
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chrome-Based browser');
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('ListenIT', {
      icon: '../imgs/logo.jpg',
      body: "Current Music : " + name + "",
    });
  }
}
