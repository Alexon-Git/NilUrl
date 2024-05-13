<?php
    $host = "localhost"; 
    $port = "5432"; 
    $dbname = "nilurl"; 
    $user = "dins"; 
    $password = "kvd19b17"; 
     

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user  password=$password");
if (!$conn) {
    die("Ошибка подключения к базе данных: " . pg_last_error());
}
?>
