<?php
session_start();
include("../api/sql.php");
include("../api/web.php");

$db = connect();
$apiHandler = new web();
?>

<div class="user-playlist">
  <h3>Vos playlists:</h3><br/>
  <div id="PLY-HOLDER">
  <?php
    $queryStr = "SELECT * FROM `playlists` WHERE `author`='" . $_SESSION['user']['uuid'] . "';";
    foreach ($db->query($queryStr) as $row) {
      ?>
      <script>
          
          $(document).ready(function () {
            renderPlaylistv2("#PLY-HOLDER", <?php echo $row['id']; ?>);
            makeSortable();

          });
      </script>
    <?php
      }
    ?>
  </div>
</div>
