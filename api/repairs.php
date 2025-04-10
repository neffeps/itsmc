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

    $query = "SELECT  
    local_services.damage_description,
    local_services.repair_description, 
    local_services.id,   
    local_services.status, 
    local_services.type, 
    customers.company_name, 
    customers.first_name, 
    customers.last_name, 
    devices.brand, 
    devices.model, 
    devices.type 
    FROM local_services 
    JOIN customers ON customers.id = local_services.customer_id 
    JOIN devices ON devices.id = local_services.device_id 
    ORDER BY local_services.id ASC;";
    $stmt = $db_connection->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $countQuery = "SELECT COUNT(*) AS repair_count FROM local_services";
    $stmt = $db_connection->prepare($countQuery);
    $stmt->execute();
    $repairCount = $stmt->fetch(PDO::FETCH_ASSOC);

    $minMaxIdQuery = "SELECT MIN(id) AS min_id, MAX(id) AS max_id FROM local_services";
    $stmt = $db_connection->prepare($minMaxIdQuery);
    $stmt->execute();
    $minMaxId = $stmt->fetch(PDO::FETCH_ASSOC);

    $api_response = [
        "repair_count" => $repairCount["repair_count"],
        "min_id" => $minMaxId["min_id"],
        "max_id" => $minMaxId["max_id"],
        "data" => $data
    ];

    echo json_encode($api_response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
