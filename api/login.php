<?php
    session_start();
    require_once 'db_connection.php';

    header('Content-Type: application/json');

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