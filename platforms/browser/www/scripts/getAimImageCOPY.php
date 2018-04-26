<?php
require 'connect.php';

$aimTitle = ($_GET["aimTitle"]);
$user = ($_GET["username"]);

$img = "SELECT AimImage FROM Aims WHERE AimName='$aimTitle' AND Username='$user'";
$images = mysqli_query($db, $img);

if (!$images) {
  $data = "You don't have a picture for this aim!";
} else {
  $data = $images->fetch_assoc();
}

echo $data;


mysqli_close($db);
?>
