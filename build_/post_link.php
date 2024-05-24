<?php

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

        if (isset($data['inputText'], $data['shortUrl'], $data['tagValue'])) {
            
            $inputText = $data['inputText'];
            $shortUrl = str_replace('https://nilurl.ru/', '', $data['shortUrl']);
            $tagValue = $data['tagValue'];
            $android = $data['toggles']['android'] ?: 'false';
            $ios = $data['toggles']['ios'] ?: 'false';
            $comment = $data['comment'] ?? null;
            $dateLast = !empty($data['toggles']['date']) ? date('Y-m-d', strtotime($data['toggles']['date'])) : null;
            $dateNow = date('Y-m-d'); 

            $utm = $data['toggles']['utm'] ?? false;

            $checkShortUrlQuery = "SELECT EXISTS (SELECT 1 FROM links WHERE code_url = $1)";
            $checkShortUrlResult = pg_query_params($conn, $checkShortUrlQuery, array($shortUrl));
            $shortUrlExists = pg_fetch_result($checkShortUrlResult, 0, 0);

            if ($shortUrlExists === 't') {
               
                $response = array('status' => 'error', 'message' => 'Короткий URL уже существует, попробуйте другой.');
                echo json_encode($response);
                pg_close($conn);
                exit;
            }
          
            $maxIdQuery = "SELECT MAX(id_link) as max_id FROM links";
            $maxIdResult = pg_query($conn, $maxIdQuery);
            if ($maxIdResult) {
                $maxIdRow = pg_fetch_assoc($maxIdResult);
                $newIdLink = $maxIdRow['max_id'] + 1;

             
                $query = "INSERT INTO links (id_link, base_url, code_url, tag, user_id, commentary, date_last, date_now, ios, android, utm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
                $result = pg_query_params($conn, $query, array($newIdLink, $inputText, $shortUrl, $tagValue, $user_id, $comment, $dateLast, $dateNow, $ios, $android, $utm ? 'true' : 'false'));

                if ($result && $utm) {
                  
                    $utmQuery = "INSERT INTO utm (id_utm, code_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_referral) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
                    $utmResult = pg_query_params($conn, $utmQuery, array(
                        $newIdLink,
                        $shortUrl,
                        $utm['UTM Source'] ?? 'false',
                        $utm['UTM Medium'] ?? 'false',
                        $utm['UTM Campaign'] ?? 'false',
                        $utm['UTM Term'] ?? 'false',
                        $utm['UTM Content'] ?? 'false',
                        $utm['Referral'] ?? 'false'
                    ));

                    if (!$utmResult) {
                
                        $response = array('status' => 'error', 'message' => 'Ошибка внесения umt данных в базу');
                        echo json_encode($response);
                        pg_close($conn);
                        exit;
                    }
                }

                if ($result) {
                  
                    $response = array('status' => 'success', 'message' => 'Успешно внесены данные');
                    echo json_encode($response);
                } else {
                    
                    $response = array('status' => 'error', 'message' => 'Ошибка при внесении данных в базу');
                    echo json_encode($response);
                }
            } else {
             
                $response = array('status' => 'error', 'message' => 'Ошибка id в базе данных');
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
