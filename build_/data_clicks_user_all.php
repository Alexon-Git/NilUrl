<?php
require_once 'db.php';
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Получение access_token из куки
$accessToken = $_COOKIE['access_token'];
$secretKey_access = "l0pTUf8Hc7BrywJ";
$algorithm = 'HS256';

// Декодирование токена для получения user_id
try {
    $decoded = JWT::decode($accessToken, new Key($secretKey_access, 'HS256'));
    $user_id = $decoded->user_id;
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Ошибка декодирования токена: ' . $e->getMessage()));
    exit;
}

// Массив для хранения результатов
$response = array();

// Запрос для получения уникальных полей code_url из таблицы links для заданного пользователя
$sql_links = "SELECT DISTINCT code_url FROM links WHERE user_id = $1";
$result_links = pg_query_params($conn, $sql_links, array($user_id));

if (!$result_links) {
    echo json_encode(array('success' => false, 'message' => 'Ошибка выполнения запроса к таблице links.'));
    exit;
}

$code_urls = array();
while ($row = pg_fetch_assoc($result_links)) {
    $code_urls[] = $row['code_url'];
}

pg_free_result($result_links);

// Если нашли code_url, делаем следующий запрос
if (!empty($code_urls)) {
    // Подготовка строки с параметрами для IN
    $placeholders = implode(',', array_fill(0, count($code_urls), '$' . (count($code_urls) + 1)));
    $params = array_merge(array($user_id), $code_urls);

    // Запрос для получения полей из таблицы redirects, которые содержат значения этих уникальных полей code_url
    $sql_redirects = "SELECT * FROM redirects WHERE code_url IN ($placeholders)";
    $result_redirects = pg_query_params($conn, $sql_redirects, $code_urls);

    if (!$result_redirects) {
        echo json_encode(array('success' => false, 'message' => 'Ошибка выполнения запроса к таблице redirects.'));
        exit;
    }

    while ($row = pg_fetch_assoc($result_redirects)) {
        $response[] = $row;
    }

    pg_free_result($result_redirects);
}

pg_close($conn);

echo json_encode($response);
?>
