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

    $query = "SELECT clients.first_name, clients.last_name, 
	eq_company, eq_model, eq_damage_desc, repair_desc, 
	repair_status, internal_repairs.id FROM internal_repairs
    JOIN clients ON clients.id = internal_repairs.client_id ORDER BY internal_repairs.id ASC";
    $stmt = $db_connection->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $countQuery = "SELECT COUNT(*) AS repair_count FROM internal_repairs";
    $stmt = $db_connection->prepare($countQuery);
    $stmt->execute();
    $repairCount = $stmt->fetch(PDO::FETCH_ASSOC);

    $api_response = [
        "repair_count" => $repairCount["repair_count"],
        "data" => $data
    ];

    echo json_encode($api_response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
