<?php
require 'connect.php';

$sql = "SELECT AimName FROM Aims WHERE PatientID=1";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo $row["AimName"]."<br>";
    echo 'something is working?'
  }
} else {
  echo "You haven't input any aims yet!";
}

mysqli_close($db);

?>
