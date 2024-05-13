<?php
require_once 'db.php';

// Получаем данные из запроса
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$username = $data['username'];

// Подготавливаем запрос для проверки уникальности
$query = "SELECT * FROM users WHERE email = $1 OR username = $2";
$result = pg_query_params($conn, $query, array($email, $username));

if (!$result) {
    die("Ошибка выполнения запроса: " . pg_last_error());
}

// Если найдена хотя бы одна запись, значит email или имя пользователя уже заняты
if (pg_num_rows($result) > 0) {
    echo json_encode(array("success" => false));
} else {
    echo json_encode(array("success" => true));
}

pg_close($conn);
?>