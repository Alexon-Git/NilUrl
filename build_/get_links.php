<?php
// Подключение к базе данных
require_once 'db.php';

$user_id = $_GET['user_id'];

$query = "
    SELECT l.base_url, l.code_url, l.tag, l.commentary, l.utm, l.android, l.ios, COALESCE(r.clicks, 0) as clicks
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
    echo json_encode($links);
} else {
    echo json_encode(array("success" => false, "message" => "Ошибка при получении данных."));
}

// Закрытие соединения с базой данных
pg_close($conn);
?>