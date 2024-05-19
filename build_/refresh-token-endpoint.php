<?php
require_once 'db.php';
require_once 'vendor/autoload.php'; // Автозагрузчик Composer

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$data = json_decode(file_get_contents('php://input'), true);
$refreshToken = $data['refreshToken'];

// Проверяем refresh токен
try {
    $secretKey_refresh = "0aXbUZ2YySOZOJGZnXMHNA6PFqj5C3DbNlug0R9W";
    $secretKey_access = "l0pTUf8Hc7BrywJ";
    $decoded = JWT::decode($refreshToken, new Key($secretKey_refresh, 'HS256'));
    $userId = $decoded->user_id;

    // Подготавливаем запрос для получения пользователя по user_id
    $query = "SELECT * FROM users WHERE user_id = $1";
    $result = pg_query_params($conn, $query, array($userId));

    if (!$result) {
        die("Ошибка выполнения запроса: " . pg_last_error());
    }

    if (pg_num_rows($result) == 1) {
        // Получаем данные пользователя
        $user = pg_fetch_assoc($result);

        // Создаем новый access токен
        $payload = array(
            "user_id" => $user['user_id'],
            "email" => $user['email'],
            "username" => $user['username'],
            "exp" => time() + 3600 // Токен будет действителен 1 час
        );
        $newAccessToken = JWT::encode($payload, $secretKey_access, 'HS256');

        // Возвращаем новый access токен
        echo json_encode(array("accessToken" => $newAccessToken));
    } else {
        echo json_encode(array("success" => false, "message" => "Пользователь не найден"));
    }

} catch (Exception $e) {
    echo json_encode(array("success" => false, "message" => "Неверный refresh токен"));
}

pg_close($conn);
?>
