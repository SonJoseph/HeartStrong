<?php
require 'connect.php';

#maybe change aimID to patientID (will connect aims to patients)
$aimID = 1;
$aimTitle = ($_POST["aimTitle"]);
$aimText = ($_POST["aimInput"]);
#$aimPhoto = ($_POST["aimPhoto"]);

$insert = "INSERT INTO `Aims`(`PatientID`, `AimName`, `AimText`) VALUES ('$aimID','$aimTitle','$aimText')";
$result = mysqli_query($db, $insert);


mysqli_close($db);
?>
