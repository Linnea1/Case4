<?php
ini_set("display_errors", 1);

require_once "helper.php";

allowCORS();

$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
    allowJSON();
    saveUserChoices();
} else if($requestMethod == "GET" && isset($_GET["award"])) {
    checkIfUserHasBetted();
} else {
    createArrayWithAllUserData();
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

    if(isset($userId)) {
        foreach($users as $userArrayUserIndex => $userData) {
      
          if ($userData["userId"] == $userId) {
            $data["users"][$userArrayUserIndex]["pointsInAllGroups"] = 0;
          }
        }
    }

    for($i = 0; $i < count($userGroupArray); $i++) {
        foreach($groups as $index => $group) {
            if($group["groupId"] == $userGroupArray[$i]) {
                $usersInGroup = $group["users"];
                foreach($usersInGroup as $userIndex => $userInGroup) {
                    if($userInGroup["userId"] == $userId) {
                        $currentAward = strtolower($userChoicesArray[$arrayLength-1]["currentAward"]);
                    
                        $games = $userInGroup["games"];
                    
                        $data["groups"][$index]["users"][$userIndex]["games"]["userTotalPointsForGroup"] = 0;

                        foreach($games as $gameName => $gameData) {
                            if($gameName == $currentAward) {
                                $data["groups"][$index]["users"][$userIndex]["games"][$gameName]["userTotalPointsForGame"] = 0;

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
                    
                                    $winnerForCategory = $userChoicesArray[$userArrayIndex]["winner"];
                                    if($valueToSave == $winnerForCategory) {
                                        $data["groups"][$index]["users"][$userIndex]["games"][$gameName][$keyName]["pointsReceived"] = 1;
                                        //$data["groups"][$index]["users"][$userIndex]["games"][$gameName][$keyName]["winner"] 
                                        $data["groups"][$index]["users"][$userIndex]["games"][$gameName]["userTotalPointsForGame"] += 1;

                                    } else {
                                        $data["groups"][$index]["users"][$userIndex]["games"][$gameName][$keyName]["pointsReceived"] = 0;

                                    }

                                    $userArrayIndex++;
                                }
                            }

                            if(isset($data["groups"][$index]["users"][$userIndex]["games"][$gameName]["userTotalPointsForGame"])) {
                                $pointsToAdd = $data["groups"][$index]["users"][$userIndex]["games"][$gameName]["userTotalPointsForGame"];
                                $data["groups"][$index]["users"][$userIndex]["games"]["userTotalPointsForGroup"] += $pointsToAdd;
                            }

                        }

                        if(isset( $data["groups"][$index]["users"][$userIndex]["games"]["userTotalPointsForGroup"])) {
                            $userPointsInOneGroup =  $data["groups"][$index]["users"][$userIndex]["games"]["userTotalPointsForGroup"];
                            if(isset($userId)) {
                                foreach($users as $userArrayUserIndex => $userData) {
                              
                                  if ($userData["userId"] == $userId) {
                                    $data["users"][$userArrayUserIndex]["pointsInAllGroups"] += $userPointsInOneGroup;
                                  }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
     $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
     file_put_contents($filename, $newJsonString);
     $message = ["message" => "The betting choices were saved successfully"];
     send($message);
    
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

        if(count($userGroupArray) == 0) {
            $warningMessage = [
                                "warning" => "This user does not belong to a group yet, and therefore cannot start betting",
                                "message" => "No bets have been made"
                            ];
            send($warningMessage, 404);
        }

        $userFirstTime = false;
        foreach($groups as $index => $group) {
            if($group["groupId"] == $userGroupArray[0]) {
                //If the user has no bets saved in the first group, i.e. game-object length is 0 or 1,
                //the user has not played before, no matter if the user belongs to other groups.
                $usersInGroup = $group["users"];
                foreach($usersInGroup as $userIndex => $userInGroup) {
                    if($userInGroup["userId"] == $userToFind) {
                        $games = $userInGroup["games"];
                        foreach($games as $gameName => $gameData) {
                            if($gameName == $awardToFind) {
                                if((count($games[$gameName]) == 1) ||  (count($games[$gameName]) == 0)) {
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

function createArrayWithAllUserData() {
    if(isset($_GET["userId"])) {
        $userToFind = $_GET["userId"];

        $filename = "../database/data.json";
        $json = file_get_contents($filename);
        $data = json_decode($json, true);
        $users = $data["users"];
        $groups = $data["groups"];

        //Groups-array for user gets saved in array below
        $userGroupArray = [];
        
        //User bets to send back gets saved in array below
        $arrayOfAwards = [];

        foreach($users as $user) {
            if ($user["userId"] == $userToFind) {
                $userGroupArray = $user["groups"];
                $arrayOfAwards["userPointsInAllGroups"] = $user["pointsInAllGroups"];
            }
        }

        if(count($userGroupArray) == 0) {
            $warningMessage = [
                                "warning" => "This user does not belong to a group yet, and therefore cannot start betting",
                                "message" => "No bets have been made"
                            ];
            send($warningMessage, 404);
        }

        foreach($groups as $index => $group) {
            if($group["groupId"] == $userGroupArray[0]) {
                //If the user has no bets saved in the first group, i.e. game-object length is 0 or 1,
                //the user has not played before, no matter if the user belongs to other groups.
                $usersInGroup = $group["users"];
                foreach($usersInGroup as $userIndex => $userInGroup) {
                    if($userInGroup["userId"] == $userToFind) {
                        $games = $userInGroup["games"];

                        $arrayOfAwards["userTotalPointsForGroup"] = $userInGroup["games"]["userTotalPointsForGroup"];

                        foreach($games as $gameName => $gameData) {
                            $gameData = (array) $gameData;
                            if(count($gameData) == 0) {
                                $arrayOfAwards[$gameName] = [];
                                continue;
                            }
                                $award = (array) $games[$gameName];
                                foreach($award as $awardCategory => $value) {
                                    $value = (array) $value;
                                    if(count($value) == 1) {
                                        if(isset($games[$gameName]["userTotalPointsForGame"])) {
                                            $arrayOfAwards[$gameName]["userTotalPointsForGame"] = $games[$gameName]["userTotalPointsForGame"];
            
                                        }
                                        continue;
                                    }

                                    $contextKeyExists = false;
                                    $array = (array) $value;
                                    foreach($array as $categoryIndex => $categoryValue) {
                                        if($categoryIndex == "context") {
                                            $contextKeyExists = true;
                                        }  
                                    }
                                    
                                    if(isset($array["guess"]) && isset($array["categoryName"]) && isset($array["pointsReceived"]) && isset($array["winner"])) {
                                        $string = $array["guess"];
                                        $stringCategory = $array["categoryName"];

                                        if($contextKeyExists) {
                                            $arrayOfAwards[$gameName][] = array(
                                                "categoryName" => $array["categoryName"],
                                                "guess" => $array["guess"],
                                                "context" => $array["context"],
                                                "pointsReceived" => $array["pointsReceived"],
                                                "winner" => $array["winner"]
                                            );

                                        } else {
                                            $arrayOfAwards[$gameName][] = array(
                                                "categoryName" => $stringCategory,
                                                "guess" => $string,
                                                "pointsReceived" => $array["pointsReceived"],
                                                "winner" => $array["winner"]

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


        $arrayOfAwards["userId"] = intval($userToFind);
       
        send($arrayOfAwards);
    
}

?>