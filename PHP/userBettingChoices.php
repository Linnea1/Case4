<?php
ini_set("display_errors", 1);

require_once "helper.php";

allowCORS();

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
    allowJSON();
    saveUserChoices();
} else if($requestMethod == "GET") {
    checkIfUserHasBetted();
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
                                            "categoryName" => $nameToCategory,
                                            "pointsReceived" => 0,
                                            "winner" => []
                                        );
                                    } else {
                                        $data["groups"][$index]["users"][$userIndex]["games"][$gameName][$keyName] = array(
                                            "guess" => $valueToSave,
                                            "categoryName" => $nameToCategory,
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
                        
                    }
                }
            }
        }
    }
     // $data["groups"][$group]["users"][$user]["games"]
     $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
     file_put_contents($filename, $newJsonString);
     $message = ["message" => "Saving betting choices were successful"];
     send($message);
     //changeUserBettings($group, $userInGroup, $userChoicesArray);
    
}

function checkIfUserHasBetted() {
    if(isset($_GET["award"]) && isset($_GET["userId"])) {
        $awardToFind = $_GET["award"];
        $userToFind = $_GET["userId"];

        $filename = "../database/data.json";
        $json = file_get_contents($filename);
        $data = json_decode($json, true);
        $users = $data["users"];
        $groups = $data["groups"];

        $userGroupArray = [];
        foreach($users as $user) {
            if ($user["userId"] == $userToFind) {
                $userGroupArray = $user["groups"];
            }
        }

        $userFirstTime = false;
        foreach($groups as $index => $group) {
            if($group["groupId"] == $userGroupArray[0]) {
                $usersInGroup = $group["users"];
                foreach($usersInGroup as $userIndex => $userInGroup) {
                    if($userInGroup["userId"] == $userToFind) {
                    
                        $games = $userInGroup["games"];
                    
                        foreach($games as $gameName => $gameData) {
                            if($gameName == $awardToFind) {
                                if(count($games[$gameName]) == 0) {
                                    $userFirstTime = true;
                                } else {
                                    $arrayToSendBack = [];
                                    foreach($games[$gameName] as $awardCategory => $value) {
                                    
                                        $contextKeyExists = false;
                                        $array = (array) $value;
                                        foreach($array as $categoryIndex => $categoryValue) {
                                            if($categoryIndex == "context") {
                                                $contextKeyExists = true;
                                            }
                                            
                                        }
                                        
                                        if(isset($array["guess"]) && isset($array["categoryName"])) {
                                            $string = $array["guess"];
                                            $stringCategory = $array["categoryName"];
                                        }
                                        
                                        if($contextKeyExists) {
                                            $arrayToSendBack[] = array(
                                                "category" => $array["categoryName"],
                                                "categoryChoice" => $array["guess"],
                                                "nomineeContext" => $array["context"]
                                                
                                            );
                                        } else {
                                            $arrayToSendBack[] = array(
                                                "category" => $stringCategory,
                                                "categoryChoice" => $string
                                            );
                                        }  
                                    }
                                }
                            }
                    
                        }
                        
                    }
                }
            }
        }

        if($userFirstTime) {
            $message = ["message" => "No bets have been made"];
            send($message);
        }

        $arrayToSendBack[] = array(
            "currentAward" => ucfirst($awardToFind),
            "userId" => intval($userToFind)
        );
       
        send($arrayToSendBack);
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