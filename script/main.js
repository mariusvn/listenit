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
    /*$(document).on("contextmenu", ".draggable", function(e){
        e.preventDefault();
        $(".context-menu").data("music-id", this.id);
        $(".context-menu").data("music-network", this.id);
        $(".context-menu").html(
            "<div id='context-menu-container'>" +
            "<table>" +
            "<tr><td>Delete" + $(".context-menu").data('music-network') + "</td></tr>" +
            "</table>" +
            "</div>"
        );

        $(".context-menu").finish().toggle(100);
        $(".context-menu").css({
            top: e.pageY + "px",
            left: e.pageX + "px"
        })
    });
    $(document).on("mousedown", function(e){
        if (!$(e.target).parents(".context-menu").length > 0) {
            $(".context-menu").hide(100);
        }
    });*/

    /*$(".draggable").contextmenu({
        selector: ".draggable",
        callback: function(key, option){
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m);
        },
        items: {
            delete: {name: "edit"}
        }
    })*/
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
    if (str == "username.empty")
        return "Le champ nom d'utilisateur est vide.";
    if (str == "password.empty")
        return "Le champ mot de passe est vide.";
    if (str == "email.empty")
        return "Le champ e-mail est vide.";
    if (str == "password2.empty")
        return "le champ confirmation de mot de passe est vide.";
    if (str == "login.wrong")
        return "le nom d'utilisateur ou le mot de passe est éronné.";
    if (str == "SQLError")
        return "Bug de requête SQL, veuillez reporter l'erreur \"SQLError\"";
    if (str == "passwords.nomatch")
        return "Les deux mots de passes ne sont pas les mêmes.";
    if (str == "username.took")
        return "Le nom d'utilisateur est déjà utilisé par un autre utilisateur";
    if (str == "email.took")
        return "L'e-mail est déjà utilisé.";

    return str;

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
                displayError("Erreur", json.details);
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
    $('#body-container').html("loading ...");
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
    $('#body-container').html("loading ...");
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
