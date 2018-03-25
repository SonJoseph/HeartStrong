<?php
require 'connect.php';

$password = md5($_POST["password"]);

$sql = 'SELECT COUNT(*) FROM Users WHERE Username = "'.$_POST["username"].'" AND Password = "'.$password.'"';

$result = mysqli_query($db, $sql);
$ct = $result->fetch_assoc()["COUNT(*)"];


if($ct==1){
    setcookie('user', $_POST['username'],  time() + (86400 * 30), '/');
    echo 'logged in!';
}else{
    echo 'incorrect username or password';
}
?>