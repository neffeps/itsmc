<?php
    require_once "db_connection.php";
        
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/', 
        'domain' => 'neffeps.x10.mx',
        'secure' => true,  
        'httponly' => true,  
        'samesite' => 'None' 
    ]);

    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true"); 
    header("Access-Control-Allow-Origin: https://neffeps.github.io"); // Pozwala na dostęp ze wszystkich domen
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Dozwolone metody
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Dozwolone nagłówki
    session_start();

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    if(!isset($_SESSION['user_id'])) {
        echo json_encode(["error" => "Brak dostępu, zaloguj się."]);
        exit();
    }

    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        echo json_encode(["error" => "Nieprawidłowe ID"]);
        exit();
    }

    $id = intval($_GET['id']);
    $query = "SELECT 
    customers.first_name,
    customers.last_name,
    local_services.id,
    devices.brand,
    devices.model,
    devices.type AS device_type,
    local_services.type AS repair_type,
    local_services.creation_date,
    local_services.status,
    local_services.damage_description,
    local_services.repair_description
    FROM local_services
    JOIN customers ON customers.id = local_services.customer_id
    JOIN devices ON devices.id = local_services.device_id
    WHERE local_services.id = ?";
    $stmt = $db_connection->prepare($query);
    $stmt->execute([$id]);
    $data_row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($data_row) {
        echo json_encode($data_row);
    } else {
        echo json_encode(["error" => "Brak danych"]);
    }
?>