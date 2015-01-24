<?php
$username = "root";
$password = "";

session_start();

$_SESSION['user_id'] = 1;

$db = new PDO('mysql:dbname=todo;host=localhost', $username, $password);

 
//Check this later for better validation method//
if(!isset($_SESSION['user_id'])){
	die('Please log in first');
	}
?>
