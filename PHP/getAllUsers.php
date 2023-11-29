<?php
ini_set("display_errors", 1);

require_once "helper.php";

allowCORS();

$filename = "../database/data.json";

if (file_exists($filename)) {
  $json = file_get_contents($filename);
  $data = json_decode($json, true);
  $users = $data["users"];
}

send($users, 200);
?>
