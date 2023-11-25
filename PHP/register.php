<?php
$databasePath = "../database'";
$jsonFile = "../database/data.json";
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);
$inputData = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER["REQUEST_METHOD"];

if($method==="POST"){
    if (
        !isset(
            $inputData["username"],
            $inputData["email"],
            $inputData["password"]
        ) || (
            $inputData["username"] === "" ||
            $inputData["email"] === "" ||
            $inputData["password"] === ""
        )
    ) {
        http_response_code(400);
        echo json_encode(['error' => "Input box(es) cannot be empty"]);
        exit;
    } elseif (isDuplicateUser($inputData['username'], $inputData['email'], $data['users'])) {
        http_response_code(400);
        echo json_encode(['error' => "Username or email already exists"]);
        exit;
    }
    
    $lastUser = end($data['users']);
    $nextUserId = ($lastUser) ? ($lastUser['userId'] + 1) : 1;
    
    $newUser = [
        'userId' => $nextUserId,
        'username' => $inputData['username'],
        'email' => $inputData['email'],
        'password' => $inputData['password'],
        'profilePicture' => "../images/profilePictures/standardPP.jpg",
        'pointsInAllGroups' => 0,
        'groups' => []
    ];
    
    $data['users'][] = $newUser;
    file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
    
    http_response_code(200);
    echo json_encode(['message' => 'Registration successful', 'user' => $newUser]);
    
    function isDuplicateUser($username, $email, $users)
    {
        foreach ($users as $user) {
            if ($user['username'] === $username || $user['email'] === $email) {
                return true;
                break;
            }
        }
        return false;
    }
}

?>
