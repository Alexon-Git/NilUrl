<?php
// Подключение к базе данных
require_once 'db.php';

$user_id = $_GET['user_id'];

$query = "
    SELECT l.base_url, l.code_url, l.tag, l.commentary, l.utm, TO_CHAR(l.date_now, 'DD.MM.YYYY') as date_now, l.android, l.ios, COALESCE(r.clicks, 0) as clicks
    FROM links l
    LEFT JOIN (
        SELECT code_url, COUNT(*) as clicks
        FROM redirects
        GROUP BY code_url
    ) r ON l.code_url = r.code_url
    WHERE l.user_id = $1
";

$result = pg_query_params($conn, $query, array($user_id));

if ($result) {
    $links = pg_fetch_all($result);

    // Преобразование значений utm, android, ios в булевы значения
    foreach ($links as &$link) {
        $link['utm'] = $link['utm'] == 't' ? true : false;
        $link['android'] = empty($link['android']) || $link['android'] === 'false' ? false : true;
        $link['ios'] = empty($link['ios']) || $link['ios'] === 'false' ? false : true;
    }

    echo json_encode($links);
} else {
    echo json_encode(array("success" => false, "message" => "Ошибка при получении данных."));
}

// Закрытие соединения с базой данных
pg_close($conn);
?>
