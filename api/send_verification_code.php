<?php
require 'vendor/autoload.php'; // Подключение автозагрузчика Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Включение обработки ошибок
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Установка заголовков
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Получение данных из POST-запроса
$data = json_decode(file_get_contents("php://input"));

// Проверка наличия необходимых данных
if (!isset($data->email) || !isset($data->username)) {
    echo json_encode(["success" => false, "message" => "Необходимые данные отсутствуют."]);
    exit();
}

$email = $data->email;
$username = $data->username;

// Генерация проверочного кода
$verificationCode = rand(100000, 999999);

// Настройка PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com'; // Замените на адрес вашего SMTP-сервера
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@example.com'; // Ваш email для отправки
    $mail->Password = 'your_email_password'; // Пароль от вашего email
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Получатель и отправитель
    $mail->setFrom('your_email@example.com', 'NILUrl Registration'); // Замените на ваш email и имя отправителя
    $mail->addAddress($email);

    // Настройки письма
    $mail->isHTML(true);
    $mail->Subject = 'Verification Code';
    $mail->Body    = "Здравствуйте, $username!<br><br>Ваш проверочный код: <b>$verificationCode</b><br><br>Спасибо за регистрацию!";

    // Отправка письма
    $mail->send();
    echo json_encode(["success" => true, "verificationCode" => $verificationCode]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Ошибка при отправке письма: {$mail->ErrorInfo}"]);
}
?>