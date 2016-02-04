<?php
include('../api/web.php');
include('../api/sql.php');
session_start();
$apiH = new web();
$db = connect();
?>
<link rel="stylesheet" href="style/search.css"/>
<div id="search-div">
    <label id="search-title">Recherche: </label><input type="text" id="searchBar"/>
    <div id="searchResult"></div>
    <div id="add-btn">
        <div class="add-btn-top"><img src="imgs/back_white.png" onclick="$('#add-btn').css('display','none');"><label>Ajouter à une playlist</label></div>
        <div class="add-btn-bottom"><div id="track-infos"></div>
        <label>ajouter à :</label>
        <select id="playlist-selector">
        <?php
            $userPlaylists = $apiH->getUserPlaylists($_SESSION['user']['uuid'], $db);
            foreach($userPlaylists as $row){
                echo("<option value='" . $row['id'] ."'>" . $row['name'] . "</option>");
            }
        ?>
        </select>
        <div id="addToPlaylist-btn">
            <a>ajouter à la playlist</a>
        </div></div>

    </div>
    <script>
        search.assignSearch("#searchBar", "#searchResult");
    </script>
</div>