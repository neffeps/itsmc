<?php
    $host = "sql112.infinityfree.com";
    $db_name = "if0_38581725_itsmc_admin";
    $username = "if0_38581725";
    $password = "Diaxymc12";

    try { //próba połączenia
        $db_connection = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
        $db_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $error) { //złapanie błędów
        echo json_encode(["error_code" => "Błąd połączenia z bazą: " . $error->getMessage()]);
        exit();
    }
?>