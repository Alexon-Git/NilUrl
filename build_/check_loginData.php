<?php
require_once 'db.php';
require_once 'vendor/autoload.php'; 

use \Firebase\JWT\JWT;

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];


$query = "SELECT * FROM users WHERE email = $1";
$result = pg_query_params($conn, $query, array($email));

if (!$result) {
    die("Ошибка выполнения запроса: " . pg_last_error());
}


if (pg_num_rows($result) == 1) {
    $user = pg_fetch_assoc($result);
    if (password_verify($password, $user['password'])) {
        $secretKey_refresh = "0aXbUZ2YySOZOJGZnXMHNA6PFqj5C3DbNlug0R9W";
        $secretKey_access = "l0pTUf8Hc7BrywJ";
        $algorithm = 'HS256';
        $refresh_payload = array(
            "user_id" => $user['user_id'],
            "exp" => time() + (7 * 24 * 60 * 60) // Токен будет действителен 7 дней
        );
        $refresh_token = JWT::encode($refresh_payload, $secretKey_refresh, $algorithm); 
        
        $access_payload = array(
            "user_id" => $user['user_id'],
            "email" => $user['email'],
            "username" => $user['username'],
            "exp" => time() + (15 * 60) // Токен будет действителен 15 минут
        );
        $access_token = JWT::encode($access_payload, $secretKey_access, $algorithm); 
        echo json_encode(array("success" => true, "refresh_token" => $refresh_token, "access_token" => $access_token));
    } else {
        echo json_encode(array("success" => false, "message" => "Неверный пароль"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Пользователь не найден"));
}

pg_close($conn);
?>
