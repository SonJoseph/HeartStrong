<?php
require 'connect.php';

$aimID = 1;
$journalInput = ($_POST["journal"]);
$mood = ($_POST["mood"]);

if (empty($aimTitle) or $mood === null)) {
  echo 'Please fill out the form and select a mood!';
} else {
  $insert = "INSERT INTO `JournalEntry`(`PatientID`, `JournalEntry`, `Mood`) VALUES ('$aimID','$aimTitle','$aimText')";
  $result = mysqli_query($db, $insert);
  echo 'Success!'
}



mysqli_close($db);
?>
