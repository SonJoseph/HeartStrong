<?php
require 'connect.php';


$text = ($_POST["aimInput"]);

#Get ID from users, auto increment aimnumber (after posting works)
$aimID = 1;
$aimNumber = 2;

$insert = "INSERT INTO `Aims`(`ID`, `AimNumber`, `AimText`) VALUES ('$aimID','$aimNumber','$text')");
$result = mysqli_query($db, $sql);


mysqli_close($db);
?>
