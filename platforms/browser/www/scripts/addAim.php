<?php

require 'connect.php';

$sql = "INSERT INTO Aims (PatientID, AimNumber, AimText) VALUES ('"1"','"2"',".$_POST["aimtext"].")";

$result = mysqli_query($db, $sql);
mysqli_close($db);
?>
