<?php

require_once 'db.php';

try {
    // Получаем всех пользователей и их user_status
    $query = "SELECT user_id, user_status FROM users";
    $result = pg_query($conn, $query);

    if ($result && pg_num_rows($result) > 0) {
        while ($row = pg_fetch_assoc($result)) {
            $user_id = $row['user_id'];
            $user_status = $row['user_status'];

            // Определяем значение available_links в зависимости от user_status
            $available_links = 0;
            if ($user_status === 'free') {
                $available_links = 10;
            } elseif ($user_status === 'base') {
                $available_links = 100;
            } elseif ($user_status === 'premium') {
                $available_links = 1000;
            }

            // Обновляем значение available_links для текущего пользователя
            $update_query = "UPDATE users SET available_links = $1 WHERE user_id = $2";
            $update_result = pg_query_params($conn, $update_query, array($available_links, $user_id));

            if (!$update_result) {
                echo json_encode(array("success" => false, "message" => "Ошибка при обновлении данных для пользователя с ID: $user_id."));
                pg_close($conn);
                exit;
            }
        }

        echo json_encode(array("success" => true, "message" => "Количество доступных ссылок обновлено для всех пользователей."));
    } else {
        echo json_encode(array("success" => false, "message" => "Пользователи не найдены или ошибка при получении данных."));
    }
} catch (Exception $e) {
    echo json_encode(array("success" => false, "message" => "Произошла ошибка: " . $e->getMessage()));
}

pg_close($conn);
?>