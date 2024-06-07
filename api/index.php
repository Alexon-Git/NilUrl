<?php
include 'cors.php';
require_once("dbconn.php");
require_once("function.php");
require_once __DIR__ . '/vendor/autoload.php';
date_default_timezone_set('Europe/Moscow');

use Stichoza\GoogleTranslate\GoogleTranslate;
$tr = new GoogleTranslate('ru');

$useragent = $_SERVER["HTTP_USER_AGENT"];

// Браузер
$test = get_browser(null, true);
$browser = $test["browser"] ?? 'Unknown';

// Операционка
$OS = getOS($useragent);

// Устройство
$device = "Компьютер";
if (is_mobile($useragent)){
    $device = "Телефон";
}

// Редирикт или прямая ссылка
$redirect = 0;
// if ($_SERVER['HTTP_REFERER']){
//     $redirect = 1;
// }

// Сегодняшняя дата
$date = date('Y-m-d H:i');

// ip -> город страна
$ip = getIp();
$city_country = get_city_coutry($ip);
$country = $city_country[0];
$city = $city_country[1];

if ($city === null) {
    $city_country = get_city_country_geoplugin($ip);
    $country = $city_country[0];
    $city = $city_country[1];
}

$country = $tr->translate($country);
$city = $tr->translate($city);

function translate_to_russian($translate, $text) {
    $result = $translate->translate($text, [
        'target' => 'ru'
    ]);

    return $result['text'] ?? $text;
}

$request_uri = trim($_SERVER['REQUEST_URI'], '/');
$code = $request_uri;
$allowed_codes = ['main', 'registration', 'login', 'price', 'setting', 'links', 'graph', 'favicon.ico', 'index.html', 'static/css/main.185480fe.css', 'static/js/main.40556f1c.js', 'test.svg', "/favicon.ico HTTP/1.1"];

if (in_array($code, $allowed_codes) || $code === "") {
    $code_next = false;
} else {
    $code_next = true;
}

$sql_check_date = "SELECT date_last FROM links WHERE code_url = ?";
$stmt_check_date = $pdo->prepare($sql_check_date);
$stmt_check_date->execute([$code]);
$row_date = $stmt_check_date->fetch(PDO::FETCH_ASSOC);

$date_time = is_null($row_date['date_last'] ?? null) ? "2039-01-01" : $row_date['date_last'];

if ($code_next) {
    if ($row_date && strtotime($date_time) <= strtotime(date('Y-m-d'))) {
        header("Location: http://nilurl.ru/error");
        exit();
    } else {
        $sql = "SELECT base_url, android, ios FROM links WHERE code_url = :code";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['code' => $code]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            new_redirect($pdo, $date, $browser, $OS, $city, $country, $device, $redirect, $code);
            $sql_utm = "SELECT utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_referral, utm_android, utm_ioc FROM utm WHERE code_url = :code";
            $stmt_utm = $pdo->prepare($sql_utm);
            $stmt_utm->execute(['code' => $code]);
            $row_utm = $stmt_utm->fetch(PDO::FETCH_ASSOC);

           
            $utm_params = [];
                foreach ($row_utm as $key => $value) {
    
                if (!empty($value) && !in_array($key, ['utm_android', 'utm_ioc'])) {
                    $utm_params[$key] = $value;
            }
            }
            $utm_params = http_build_query($utm_params);

          
            $redirect_url = $row['base_url'];
            
            $utm_android = $row_utm['utm_android'];
            $utm_ioc =$row_utm['utm_ioc'];
            echo $utm_android,$utm_ioc;
            $row_utm['utm_android'] = false;
            $row_utm['utm_ioc'] = false;
            if (!empty($utm_params)) {
                $redirect_url .= '?' . $utm_params;
            }

           
            if ($OS === 'Android' && !empty($row['android'])) {
                if ($utm_android) {
                    header("Location: " . $row["android"] . (!empty($utm_params) ? '?' . $utm_params : ''));
                } else {
                    header("Location: " . $row["android"]);
                }
               
            }
      
            elseif ($OS === 'iPhone' && !empty($row['ios'])) {
                if ($utm_ioc) {
                header("Location: " . $row["ios"] . (!empty($utm_params) ? '?' . $utm_params : ''));
            } else {
                header("Location: " . $row["ios"]);
            } 
            }
            else {
                header("Location: " . $redirect_url);
                
            }
            exit();
        } else {
            header("Location: http://nilurl.ru/main");
            exit();
        }
    }
} else {
    header("Location: http://nilurl.ru/main");
    exit();
}
?>
