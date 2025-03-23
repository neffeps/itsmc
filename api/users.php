<?php

    require_once "db_connection.php";

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *"); // Pozwala na dostęp ze wszystkich domen
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Dozwolone metody
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Dozwolone nagłówki

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $query = "SELECT users.username FROM users";
    $stmt = $db_connection->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
?>