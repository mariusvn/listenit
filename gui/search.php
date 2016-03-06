<?php
  include('../api/web.php');
  include('../api/sql.php');
  session_start();
  $apiHandler = new web();
  $db = connect();
?>

<div id="search-div">
  <div id="bg-black"></div>

  <label id="search-title">Recherche: </label><input type="text" id="searchBar"/>
  <div style="margin-top:15px;margin-bottom:15px;" id="searchResult"></div>

  <div id="add-form">
    <div class="top-wrapped">
      <span class="title">Ajouter à une playlist.</span>
      <div class="cross" onClick="$('#add-form').fadeOut(250);$('#bg-black').fadeOut(250);">X</div>
    </div>
    <div id="info-container">
      <div id="img-w"></div>
      <div>
        <div id="title-w"></div>
        <select id="playlist-selector">
          <?php
            $userPlaylists = $apiHandler->getUserPlaylists($_SESSION['user']['uuid'], $db);
            foreach($userPlaylists as $row){
                echo("<option value='" . $row['id'] ."'>" . $row['name'] . "</option>");
              }
          ?>
        </select>
        <button id="add-btn-done">Ajouter</button>
      </div>
      <div class="create-playlist">
        <input class="create-playlist-plname" type="text" maxlength="20" placeholder="nom" />
        <button onclick="modifier = new playlistManager(); modifier.create($('.create-playlist-plname').val(), '', ''); //todo finir">Créer</button>
      </div>
      <div class="clr-fx"></div>
    </div>
  </div>

<!-- OLD
<div class="add-btn-top"><img src="imgs/back_white.png" onClick="$('#add-btn').css('display','none');"><label>Ajouter à une playlist</label></div>
<div class="add-btn-bottom">
  <div id="track-infos"></div>
  <label>Playlist : </label>

  <div id="addToPlaylist-btn">
    <a>ajouter à la playlist</a>
  </div>
</div>
-->

  <script>
      search.assignSearch("#searchBar", "#searchResult");
  </script>
</div>
