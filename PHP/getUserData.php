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
      send(200, $user);
    }
  }

  $error = ["error" => "User is not found"];
  abort(404, $error);
} else {
  send(200, $users);
}
?>
