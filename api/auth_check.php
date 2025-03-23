<?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: https://neffeps.github.io"); // Pozwala na dostęp ze wszystkich domen
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Dozwolone metody
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Dozwolone nagłówki

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if (isset($_SESSION['user_id'])) {
        echo json_encode(["auth" => true, "username" => $_SESSION['username']]);
    } 
    else {
        echo json_encode(["auth" => false]);
    }
?>