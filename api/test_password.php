<?php
session_start();
require_once 'db_connection.php'; // Połączenie do bazy

header('Content-Type: application/json');

$username = "User"; // <--- BRAKOWAŁO ŚREDNIKA
$newPassword = "test";  // <--- BRAKOWAŁO ŚREDNIKA

// Sprawdzenie, czy użytkownik istnieje
$stmt = $db_connection->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(["error" => "Użytkownik nie istnieje"]);
    exit();
}

// Hashowanie nowego hasła bcrypt
$hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

// Aktualizacja hasła w bazie
$stmt = $db_connection->prepare("UPDATE users SET password = ? WHERE username = ?");
if ($stmt->execute([$hashedPassword, $username])) {
    echo json_encode(["success" => "Hasło zostało zmienione"]);
} else {
    echo json_encode(["error" => "Błąd podczas zmiany hasła"]);
}
?>