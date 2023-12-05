<?php
ini_set("display_errors", 1);

require_once "helper.php";

allowCORS();
allowMethod("POST");
allowJSON();

$filename = "../database/data.json";

$json = file_get_contents($filename);
$data = json_decode($json, true);
$users = $data["users"];
$groups = $data["groups"];

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

$userToSend = null;
$userIsFound = false;
$imagesArray = array();

if (isset($requestData["usernames"])) {
  $usernames = $requestData["usernames"];
  foreach ($usernames as $username) {
    foreach ($users as $user) {
      if ($user["username"] === $username) {
        array_push($imagesArray, $user["profilePicture"]);
      }
    }
  }
}

send($imagesArray, 200);

?>
