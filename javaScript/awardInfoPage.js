"use strict";

async function renderAwardInfoPage(event) {
    //if event currentTarget is one thing, send to API
    //otherwise, get from API and display
    //based on award, search json array, if award object is empty, user hasn't made bet yet,
    //-> render starting betting page?
    //if award object is not empty, have the server send back array and run last part of 
    //this function

    //let response = await fetch(`../PHP/groupInfo.php?userId=${userId}`);
    

    if((event !== undefined) && (event.currentTarget.classList[0] === "award-item")) {
        let award = event.currentTarget.classList[1];
        console.log(award);
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = JSON.stringify(user.userId);
    
        let response = await fetch(`../PHP/userBettingChoices.php?award=${award}&userId=${userId}`);
        let resource = await response.json();

     

        if(resource.message !== undefined) {
            let awardFirstLetterUppercase = award.charAt(0).toUpperCase() + award.slice(1);

            let dateOfAward;
            
            for(let i = 0; i < awards.length; i++) {
                if(awards[i].award === awardFirstLetterUppercase) {
                    dateOfAward = awards[i].date;
                   
                }
            }
            
            main.innerHTML = `
            <div id="awardInfoContainerAIPage">
                <div id="awardImageContainerAIPage">
                    <div id="awardNameAndDate">
                        <h1>${awardFirstLetterUppercase}</h1>
                        <p>${dateOfAward}</p>
                    </div>
                </div>
              
                <h2>Välj nominering</h2>
                <div id="awardCategoriesContainer">
                </div>
                <div id="startBettingAwardBettingPage">Tippa</div>
            </div>
            `;
        
            for(let i = 0; i < awards.length; i++) {
                if(awards[i].award === awardFirstLetterUppercase) {
                    let categoriesArray = awards[i].categories;
                    for(let ii = 0; ii < categoriesArray.length; ii++) {
                        let categoryContainer = document.createElement("div");
                        categoryContainer.classList.add("categoryAIPage");
                        let categoryName = document.createElement("h3");
                        categoryName.classList.add("categoryNameAIPage");
                        categoryName.textContent = categoriesArray[ii].category;
                        let bettingChoice = document.createElement("div");
                        bettingChoice.classList.add("bettingChoiceAIPage");
                        bettingChoice.textContent = "No bet";
                        categoryContainer.appendChild(categoryName);
                        categoryContainer.appendChild(bettingChoice);
                        document.querySelector("div#awardCategoriesContainer").appendChild(categoryContainer);
                    }
                }
            }

                
            let startBettingButton = document.querySelector("div#startBettingAwardBettingPage");
            startBettingButton.addEventListener("click", renderBettingPage);
        } else {
            let array = resource;
            award = array[array.length-1].currentAward;
            for(let i = 0; i < awards.length; i++) {
                if(awards[i].award === award) {
                    let dateOfAward = awards[i].date;
                    array[array.length-1]["date"] = dateOfAward;
                    console.log(array);
                }
            }

            let userAwardArray = array;
            main.innerHTML = `
            <div id="awardInfoContainerAIPage">
                <div id="awardImageContainerAIPage">
                    <div id="awardNameAndDate">
                        <h1>${userAwardArray[userAwardArray.length-1].currentAward}</h1>
                        <p>${userAwardArray[userAwardArray.length-1].date}</p>
                    </div>
                </div>

                <h2>Categories</h2>
                <div id="awardCategoriesContainer"></div>
                <div id="startBettingAwardBettingPage">Change bets</div>
            </div>
            `;

            let awardCategoriesContainer = document.querySelector("div#awardCategoriesContainer");
            for(let i = 0; i < userAwardArray.length - 1; i++) {
                let categoryContainer = document.createElement("div");
                categoryContainer.classList.add("categoryAIPage");
                let categoryName = document.createElement("h3");
                categoryName.classList.add("categoryNameAIPage");
                let userBettingChoice = document.createElement("div");
                userBettingChoice.classList.add("bettingChoiceAIPage");
                categoryContainer.appendChild(categoryName);
                categoryContainer.appendChild(userBettingChoice);

                awardCategoriesContainer.appendChild(categoryContainer);
                categoryName.textContent = `${userAwardArray[i].category}`;
                userBettingChoice.textContent = `${userAwardArray[i].categoryChoice}`;
            }

            document.querySelector("div#startBettingAwardBettingPage").addEventListener("click", renderBettingPage);
        }
    }

}

