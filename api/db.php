<?php
    $host = "localhost"; 
    $port = "5433"; 
    $dbname = "nilurl"; 
    $user = "postgres"; 
    $password = "postgres"; 
     

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user  password=$password");
if (!$conn) {
    die("Ошибка подключения к базе данных: " . pg_last_error());
}
?>
