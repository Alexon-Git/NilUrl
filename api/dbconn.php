<?php
	$dsn = "pgsql:host=localhost;port=5433;dbname=nilurl;";
	// make a database connection
	$pdo = new PDO($dsn, "postgres", "postgres", [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
	if ($pdo) {
		echo "Connected to the  database successfully!";
       
        }
	else{
		echo"no";
	}

?>