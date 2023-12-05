<?php
ini_set("display_errors", 1);

require_once "helper.php";
require_once "removeUserFromGroup.php";

allowCORS();
allowMethod("DELETE");
allowJSON();

$filename = "../database/data.json";

$json = file_get_contents($filename);
$data = json_decode($json, true);
$users = $data["users"];
$groups = $data["groups"];

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

$userId = $requestData["userId"];
$userGroupId = $requestData["userGroupId"];

$foundUserGroup = null;
$userIndex = -1;

if (isset($userId) && isset($userGroupId)) {
  foreach ($users as $user) {
    $userIndex++;

    if ($user["userId"] === $userId) {
      $userGroupArray = $user["groups"];

      foreach ($userGroupArray as $userGroup) {
        if ($userGroup === $userGroupId) {
          $foundUserGroup = $userGroup;
          $foundGroupIndex = array_search($foundUserGroup, $userGroupArray);

          unset($userGroupArray[$foundGroupIndex]);

          $newUserGroupArray = array_values($userGroupArray);

          $user["groups"] = $newUserGroupArray;

          $data["users"][$userIndex]["groups"] = $newUserGroupArray;
          file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));

          removeUserFromGroup($userId);

          $message = ["message" => "You have successfully left the group."];
          send($message, 200);
        }
      }
    }
  }
}
?>
