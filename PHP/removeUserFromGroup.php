<?php
function removeUserFromGroup($userId) {
  ini_set("display_errors", 1);

  require_once "helper.php";
  require_once "removeGroupFromUser.php";

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

  $foundGroup = null;
  $foundGroupIndex = -1;
  $foundMember = null;
  $foundMemberIndex = -1;
  $foundUser = null;
  $foundUserIndex = -1;

  foreach ($groups as $group) {
    $foundGroupIndex++;

    if ($group["groupId"] === $userGroupId) {
      $foundGroup = $groups[$foundGroupIndex];
      $membersArray = $foundGroup["members"];
      $usersArray = $foundGroup["users"];

      foreach ($membersArray as $member) {
        $foundMemberIndex++;
        if ($member === $userId){
          $foundMember = $member;
          unset($membersArray[$foundMemberIndex]);
          $newMembersArray = array_values($membersArray);
          $group["members"] = $newMembersArray;
          $data["groups"][$foundGroupIndex]["members"] = $newMembersArray;
          file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
        }
      }

      foreach ($usersArray as $user) {
        $foundUserIndex++;
        if ($user["userId"] === $userId) {
          $foundUser = $user;
          unset($usersArray[$foundUserIndex]);
          $newUsersArray = array_values($usersArray);
          $group["users"] = $newUsersArray;
          $data["groups"][$foundGroupIndex]["users"] = $newUsersArray;
          file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
        }
      }
    }
  }
}
?>
