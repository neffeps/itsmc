git<?php
    session_start();
    require_once 'db_connection.php';

    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *"); // Pozwala na dostęp ze wszystkich domen
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Dozwolone metody
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Dozwolone nagłówki

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        file_put_contents("debug.log", file_get_contents("php://input"));
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            echo json_encode(["error" => "Brak nazwy użytkownika lub hasła"]);
            exit();
        }

        $username = $data['username'];
        $password = $data['password'];

        $stmt = $db_connection->prepare("SELECT id, username, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo json_encode(["success" => true, "message" => "Zalogowano poprawnie"]);
        }
        else {
            echo json_encode(["error" => "Nieprawidłowe hasło"]);
        }
    }
?>