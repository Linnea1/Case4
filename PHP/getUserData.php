<?php
ini_set("display_errors", 1);

require_once "helper.php";

allowCORS();
allowMethod("GET");

$filename = "../database/data.json";

$id = $_GET["userId"];

if (file_exists($filename)) {
  $json = file_get_contents($filename);
  $data = json_decode($json, true);
  $users = $data["users"];
}

if (isset($id)) {
  foreach($users as $user) {
    if (trim($user["userId"]) === $id) {
      send($user, 200);
    }
  }

  $error = ["error" => "User is not found"];
  abort($error, 404);
} else {
  send($users, 200);
}
?>
