<?php
include 'cors.php';
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

        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['pathS'])) {
            $pathS = str_replace('nilurl.ru/', '', $data['pathS']);

            // Найти строку в таблице по pathS
            $findQuery = "SELECT * FROM links WHERE code_url = $1 AND user_id = $2";
            $findResult = pg_query_params($conn, $findQuery, array($pathS, $user_id));

            if (pg_num_rows($findResult) > 0) {
                // Удалить запись из таблицы links
                $deleteQuery = "DELETE FROM links WHERE code_url = $1 AND user_id = $2";
                $deleteResult = pg_query_params($conn, $deleteQuery, array($pathS, $user_id));

                if ($deleteResult) {
                    // Проверка наличия строки в таблице utm и удаление её, если она существует
                    $checkUtmQuery = "SELECT * FROM utm WHERE code_url = $1";
                    $checkUtmResult = pg_query_params($conn, $checkUtmQuery, array($pathS));

                    if (pg_num_rows($checkUtmResult) > 0) {
                        $deleteUtmQuery = "DELETE FROM utm WHERE code_url = $1";
                        $deleteUtmResult = pg_query_params($conn, $deleteUtmQuery, array($pathS));

                        if (!$deleteUtmResult) {
                            $response = array('status' => 'error', 'message' => 'Ошибка удаления UTM данных из базы');
                            echo json_encode($response);
                            pg_close($conn);
                            exit;
                        }
                    }

                    // Проверка наличия строки в таблице redirects и удаление её, если она существует
                    $deleteRedirectQuery = "DELETE FROM redirects WHERE code_url = $1";
                    $deleteRedirectResult = pg_query_params($conn, $deleteRedirectQuery, array($pathS));

                    $response = array('status' => 'success', 'message' => 'Запись успешно удалена');
                    echo json_encode($response);
                } else {
                    $response = array('status' => 'error', 'message' => 'Ошибка при удалении записи из базы');
                    echo json_encode($response);
                }
            } else {
                $response = array('status' => 'error', 'message' => 'Запись не найдена');
                echo json_encode($response);
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Неполные данные получены');
            echo json_encode($response);
        }
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array("success" => false, "message" => "Authentication error: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Ошибка метода"));
}

pg_close($conn);
?>
