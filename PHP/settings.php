<?php
$databasePath = "../database'";
$jsonFile = "../database/data.json";
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);
$requestJSON = file_get_contents("php://input");
$inputData = json_decode($requestJSON, true);

$method = $_SERVER['REQUEST_METHOD'];
$userID = $inputData["id"];

if (isset($inputData["newUsername"])) {
    isEmpty($inputData["newUsername"]);
    $newUsername = $inputData["newUsername"];
    if(isDuplicate($newUsername,"username", $data['users'])){
        http_response_code(400);
        echo json_encode(['error' => 'Username already exsist']);
        exit;
    }
    if (updateProfile($userID, $newUsername, "username", $data['users'], $jsonFile, $data)) {
        file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
        http_response_code(200);
        echo json_encode(['message' => 'Username updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
} elseif(isset($inputData["newEmail"])){
    isEmpty($inputData["newEmail"]);
    $newEmail = $inputData["newEmail"];
    if(isDuplicate($newEmail,"email", $data['users'])){
        http_response_code(400);
        echo json_encode(['error' => 'Username already exsist']);
        exit;
    }
    if (updateProfile($userID, $newEmail, "email", $data['users'], $jsonFile, $data)) {
        file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
        http_response_code(200);
        echo json_encode(['message' => 'Username updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
}elseif(isset($inputData["newPassword"])){
    isEmpty($inputData["newPassword"]);
    $newPassword = $inputData["newPassword"];
    if (updateProfile($userID, $newPassword, "password", $data['users'], $jsonFile, $data)) {
        file_put_contents("../dump2.txt", json_encode($newPassword));
        file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
        http_response_code(200);
        echo json_encode(['message' => 'Password updated successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
}else {
    http_response_code(400);
    echo json_encode(['error' => 'newUsername is missing or empty']);
}

function updateProfile($userID, $newValue, $key, &$users, $jsonFile, &$data)
{
    foreach ($users as &$user) {
      
        if ($user['userId'] == $userID) {
            $user[$key] = $newValue;
            $data["users"]=$users;
            
            
            return true;
        }
    }
    return false;
}

function isDuplicate($newValue, $key, $users)
{
    foreach ($users as &$user) {
        if ($user[$key] == $newValue) {
            return true;
        }
    }
    return false;
}

function isEmpty($value){
    if($value==""){
        http_response_code(400);
        echo json_encode(["error" => "Input boxes cannot be empty"]);
        exit;
    }else{
        return false;
    }
}
?>