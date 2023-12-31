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
  $groups = $data["groups"];
}

$userToSend = null;
$userIsFound = false;
$groupsFound = array();

if (isset($id)) {
  foreach($users as $user) {
    if (trim($user["userId"]) === $id) {
      $userIsFound = $user;
      $userGroups = $user["groups"];
      foreach($userGroups as $userGroup) {
        foreach($groups as $group) {
          if ($userGroup === $group["groupId"]) {
            array_push($groupsFound, $group);
          }
        }
      }
      send($groupsFound, 200);
    }
  }

  $error = ["error" => "User is not found"];
  abort($error, 404);
} else {
  send($groupsFound, 200);
}
?>
