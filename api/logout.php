<?php
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/', 
        'domain' => 'neffeps.x10.mx',
        'secure' => true,  
        'httponly' => true,  
        'samesite' => 'None' 
    ]);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Credentials: true"); 
    header("Access-Control-Allow-Origin: https://neffeps.github.io");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    session_start();
    session_destroy();
    echo json_encode(["success" => true, "message" => "Wylogowano poprawnie"]);
?> 