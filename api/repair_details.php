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
    $query = "SELECT users.username AS assigned_user, internal_repairs.id, 
            internal_repairs.eq_company, internal_repairs.eq_model, 
            internal_repairs.eq_type, internal_repairs.eq_status, 
            internal_repairs.eq_damage_desc, internal_repairs.repair_desc,
            internal_repairs.repair_status, internal_repairs.repair_type, 
            clients.is_company, clients.first_name, clients.last_name,
            clients.company_name, clients.nip, clients.street, 
            clients.street_number, clients.room_number, clients.city,
            clients.email_addresses, clients.phone_numbers, 
            internal_repairs.creation_date
            FROM internal_repairs 
            LEFT JOIN clients ON clients.id = internal_repairs.client_id 
            LEFT JOIN users ON users.id = internal_repairs.user_id
            WHERE internal_repairs.id = ?";
    $stmt = $db_connection->prepare($query);
    $stmt->execute([$id]);
    $data_row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($data_row) {
        echo json_encode($data_row);
    } else {
        echo json_encode(["error" => "Brak danych"]);
    }
?>