<?php
ini_set("display_errors", 1);

require_once "helper.php";

allowCORS();
allowJSON();

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod === "POST"){
    saveUserChoices();
} 

function saveUserChoices() {
    $filename = "../database/data.json";
    $json = file_get_contents($filename);
    $data = json_decode($json, true);
    $users = $data["users"];
    $groups = $data["groups"];

    $requestJSON = file_get_contents("php://input");
    $userChoicesArray = json_decode($requestJSON, true);
    $arrayLength = count($userChoicesArray);
    $userId = $userChoicesArray[$arrayLength-1]["userId"];

    $userGroupArray = [];
    if(isset($userId)) {
        foreach($users as $user) {
      
          if ($user["userId"] == $userId) {
            $userGroupArray = $user["groups"];
          }
        }
    }

    for($i = 0; $i < count($userGroupArray); $i++) {
        foreach($groups as $index => $group) {
            if($group["groupId"] == $userGroupArray[$i]) {
                $usersInGroup = $group["users"];
                foreach($usersInGroup as $userIndex => $userInGroup) {
                    if($userInGroup["userId"] == $userId) {
                        $arrayLength = count($userChoicesArray);
                        $currentAward = strtolower($userChoicesArray[$arrayLength-1]["currentAward"]);
                    
                        $games = $userInGroup["games"];
                    
                        foreach($games as $gameName => $gameData) {
                            if($gameName == $currentAward) {
                                $userArrayIndex = 0;
                                while($userArrayIndex < count($userChoicesArray)-1) {
                    
                                    $valueToSave = $userChoicesArray[$userArrayIndex]["categoryChoice"];
                                    $nameToCategory = $userChoicesArray[$userArrayIndex]["category"];
                                    $keyName = str_replace(" ", "", $nameToCategory);

                                    $singleObjectInArray = $userChoicesArray[$userArrayIndex];
                                    if(array_key_exists("nomineeContext", $singleObjectInArray)) {
                                        $nomineeContext = $userChoicesArray[$userArrayIndex]["nomineeContext"];
                                        $data["groups"][$index]["users"][$userIndex]["games"][$gameName][$keyName] = array(
                                            "guess" => $valueToSave,
                                            "context" => $nomineeContext,
                                            "pointsReceived" => 0,
                                            "winner" => []
                                        );
                                    } else {
                                        $data["groups"][$index]["users"][$userIndex]["games"][$gameName][$keyName] = array(
                                            "guess" => $valueToSave,
                                            "pointsReceived" => 0,
                                            "winner" => []
                                        );
                                    }
                    
                                    /*if($nomineeContext !== undefined) {
                                        $games[$gameName][$keyName]["context"] = $nomineeContext;
                                    }*/
                                    $userArrayIndex++;
                                }
                                $data["groups"][$index]["users"][$userIndex]["games"][$gameName]["userTotalPointsForGame"] = 0;
                            }
                    
                            $data["groups"][$index]["users"][$userIndex]["games"]["userTotalPointsForGroup"] = 0;
                        }
                        
                        // $data["groups"][$group]["users"][$user]["games"]
                        $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
                        file_put_contents($filename, $newJsonString);
                        $message = ["message" => "Saving betting choices was successful"];
                        send($message);
                        //changeUserBettings($group, $userInGroup, $userChoicesArray);
                    }
                }
            }
        }
    }
    
}

function changeUserBettings($group, $user, $userChoicesArray) {
    $arrayLength = count($userChoicesArray);
    $currentAward = strtolower($userChoicesArray[$arrayLength-1]["currentAward"]);

    $games = $user["games"];

    foreach($games as $gameName => $gameData) {
        if($gameName == $currentAward) {
            $userArrayIndex = 0;
            while($userArrayIndex < count($userChoicesArray)-1) {

                $valueToSave = $userChoicesArray[$userArrayIndex]["categoryChoice"];
                $nomineeContext = $userChoicesArray[$userArrayIndex]["nomineeContext"];
                $nameToCategory = $userChoicesArray[$userArrayIndex]["category"];
                $keyName = str_replace(" ", "", $nameToCategory);

                $games[$gameName][$keyName] = array(
                    "guess" => $valueToSave,
                    "pointsReceived" => array(),
                    "winner" => []
                );

                if($nomineeContext !== null) {
                    $games[$gameName][$keyName]["context"] = $nomineeContext;
                }
                $userArrayIndex++;
            }
        }

        $group["users"][$user]["games"][$gameName] = $gameData;
    }
    
    // $data["groups"][$group]["users"][$user]["games"]
    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $newJsonString);
    send($data);

}

?>