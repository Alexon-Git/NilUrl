<?php
include 'cors.php';
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$username = $data['username'];
$password = $data['password'];


$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


$queryMaxId = "SELECT MAX(user_id) AS max_id FROM users";
$resultMaxId = pg_query($conn, $queryMaxId);
$row = pg_fetch_assoc($resultMaxId);
$maxId = $row['max_id'];
$newUserId = ($maxId === null) ? 100000 : $maxId + 1;
$user_status = "free";


$query = "INSERT INTO users (user_id, email, username, password, user_status) VALUES ($1, $2, $3, $4, $5)";
$result = pg_query_params($conn, $query, array($newUserId, $email, $username, $hashedPassword, $user_status));

if (!$result) {
    die("Ошибка выполнения запроса: " . pg_last_error());
}


if (pg_affected_rows($result) > 0) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}

pg_close($conn);
?>