function renderBettingPage(event) {

    //Need to try and get saved array, if there is one
    //Check if textContent of currentTarget is Start betting or Change bets
    let userAwardArray = [];
    let awardCategories = document.querySelectorAll("div.categoryAIPage");
    let firstCategoryOfCurrentAward = awardCategories[0].firstElementChild.textContent;

    let currentAward;
    let dateOfAward;
    let i = 0;
    while(i < awards.length) {
        if(firstCategoryOfCurrentAward === awards[i]["categories"][0].category) {
            currentAward = awards[i]["award"];
            dateOfAward = awards[i]["date"];
            //Find right award
        }

        i++
    }

    main.innerHTML =  `
    <div id="bettingPageContainer">
        <h1></h1>
        <div id="bettingsContainerBettingPage"></div>
        <div id="changeCategoryContainerBettingPage">
        <div id="continueButtonBettingPage">Next</div> 
        </div>
    </div>
    `;

    let categoryNameHeading = document.querySelector("div#bettingPageContainer > h1");
    categoryNameHeading.textContent = firstCategoryOfCurrentAward;

    let nomineesArray;
    let categoriesArray;
    for(let i = 0; i < awards.length; i++) {
        if(awards[i].award === currentAward) {
            categoriesArray = awards[i].categories;
            for(let ii = 0; ii < awards[i].categories.length; ii++) {
                if(awards[i].categories[ii].category === firstCategoryOfCurrentAward) {
                    nomineesArray = awards[i].categories[ii].nominees;
                    //Find array with nominees for the first category, for the right award
                    //The elements of the nominees array are made of objects
                }
            }
        }
    }

    let bettingsContainer = document.querySelector("div#bettingsContainerBettingPage");

    if(firstCategoryOfCurrentAward === "Best Picture") {
        for(let i = 0; i < nomineesArray.length; i++) {
            let bettingChoiceContainer = document.createElement("div");
            bettingChoiceContainer.classList.add("bettingChoiceContainer");
            bettingChoiceContainer.innerHTML = `
            <div class="nomineeAlternativeBettingPage">${nomineesArray[i].film}</div>
            `;
            bettingsContainer.appendChild(bettingChoiceContainer);
        }
    } else if(firstCategoryOfCurrentAward === "Record of the Year") {
        for(let i = 0; i < nomineesArray.length; i++) {
            let bettingChoiceContainer = document.createElement("div");
            bettingChoiceContainer.classList.add("bettingChoiceContainer");
            bettingChoiceContainer.innerHTML = `
            <div class="nomineeAlternativeBettingPage">${nomineesArray[i].name}</div>
            <div>${nomineesArray[i].song}</div>
            `;
            bettingsContainer.appendChild(bettingChoiceContainer);
        }
    } else if(firstCategoryOfCurrentAward === "Outstanding Drama Series") {
        for(let i = 0; i < nomineesArray.length; i++) {
            let bettingChoiceContainer = document.createElement("div");
            bettingChoiceContainer.classList.add("bettingChoiceContainer");
            bettingChoiceContainer.innerHTML = `
            <div class="nomineeAlternativeBettingPage">${nomineesArray[i].name}</div>
            `;
            bettingsContainer.appendChild(bettingChoiceContainer);
        }
    }

    let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
    for(let i = 0; i < usersPossibleChoices.length; i++) {
        usersPossibleChoices[i].addEventListener("click", displayUserChoice);
    }

    let continueButton = document.querySelector("div#continueButtonBettingPage");
    continueButton.style.pointerEvents = "none";
    continueButton.style.backgroundColor = "#343434";
    continueButton.addEventListener("click", continueBetting);

    function displayUserChoice(event) {
        usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
        continueButton = document.querySelector("div#continueButtonBettingPage");

        if(this.style.backgroundColor !== "darkgrey") {
            
            this.style.backgroundColor = "darkgrey";
            continueButton.style.pointerEvents = "auto";
            continueButton.style.backgroundColor = "darkgrey";
        } else if(this.style.backgroundColor === "darkgrey") {

            this.style.backgroundColor = "black";
            continueButton.style.pointerEvents = "none";
            continueButton.style.backgroundColor = "#343434";
        }

        for(let i = 0; i < usersPossibleChoices.length; i++) {
           if(usersPossibleChoices[i] === this) {
            continue;
           }

            if(usersPossibleChoices[i].style.backgroundColor === "darkgrey") {
                usersPossibleChoices[i].style.backgroundColor = "black";
            } 
        }
    }

    let categoryIndex = 0;
    function continueBetting(event) {
       
        continueButton.style.pointerEvents = "none";
        continueButton.style.backgroundColor = "#343434";

        if(!document.querySelector("div#previousCategoryBettingPage")) {
            let previousCategory = document.createElement("div");
            document.querySelector("div#changeCategoryContainerBettingPage").prepend(previousCategory);
            previousCategory.setAttribute("id", "previousCategoryBettingPage");
            previousCategory.textContent = "Previous";
            previousCategory.addEventListener("click", renderPreviousCategory);
        }
        
        categoryIndex++;
        
        if(userAwardArray.length === categoryIndex-1) {
            let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
            for(let i = 0; i < usersPossibleChoices.length; i++) {
                if(usersPossibleChoices[i].style.backgroundColor === "darkgrey") {
                    let awardObject = {};

                    let bettingChoice = usersPossibleChoices[i].children[0].textContent;
                    if(usersPossibleChoices[i].children[1]) {
                        let nomineeFromWhere = usersPossibleChoices[i].children[1].textContent;
                        awardObject.nomineeContext = nomineeFromWhere;

                    }
                    awardObject.category = categoryNameHeading.textContent;
                    awardObject.categoryChoice = bettingChoice;
                    userAwardArray.push(awardObject);
                }
            }
        } else {
            for(let i = 0; i < userAwardArray.length; i++) {
                if(i === categoryIndex-1) {
                    for(let ii = 0; ii < usersPossibleChoices.length; ii++) {
                        if(usersPossibleChoices[ii].style.backgroundColor === "darkgrey") {
                            let awardObject = {};

                            let bettingChoice = usersPossibleChoices[ii].children[0].textContent;
                            if(usersPossibleChoices[ii].children[1]) {
                                let nomineeFromWhere = usersPossibleChoices[ii].children[1].textContent;
                                awardObject.nomineeContext = nomineeFromWhere;

                            }
                            awardObject.category = categoryNameHeading.textContent;
                            awardObject.categoryChoice = bettingChoice;
                            userAwardArray[i] = awardObject;
                        }
                    }
                }
            }
        }

        let userHasBeenHere = false;
        if(userAwardArray.length > categoryIndex ) {
            userHasBeenHere = true;
        }
        
        //1. Save in the same index again, in case user changed betting choice
        //2. Have a boolean variable that checks whether user is landing on a betting page
        //where they have already clicked on a choice before, in which case display choice

        //Everytime the continue button is pressed, increment variable to show next 
        //category nominees
        let nextObjectToShow;

        //Is the lastCategory variable ever used?
        let lastCategory;
     
        for(let i = 0; i < categoriesArray.length; i++) {
            if(i === categoryIndex) {
                nextObjectToShow = categoriesArray[i];
            }

            if(categoryIndex === categoriesArray.length-1) {
                lastCategory = categoriesArray[i];
                continueButton.textContent = "Submit";
                continueButton.removeEventListener("click", continueBetting);
                continueButton.addEventListener("click", showDoneAwardInfoPage);
            } 
        }
        console.log(nextObjectToShow);
        
        categoryNameHeading.textContent = nextObjectToShow.category;

        if(firstCategoryOfCurrentAward === "Best Picture") {
            bettingsContainer.innerHTML = "";
            for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                let bettingChoiceContainer = document.createElement("div");
                bettingChoiceContainer.classList.add("bettingChoiceContainer");
                bettingChoiceContainer.innerHTML = `
                <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                <div>${nextObjectToShow.nominees[i].film}</div>
                `;
                bettingsContainer.appendChild(bettingChoiceContainer);
                bettingChoiceContainer.addEventListener("click", displayUserChoice);
            }

        } else if(firstCategoryOfCurrentAward === "Record of the Year") {
            bettingsContainer.innerHTML = "";
            for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                let rightKey;
                if(nextObjectToShow.nominees[i].song !== undefined) {
                    rightKey = "song";
                } else if(nextObjectToShow.nominees[i].album !== undefined) {
                    rightKey = "album";
                } else {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                    if(nextObjectToShow.nominees[i] === nextObjectToShow.nominees.length-1) {
                        break;
                    } else {
                        continue;
                    }
                }

                let rightValue = nextObjectToShow.nominees[i][rightKey];
                let bettingChoiceContainer = document.createElement("div");
                bettingChoiceContainer.classList.add("bettingChoiceContainer");
                bettingChoiceContainer.innerHTML = `
                <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                <div>${rightValue}</div>
                `;
                bettingsContainer.appendChild(bettingChoiceContainer);
                bettingChoiceContainer.addEventListener("click", displayUserChoice);
                
            }
        } else if(firstCategoryOfCurrentAward === "Outstanding Drama Series") {
            bettingsContainer.innerHTML = "";
            for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                let rightKey;
                if(nextObjectToShow.nominees[i].series !== undefined) {
                    rightKey = "series";
                } else {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                    if(nextObjectToShow.nominees[i] === nextObjectToShow.nominees.length-1) {
                        break;
                    } else {
                        continue;
                    }
                }

                let rightValue = nextObjectToShow.nominees[i][rightKey];
                let bettingChoiceContainer = document.createElement("div");
                bettingChoiceContainer.classList.add("bettingChoiceContainer");
                bettingChoiceContainer.innerHTML = `
                <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                <div>${rightValue}</div>
                `;
                bettingsContainer.appendChild(bettingChoiceContainer);
                bettingChoiceContainer.addEventListener("click", displayUserChoice);
            }
        }

        if(userHasBeenHere) {
            for(let i = 0; i < userAwardArray.length; i++) {
                if(i === categoryIndex) {
                    let choiceToHighlight = userAwardArray[i].categoryChoice;
                    usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
                    let nomineeAlternatives = document.querySelectorAll(".nomineeAlternativeBettingPage");

                    for(let i = 0; i < nomineeAlternatives.length; i++) {
                        if(nomineeAlternatives[i].textContent === choiceToHighlight) {
                            usersPossibleChoices[i].style.backgroundColor = "darkgrey";
                            continueButton.style.pointerEvents = "auto";
                            continueButton.style.backgroundColor = "darkgrey";
                        }
                    }
                }
            }
        
        }
      
    }

    function renderPreviousCategory(event) {
        
        //Below it is checked if the previous betting page was the last one
        if(categoryIndex === categoriesArray.length-1) {
            continueButton.textContent = "Next";
            continueButton.removeEventListener("click", showDoneAwardInfoPage);
            continueButton.addEventListener("click", continueBetting);
        }
        categoryIndex--;

        let previousChoice;
        for(let i = 0; i < userAwardArray.length; i++) {
            if(i === categoryIndex) {
                previousChoice = userAwardArray[i].categoryChoice;
                console.log(previousChoice);
            }
        }

        let nextObjectToShow;
        let changeCategoryContainer = document.querySelector("#changeCategoryContainerBettingPage");
        for(let i = 0; i < categoriesArray.length; i++) {
            if(i === categoryIndex) {
                nextObjectToShow = categoriesArray[i];
            }
        }

        categoryNameHeading.textContent = nextObjectToShow.category;

        if(categoryIndex === 0) {
            console.log(nextObjectToShow);
            changeCategoryContainer.innerHTML = `
            <div id="continueButtonBettingPage">Next</div> 
            `;
            continueButton = document.querySelector("div#continueButtonBettingPage");
            continueButton.style.backgroundColor = "#343434";
            continueButton.addEventListener("click", continueBetting);

            if(firstCategoryOfCurrentAward === "Best Picture") {
                bettingsContainer.innerHTML = "";

                for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].film}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                }
            } else if(firstCategoryOfCurrentAward === "Record of the Year") {
                bettingsContainer.innerHTML = "";

                for(let i = 0; i < nomineesArray.length; i++) {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nomineesArray[i].name}</div>
                    <div>${nomineesArray[i].song}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                }
            } else if(firstCategoryOfCurrentAward === "Outstanding Drama Series") {
                bettingsContainer.innerHTML = "";

                for(let i = 0; i < nomineesArray.length; i++) {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nomineesArray[i].name}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                }
            }

            usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
            let nomineeAlternatives = document.querySelectorAll(".nomineeAlternativeBettingPage");

            for(let i = 0; i < nomineeAlternatives.length; i++) {
                if(nomineeAlternatives[i].textContent === previousChoice) {
                    usersPossibleChoices[i].style.backgroundColor = "darkgrey";
                    continueButton.style.pointerEvents = "auto";
                    continueButton.style.backgroundColor = "darkgrey";
                }
            }

            return;
        }

        if(firstCategoryOfCurrentAward === "Best Picture") {
            bettingsContainer.innerHTML = "";
            for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                let bettingChoiceContainer = document.createElement("div");
                bettingChoiceContainer.classList.add("bettingChoiceContainer");
                bettingChoiceContainer.innerHTML = `
                <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                <div>${nextObjectToShow.nominees[i].film}</div>
                `;
                bettingsContainer.appendChild(bettingChoiceContainer);
                bettingChoiceContainer.addEventListener("click", displayUserChoice);
            }
        } else if(firstCategoryOfCurrentAward === "Record of the Year") {
            bettingsContainer.innerHTML = "";
            for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                let rightKey;
                if(nextObjectToShow.nominees[i].song !== undefined) {
                    rightKey = "song";
                } else if(nextObjectToShow.nominees[i].album !== undefined) {
                    rightKey = "album";
                } else {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                    if(nextObjectToShow.nominees[i] === nextObjectToShow.nominees.length-1) {
                        break;
                    } else {
                        continue;
                    }
                }

                let rightValue = nextObjectToShow.nominees[i][rightKey];
                console.log(rightValue);
                let bettingChoiceContainer = document.createElement("div");
                bettingChoiceContainer.classList.add("bettingChoiceContainer");
                bettingChoiceContainer.innerHTML = `
                <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                <div>${rightValue}</div>
                `;
                bettingsContainer.appendChild(bettingChoiceContainer);
                bettingChoiceContainer.addEventListener("click", displayUserChoice);
            }
        } else if(firstCategoryOfCurrentAward === "Outstanding Drama Series") {
            bettingsContainer.innerHTML = "";
            for(let i = 0; i < nextObjectToShow.nominees.length; i++) {
                let rightKey;
                if(nextObjectToShow.nominees[i].series !== undefined) {
                    rightKey = "series";
                } else {
                    let bettingChoiceContainer = document.createElement("div");
                    bettingChoiceContainer.classList.add("bettingChoiceContainer");
                    bettingChoiceContainer.innerHTML = `
                    <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                    `;
                    bettingsContainer.appendChild(bettingChoiceContainer);
                    bettingChoiceContainer.addEventListener("click", displayUserChoice);
                    if(nextObjectToShow.nominees[i] === nextObjectToShow.nominees.length-1) {
                        break;
                    } else {
                        continue;
                    }
                }

                let rightValue = nextObjectToShow.nominees[i][rightKey];
                let bettingChoiceContainer = document.createElement("div");
                bettingChoiceContainer.classList.add("bettingChoiceContainer");
                bettingChoiceContainer.innerHTML = `
                <div class="nomineeAlternativeBettingPage">${nextObjectToShow.nominees[i].name}</div>
                <div>${rightValue}</div>
                `;
                bettingsContainer.appendChild(bettingChoiceContainer);
                bettingChoiceContainer.addEventListener("click", displayUserChoice);
            }
        }

        let nomineeAlternatives = document.querySelectorAll(".nomineeAlternativeBettingPage");
       
        usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");

        for(let i = 0; i < nomineeAlternatives.length; i++) {
            if(nomineeAlternatives[i].textContent === previousChoice) {
                usersPossibleChoices[i].style.backgroundColor = "darkgrey";
                continueButton.style.pointerEvents = "auto";
                continueButton.style.backgroundColor = "darkgrey";
            }
        }
    }

    async function showDoneAwardInfoPage(event) {
        //-Make checkmark show on award page with all the awards

        categoryIndex++;

        if(userAwardArray.length === categoryIndex-1) {
            let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
            for(let i = 0; i < usersPossibleChoices.length; i++) {
                if(usersPossibleChoices[i].style.backgroundColor === "darkgrey") {
                    let awardObject = {};

                    let bettingChoice = usersPossibleChoices[i].children[0].textContent;
                    if(usersPossibleChoices[i].children[1]) {
                        let nomineeFromWhere = usersPossibleChoices[i].children[1].textContent;
                        awardObject.nomineeContext = nomineeFromWhere;

                    }
                    awardObject.category = categoryNameHeading.textContent;
                    awardObject.categoryChoice = bettingChoice;
                    userAwardArray.push(awardObject);
                }
            }
        } else {
            for(let i = 0; i < userAwardArray.length; i++) {
                if(i === categoryIndex-1) {
                    for(let ii = 0; ii < usersPossibleChoices.length; ii++) {
                        if(usersPossibleChoices[ii].style.backgroundColor === "darkgrey") {
                            let awardObject = {};

                            let bettingChoice = usersPossibleChoices[ii].children[0].textContent;
                            if(usersPossibleChoices[ii].children[1]) {
                                let nomineeFromWhere = usersPossibleChoices[ii].children[1].textContent;
                                awardObject.nomineeContext = nomineeFromWhere;

                            }
                            awardObject.category = categoryNameHeading.textContent;
                            awardObject.categoryChoice = bettingChoice;
                            userAwardArray[i] = awardObject;
                        }
                    }
                }
            }
        }

        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.userId;

        let lastArrayObject = {
            currentAward: currentAward,
            date: dateOfAward,
            userId: userId
        };

        userAwardArray.push(lastArrayObject);


        //userId måste skickas med, tillsammans med array
        console.log(userAwardArray);
        let postRequestDetails = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userAwardArray)
        };

        let response = await fetch("PHP/userBettingChoices.php", postRequestDetails);
        let resource = await response.json();

        if(!response.ok) {
            console.log(response);

        } else {
            console.log(response);
            console.log(resource);

        }

        main.innerHTML = `
        <div id="awardInfoContainerAIPage">
            <div id="awardImageContainerAIPage">
                <div id="awardNameAndDate">
                    <h1>${userAwardArray[userAwardArray.length-1].currentAward}</h1>
                    <p>${userAwardArray[userAwardArray.length-1].date}</p>
                </div>
            </div>

            <h2>Categories</h2>
            <div id="awardCategoriesContainer"></div>
            <div id="startBettingAwardBettingPage">Change bets</div>
        </div>
        `;

        let awardCategoriesContainer = document.querySelector("div#awardCategoriesContainer");
        for(let i = 0; i < userAwardArray.length - 1; i++) {
            let categoryContainer = document.createElement("div");
            categoryContainer.classList.add("categoryAIPage");
            let categoryName = document.createElement("h3");
            categoryName.classList.add("categoryNameAIPage");
            let userBettingChoice = document.createElement("div");
            userBettingChoice.classList.add("bettingChoiceAIPage");
            categoryContainer.appendChild(categoryName);
            categoryContainer.appendChild(userBettingChoice);

            awardCategoriesContainer.appendChild(categoryContainer);
            categoryName.textContent = `${userAwardArray[i].category}`;
            userBettingChoice.textContent = `${userAwardArray[i].categoryChoice}`;
        }

        document.querySelector("div#startBettingAwardBettingPage").addEventListener("click", renderBettingPage);

  
    }
}
