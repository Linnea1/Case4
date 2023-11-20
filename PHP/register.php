<?php
$databasePath = dirname(__DIR__) . '/database';
$jsonFile = $databasePath . '/data.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);
$inputData = json_decode(file_get_contents('php://input'), true);

if (isDuplicateUser($inputData['username'], $inputData['email'], $data['users'])) {
    echo json_encode(['error' => 'Username or email already exists']);
    exit; // Stop further execution
}

$newUser = [
  'userId' => uniqid(),
  'username' => $inputData['username'],
  'email' => $inputData['email'],
  'password' => $inputData['password'],
  'pointsInAllGroups' => 0,
  'groups' => []
];

$data['users'][] = $newUser;
file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Registration successful']);

function isDuplicateUser($username, $email, $users) {
    foreach ($users as $user) {
      if ($user['username'] === $username || $user['email'] === $email) {
        return true; // Username or email exists
      }
    }
    return false; // Username and email do not exist
}

?>
