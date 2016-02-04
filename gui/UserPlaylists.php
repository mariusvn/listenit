<?php
session_start();
include("../api/sql.php");
include("../api/web.php");

$db = connect();
$apiHandler = new web();
?>

<div class="user-playlist">
    <h3>Vos playlists:</h3><br/>
    <?php
    $queryStr = "SELECT * FROM `playlists` WHERE `author`='" . $_SESSION['user']['uuid'] . "';";
    foreach ($db->query($queryStr) as $row) {
        ?>
        <div class="playlist-item">
            <h4><?php echo $row['name']; ?></h4>
            <div class="playlist-container" id="playlistId<?php echo $row['id']; ?>"></div>
            <input type="hidden" name="playlist-id" value="<?php echo $row['id']; ?>"/>
            <script>
                render("#playlistId<?php echo $row['id']; ?>", <?php echo $row['id']; ?>);
                $(document).ready(function () {
                    makeSortable();
                });
            </script>
        </div>
        <?php
    }
    ?>
</div>
