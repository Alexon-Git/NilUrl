<?php
require_once 'db.php';
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$email = $data['email'];

$accessToken = $_COOKIE['access_token'];
$secretKey_refresh = "0aXbUZ2YySOZOJGZnXMHNA6PFqj5C3DbNlug0R9W";
$secretKey_access = "l0pTUf8Hc7BrywJ";
$algorithm = 'HS256';

try {
    $decoded = JWT::decode($accessToken, new Key($secretKey_access, 'HS256'));
    $user_id = $decoded->user_id;
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Ошибка декодирования токена: ' . $e->getMessage()));
    exit;
}

$query = "SELECT * FROM users WHERE username = $1 AND user_id != $2";
$result = pg_query_params($conn, $query, array($username, $user_id));
if (pg_num_rows($result) > 0) {
    echo json_encode(array('success' => false, 'message' => 'Имя пользователя уже занято.'));
    exit;
}

$query = "SELECT * FROM users WHERE email = $1 AND user_id != $2";
$result = pg_query_params($conn, $query, array($email, $user_id));
if (pg_num_rows($result) > 0) {
    echo json_encode(array('success' => false, 'message' => 'Email уже занят.'));
    exit;
}

$query = "UPDATE users SET username = $1, email = $2 WHERE user_id = $3";
$result = pg_query_params($conn, $query, array($username, $email, $user_id));

if ($result) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;  // access_token срок действия 1 час
    $refreshExpirationTime = $issuedAt + 604800;  // refresh_token срок действия 1 неделя

    $payload = array(
        'user_id' => $user_id,
        'username' => $username,
        'email' => $email,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $accessToken = JWT::encode($payload, $secretKey_access, $algorithm);
    
    $refreshPayload = array(
        'user_id' => $user_id,
        'iat' => $issuedAt,
        'exp' => $refreshExpirationTime
    );

    $refreshToken = JWT::encode($refreshPayload, $secretKey_refresh, $algorithm);

    echo json_encode(array(
        'success' => true,
        'access_token' => $accessToken,
        'refresh_token' => $refreshToken
    ));
} else {
    echo json_encode(array('success' => false, 'message' => 'Ошибка при сохранении изменений.'));
}

pg_close($conn);
?>