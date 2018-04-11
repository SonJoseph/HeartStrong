<?php
require 'connect.php';

$sql = "SELECT AimName FROM Aims WHERE PatientID=1";
$result = $conn->query($sql);
$htmlTable = '<table border="1" cellspacing="0" cellpadding="2">
              <tr>';
$haveTable = 'no';


if ($result->num_rows > 0) {
  $haveTable = 'yes';
  while($row = $result->fetch_assoc()) {
    $htmlTable .= "<tr><td>".$row["AimName"]."</td></td>";
  }
  $htmlTable .= "</tr>"
} else {
  echo "You haven't input any aims yet!";
}

mysqli_close($db);

?>
