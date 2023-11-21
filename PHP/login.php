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

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if(
  !isset(
    $requestData["email"],
    $requestData["password"]
  ) || (
    $requestData["email"] === "" ||
    $requestData["password"] === ""
  )
) {
  $error = ["message" => "Input box(es) cannot be empty"];
  abort(400, $error);
} else {
  $email = $requestData["email"];
  $password = $requestData["password"];

  $userToSend = null;
  $userIsFound = false;

  foreach($users as $user) {
    if (
      $user["email"] === $email &&
      $user["password"] === $password
    ) {
      unset($user["password"]);
      $userIsFound = true;
      $userToSend = $user;
      break;
    }
  }

  if ($userIsFound) {
    send(200, $userToSend);
  } else {
    $error = ["message" => "Invalid user or password"];
    abort(404, $error);
  }
}
?>
