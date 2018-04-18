<?php
require 'connect.php';

#maybe change aimID to patientID (will connect aims to patients)
$aimUser = ($_POST["username"]);
$aimTitle = ($_POST["aimTitle"]);
$aimText = ($_POST["aimInput"]);
#$aimPhoto = ($_POST["aimPhoto"]);

if (empty($aimTitle) or empty($aimText)) {
  echo 'You can not leave name or description empty!';
} else {
  $insert = "INSERT INTO `Aims`(`Username`, `AimName`, `AimText`) VALUES ('$aimUser','$aimTitle','$aimText')";
  $result = mysqli_query($db, $insert);
  echo 'Success!';
}



mysqli_close($db);
?>
