<?php
// Подключение к базе данных
require_once 'db.php';
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $accessToken = $_COOKIE['access_token'];
    $secretKey_access = "l0pTUf8Hc7BrywJ";

    try {
  
        $decoded = JWT::decode($accessToken, new Key($secretKey_access, 'HS256'));
        $user_id = $decoded->user_id;


        $query = "DELETE FROM users WHERE user_id = $1";
        $result = pg_query_params($conn, $query, array($user_id));

        if ($result) {
        
            $response = array("success" => true);
            echo json_encode($response);
        } else {
            
            $response = array("success" => false, "message" => "Ошибка при удалении аккаунта.");
            echo json_encode($response);
        }
    } catch (Exception $e) {
        
        http_response_code(401);
        echo json_encode(array("success" => false, "message" => "Ошибка аутентификации: " . $e->getMessage()));
    }
} else {
    
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Метод запроса не поддерживается."));
}


pg_close($conn);
?>
