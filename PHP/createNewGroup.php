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
$lastGroup = end($data["groups"]);
$lastGroupId = $lastGroup["groupId"];
$maxGroupNameLength = 15;

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if(
  !isset(
    $requestData["groupName"],
    $requestData["groupMembers"]
  ) || (
    $requestData["groupName"] === "" ||
    $requestData["groupMembers"] === ""
  )
) {
  $error = ["message" => "Group name and group member list cannot be empty"];
  abort($error, 400);
} else {
  $groupName = $requestData["groupName"];

  if (strlen($groupName) > $maxGroupNameLength) {
    $error = ["message" => "Group name can only contain 15 characters."];
    abort($error, 400);
  }

  $groupName = substr($groupName, 0, $maxGroupNameLength);

  $groupMembers = $requestData["groupMembers"];

  $newGroup = array (
    "groupId" => $lastGroupId + 1,
    "groupName" => $groupName,
    "members" => [],
    "users" => [],
  );

  $userToSend = null;
  $userIsFound = false;

  foreach($groupMembers as $groupMember) {
    $userIsFound = false;
    foreach($users as $user) {
      if ($groupMember === $user["username"]) {
        $userIsFound = true;

        $newUser = array (
          "name" => "$groupMember",
          "userId" => $user["userId"],
          "games" => array(
            "emmys" => array(),
            "grammys" => array(),
            "oscars" => array(),
          ),
        );

        $newUser["games"]["emmys"] = new stdClass();
        $newUser["games"]["grammys"] = new stdClass();
        $newUser["games"]["oscars"] = new stdClass();

        $newGroup["users"][] = $newUser;

        array_push($newGroup["members"], $user["userId"]);

        $user["groups"][] = $newGroup["groupId"];

        foreach ($data["users"] as &$userData) {
          if ($userData["userId"] === $user["userId"]) {
            $userData = $user;
              break;
            }
        }
      }
    }
  }

  $data["groups"][] = $newGroup;
  $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents($filename, $newJsonString);

  send($newJsonString, 200);
}
?>
