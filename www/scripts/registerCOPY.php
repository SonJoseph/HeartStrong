<?php
require 'connect.php';

$password = md5($_POST["password"]);

$checkUsername = "SELECT COUNT(*) FROM Users WHERE Username = '".$_POST["username"]."'";
$ct = mysqli_query($db, $checkUsername);
$ct->fetch_row()[0];

if($ct == 1){
   echo "username taken";
}else{
    $register = "INSERT INTO Users (Firstname, Lastname, Age, Address, Username, Password) VALUES ('".$_POST["firstname"]."','".$_POST["lastname"]."',".$_POST["age"].",'".$_POST["address"]."','".$_POST["username"]."','".$password."')";
    $result = mysqli_query($db, $register);
    //echo json_encode(array("data"=>"user created"));
    echo "user created";
}

mysqli_close($db);
?>