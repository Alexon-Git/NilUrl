<?php
include 'cors.php';
require_once 'db_pdo.php';
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$accessToken = $_COOKIE['access_token'];
$secretKey_access = "l0pTUf8Hc7BrywJ";
$algorithm = 'HS256';

try {
    $decoded = JWT::decode($accessToken, new Key($secretKey_access, 'HS256'));
    $user_id = $decoded->user_id;
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Ошибка декодирования токена: ' . $e->getMessage()));
    exit;
}

// Извлечение параметра pathS из GET-запроса
$pathS = isset($_GET['pathS']) ? $_GET['pathS'] : null;

if ($pathS) {
    // Если pathS не содержит схему, добавляем фиктивную схему для корректной работы parse_url
    if (strpos($pathS, '://') === false) {
        $pathS = 'http://' . $pathS;
    }

    $parsedUrl = parse_url($pathS);
    if (isset($parsedUrl['path'])) {
        $pathS = ltrim($parsedUrl['path'], '/');
    } else {
        echo json_encode(array('success' => false, 'message' => 'Некорректный URL pathS'));
        exit;
    }
   
    // Подготовка и выполнение запроса к таблице redirects с pathS
    $stmt = $pdo->prepare("SELECT * FROM redirects WHERE code_url = :pathS");
    $stmt->execute(['pathS' => $pathS]);
    $redirects = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    // Подготовка и выполнение запроса к таблице links
    $stmt = $pdo->prepare("SELECT DISTINCT code_url FROM links WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $code_urls = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Подготовка и выполнение запроса к таблице redirects
    $stmt = $pdo->prepare("SELECT * FROM redirects WHERE code_url IN (" . implode(',', array_fill(0, count($code_urls), '?')) . ")");
    $stmt->execute($code_urls);
    $redirects = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Вывод результатов в формате JSON

echo json_encode($redirects);


?>