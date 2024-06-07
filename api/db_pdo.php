<?php
$host = "localhost"; 
$port = "5433";
$dbname = "nilurl"; 
$username = "postgres"; 
$password = "postgres"; 

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}
?>
