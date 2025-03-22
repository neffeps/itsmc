<?php
    require_once "db_connection.php";

    header("Content-Type: application/json");

    $query = "SELECT users.username FROM users";
    $stmt = $db_connection->prepare($query);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
?>