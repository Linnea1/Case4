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
      // file_put_contents("./dump.txt", json_encode($userGroups));
      foreach($userGroups as $userGroup) {
        foreach($groups as $group) {
          // file_put_contents("./dump.txt", json_encode($group["groupId"]));
          if ($userGroup === $group["groupId"]) {
            file_put_contents("./dump.txt", "works");
            array_push($groupsFound, $group);

          }
        }
      }
      send(200, $groupsFound);
    }
  }

  $error = ["error" => "User is not found"];
  abort(404, $error);
} else {
  send(200, $groupsFound);
}
?>
