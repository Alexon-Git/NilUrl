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
            $shortUrl = str_replace('nilurl.ru/', '', $data['pathS']);

            // Запрос к базе данных для получения данных по pathS
            $query = "SELECT * FROM links WHERE code_url = $1 AND user_id = $2";
            $result = pg_query_params($conn, $query, array($shortUrl, $user_id));

            if ($result && pg_num_rows($result) > 0) {
                $linkData = pg_fetch_assoc($result);

                // Запрос к базе данных для получения данных из таблицы utm
                $utmQuery = "SELECT * FROM utm WHERE code_url = $1";
                $utmResult = pg_query_params($conn, $utmQuery, array($shortUrl));

                if ($utmResult && pg_num_rows($utmResult) > 0) {
                    $utmData = pg_fetch_assoc($utmResult);
                   
                    $linkData['utm_data'] = $utmData;
                    $linkData['utm'] = true;
                } else {
                    $linkData['utm'] = false;
                }

                $response = array('status' => 'success', 'data' => $linkData);
                echo json_encode($response);
            } else {
                $response = array('status' => 'error', 'message' => 'No data found for the given pathS');
                echo json_encode($response);
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Parameter pathS is missing');
            echo json_encode($response);
        }
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(array("success" => false, "message" => "Authentication error: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Method Not Allowed"));
}

pg_close($conn);
?>
