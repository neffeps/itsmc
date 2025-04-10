<?php
    $host = "localhost";
    $db_name = "ofbsthnt_itsmc";
    $username = "ofbsthnt_itsmc";
    $password = "sXkM7TSZEhgTrZkLGYga";

    try { //próba połączenia
        $db_connection = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
        $db_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $error) { //złapanie błędów
        echo json_encode(["error_code" => "Błąd połączenia z bazą: " . $error->getMessage()]);
        exit();
    }
?>