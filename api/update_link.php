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

        if (isset($data['inputText'], $data['shortUrl'], $data['pathS'], $data['tagValue'], $data['tagColors'])) {

            $inputText = $data['inputText'];
            $shortUrl = str_replace('https://nilurl.ru/', '', $data['shortUrl']);
            $pathS = str_replace('nilurl.ru/', '', $data['pathS']);
            $tagValue = $data['tagValue'];
            $android = $data['toggles']['android'] ?: 'false';
            $ios = $data['toggles']['ios'] ?: 'false';
            $comment = $data['comment'] ?? null;
            $dateLast = !empty($data['toggles']['date']) ? date('Y-m-d', strtotime($data['toggles']['date'])) : null;
            $utm = $data['toggles']['utm'] ?? false;
            $tagBackgrounds = $data['tagColors']['color'];
            $tagSvgColor = $data['tagColors']['svgColor'];

            if ($pathS === $shortUrl) {
                // Найти строку в таблице по pathS
                $findQuery = "SELECT * FROM links WHERE code_url = $1 AND user_id = $2";
                $findResult = pg_query_params($conn, $findQuery, array($pathS, $user_id));

                if (pg_num_rows($findResult) > 0) {
                    // Обновить существующую запись
                    $updateQuery = "UPDATE links SET base_url = $1, tag = $2, commentary = $3, date_last = $4, ios = $5, android = $6, utm = $7, tag_backgrounds = $8, tag_svgcolor = $9 WHERE code_url = $10 AND user_id = $11";
                    $updateResult = pg_query_params($conn, $updateQuery, array($inputText, $tagValue, $comment, $dateLast,  $ios, $android, $utm ? 'true' : 'false', $tagBackgrounds, $tagSvgColor, $pathS, $user_id));

                    if ($updateResult) {
                        if ($utm) {
                            // Проверка наличия строки в таблице utm
                            $checkUtmQuery = "SELECT * FROM utm WHERE code_url = $1";
                            $checkUtmResult = pg_query_params($conn, $checkUtmQuery, array($pathS));

                            if (pg_num_rows($checkUtmResult) > 0) {
                                // Обновить существующую запись utm
                                $utmQuery = "UPDATE utm SET utm_source = $1, utm_medium = $2, utm_campaign = $3, utm_term = $4, utm_content = $5, utm_referral = $6, utm_ioc= $7, utm_android= $8 WHERE code_url = $9";
                                $utmResult = pg_query_params($conn, $utmQuery, array(
                                    $utm['UTM Source'] ?? 'false',
                                    $utm['UTM Medium'] ?? 'false',
                                    $utm['UTM Campaign'] ?? 'false',
                                    $utm['UTM Term'] ?? 'false',
                                    $utm['UTM Content'] ?? 'false',
                                    $utm['UTM Referral'] ?? 'false',
                                    $utm['UTM iOC'] ?? 'false',
                                    $utm['UTM Android'] ?? 'false',
                                    $pathS,
                                ));
                            } else {
                                // Создать новую запись utm
                                $maxIdQuery_utm = "SELECT MAX(id_utm) as max_id FROM utm";
                                $maxIdResult_utm = pg_query($conn, $maxIdQuery_utm);
                                if ($maxIdResult_utm) {
                                    $maxIdRow_utm = pg_fetch_assoc($maxIdResult_utm);
                                    $newIdLink_utm = $maxIdRow_utm['max_id'] + 1;}

                                $utmQuery = "INSERT INTO utm (id_utm, code_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_referral,utm_ioc,utm_android) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10)";
                                $utmResult = pg_query_params($conn, $utmQuery, array(
                                    $newIdLink_utm,
                                    $pathS,
                                    $utm['UTM Source'] ?? 'false',
                                    $utm['UTM Medium'] ?? 'false',
                                    $utm['UTM Campaign'] ?? 'false',
                                    $utm['UTM Term'] ?? 'false',
                                    $utm['UTM Content'] ?? 'false',
                                    $utm['UTM Referral'] ?? 'false',
                                    $utm['UTM iOC'] ?? 'false',
                                    $utm['UTM Android'] ?? 'false',
                                ));
                            }

                            if (!$utmResult) {
                                $response = array('status' => 'error', 'message' => 'Заполните значения UTM');
                                echo json_encode($response);
                                pg_close($conn);
                                exit;
                            }
                        } else {
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
                        }

                        $response = array('status' => 'success', 'message' => 'Данные успешно обновлены');
                        echo json_encode($response);
                    } else {
                        $response = array('status' => 'error', 'message' => 'Ошибка при обновлении данных в базе');
                        echo json_encode($response);
                    }
                } else {
                    $response = array('status' => 'error', 'message' => 'Запись не найдена');
                    echo json_encode($response);
                }
            } else {
                $response = array('status' => 'error', 'message' => 'pathS и shortUrl не совпадают');
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
