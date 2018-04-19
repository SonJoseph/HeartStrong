<?php
require 'connect.php';


$aimUser = ($_POST["username"]);
$aimTitle = ($_POST["aimTitle"]);
$aimText = ($_POST["aimInput"]);
$aimPhoto = ($_POST["aimPhoto"]);

$image = addslashes(file_get_contents($_FILES['aimPhoto']['tmp_name']));
$image_name = addslashes($_FILES['aimPhoto']['name']);


if (empty($aimTitle) or empty($aimText)) {
  echo "You can't leave name or description empty!";
  $checkTitle = "SELECT COUNT(*) FROM `AIMS` WHERE AimName = '$aimUser'";
  $ct = $result->fetch_assoc()["COUNT(*)"];

}
if ($ct == 1) {
   echo "You already have an aim with that name!";
} else {
  $insert = "INSERT INTO `Aims`(`Username`, `AimName`, `AimText`, `AimImage`) VALUES ('$aimUser','$aimTitle','$aimText', '$image_name')";
  $result = mysqli_query($db, $insert);
  echo "Success!";
}


mysqli_close($db);
?>
