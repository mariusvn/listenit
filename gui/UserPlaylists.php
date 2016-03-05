<?php
session_start();
include("../api/sql.php");
include("../api/web.php");

$db = connect();
$apiHandler = new web();
?>

<div class="user-playlist">
  <h3>Vos playlists :</h3><br/>
  <div id="PLY-HOLDER">
    <script>
      $(document).ready(function () {
  <?php
    $queryStr = "SELECT * FROM `playlists` WHERE `author`='" . $_SESSION['user']['uuid'] . "';";
    foreach ($db->query($queryStr) as $row) {
  ?>
        renderPlaylistv2("#PLY-HOLDER", <?php echo $row['id']; ?>);
  <?php
    }
  ?>
    makeSortable();
      });
    </script>
  </div>
</div>
