<?php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

// Подготавливаем запрос для получения пользователя по email
$query = "SELECT * FROM users WHERE email = $1";
$result = pg_query_params($conn, $query, array($email));

if (!$result) {
    die("Ошибка выполнения запроса: " . pg_last_error());
}

// Проверяем, найден ли пользователь с указанным email
if (pg_num_rows($result) == 1) {
    // Получаем данные пользователя
    $user = pg_fetch_assoc($result);
    // Проверяем совпадение хэша пароля
    if (password_verify($password, $user['password'])) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
} else {
    echo json_encode(array("success" => false));
}

pg_close($conn);
?>