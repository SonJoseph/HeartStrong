<?php
require 'connect.php';

setcookie('user', $_POST['username'],  time() + (86400 * 30), '/');

echo 'cookie created!';
?>