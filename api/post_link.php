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

        if (isset($data['inputText'], $data['shortUrl'], $data['tagValue'])) {
            
            $inputText = $data['inputText'];
            $shortUrl = str_replace('https://nilurl.ru/', '', $data['shortUrl']);
            $tagValue = $data['tagValue'];
            $tag_backgrounds = $data['tagColors']['color'];
            $tag_svgcolor = $data['tagColors']['svgColor'];
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
          
            $maxIdQuery_links = "SELECT MAX(id_link) as max_id FROM links";
            $maxIdResult_links = pg_query($conn, $maxIdQuery_links);
            if ($maxIdResult_links) {
                $maxIdRow_links = pg_fetch_assoc($maxIdResult_links);
                $newIdLink_links = $maxIdRow_links['max_id'] + 1;}

            $maxIdQuery_utm = "SELECT MAX(id_utm) as max_id FROM utm";
                $maxIdResult_utm = pg_query($conn, $maxIdQuery_utm);
                if ($maxIdResult_utm) {
                    $maxIdRow_utm = pg_fetch_assoc($maxIdResult_utm);
                    $newIdLink_utm = $maxIdRow_utm['max_id'] + 1;
             
                $query = "INSERT INTO links (id_link, base_url, code_url, tag, user_id, commentary, date_last, date_now, ios, android, tag_backgrounds, tag_svgcolor, utm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";
                $result = pg_query_params($conn, $query, array($newIdLink_links, $inputText, $shortUrl, $tagValue, $user_id, $comment, $dateLast, $dateNow, $ios, $android, $tag_backgrounds, $tag_svgcolor, $utm ? 'true' : 'false'));

                if ($result && $utm) {
                  
                    $utmQuery = "INSERT INTO utm (id_utm, code_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_referral, utm_ioc, utm_android) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
                    $utmResult = pg_query_params($conn, $utmQuery, array(
                        $newIdLink_utm,
                        $shortUrl,
                        $utm['UTM Source'] ?? 'false',
                        $utm['UTM Medium'] ?? 'false',
                        $utm['UTM Campaign'] ?? 'false',
                        $utm['UTM Term'] ?? 'false',
                        $utm['UTM Content'] ?? 'false',
                        $utm['Referral'] ?? 'false',
                        $utm['iOS UTM Metrika'] ?? 'false',
                        $utm['Android UTM Metrika'] ?? 'false',
                    ));

                    if (!$utmResult) {
                
                        $response = array('status' => 'error', 'message' => 'Ошибка внесения utm данных в базу');
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
