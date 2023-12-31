"use strict";

async function renderAwardInfoPage(event) {
    //if event currentTarget is one thing, send to API
    //otherwise, get from API and display
    //based on award, search json array, if award object is empty, user hasn't made bet yet,
    //--> render starting betting page?
    //if award object is not empty, have the server send back an array

    if((event !== undefined) && (event.currentTarget.classList[0] === "award-item")) {
        let award = event.currentTarget.classList[1];
        window.localStorage.setItem("award", `${award}`);

        let user = JSON.parse(localStorage.getItem("user"));
        let userId = JSON.stringify(user.userId);
    
        let response = await fetch(`../PHP/userBettingChoices.php?award=${award}&userId=${userId}`);
        let resource = await response.json();

        let response1 = await fetch(`../PHP/userBettingChoices.php?userId=${userId}`);
        let resource2 = await response1.json();

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
              
                <h2>Place your bets</h2>
                <div id="awardCategoriesContainer">
                </div>
                <div id="startBettingAwardBettingPage">START BETTING</div>
            </div>
            <nav class="sticky-nav">${stickyNav()}</nav>
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

            if(resource.warning !== undefined) {
                startBettingButton.style.pointerEvents = "none";
            } else {
                startBettingButton.style.pointerEvents = "auto";
            }
        } else {

            //Make it so results show for one award in this instruction block

            let array = resource;

            award = array[array.length-1].currentAward;
            for(let i = 0; i < awards.length; i++) {
                if(awards[i].award === award) {
                    let dateOfAward = awards[i].date;
                    array[array.length-1]["date"] = dateOfAward;
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
            <nav class="sticky-nav">${stickyNav()}</nav>
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
    } else {
        let award = window.localStorage.getItem("award");
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
                <div id="startBettingAwardBettingPage">START BETTING</div>
            </div>
            <nav class="sticky-nav">${stickyNav()}</nav>
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
            startBettingButton.style.pointerEvents = "auto";
        } else {
            let array = resource;

            award = array[array.length-1].currentAward;
            for(let i = 0; i < awards.length; i++) {
                if(awards[i].award === award) {
                    let dateOfAward = awards[i].date;
                    array[array.length-1]["date"] = dateOfAward;
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
            <nav class="sticky-nav">${stickyNav()}</nav>

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

    document.querySelector(".fa-trophy").classList.add("current-page");
    document.querySelector(".text-awards").classList.add("current-page");
  
    document.querySelector(".nav-groups").addEventListener("click", () => renderMyGroups(false));
    document.querySelector(".nav-awards").addEventListener("click", () => renderAwardsPage(awards));
    document.querySelector(".nav-profile").addEventListener("click", renderProfilePage);
    document.querySelector(".nav-home").addEventListener("click", renderHomePage);

    
}

function renderBettingPage(event) {

    let userAwardArray = [];
    let awardCategories = document.querySelectorAll("div.categoryAIPage");
    let firstCategoryOfCurrentAward = awardCategories[0].firstElementChild.innerHTML;

    //Find right award
    let currentAward;
    let dateOfAward;
    let i = 0;
    while(i < awards.length) {
        if(firstCategoryOfCurrentAward === awards[i]["categories"][0].category) {
            currentAward = awards[i]["award"];
            dateOfAward = awards[i]["date"];
        }

        i++
    }

    main.innerHTML =  `
    <div id="bettingPageContainer">
        <h1></h1>
        <div id="cancelButton">Cancel</div>
        <div id="bettingsContainerBettingPage"></div>
        <div id="changeCategoryContainerBettingPage">
        <div id="continueButtonBettingPage">Next</div> 
        </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>

    `;

    //Navbar addEventListeners to different part of the app below
    document.querySelector(".fa-trophy").classList.add("current-page");
    document.querySelector(".text-awards").classList.add("current-page");

    document.querySelector(".nav-groups").addEventListener("click", () => renderMyGroups(false));
    document.querySelector(".nav-awards").addEventListener("click", () => renderAwardsPage(awards));
    document.querySelector(".nav-profile").addEventListener("click", renderProfilePage);
    document.querySelector(".nav-home").addEventListener("click", renderHomePage);

    let previousCategory = document.createElement("div");
    document.querySelector("div#changeCategoryContainerBettingPage").prepend(previousCategory);
    previousCategory.setAttribute("id", "previousCategoryBettingPage");
    previousCategory.textContent = "Previous";
    previousCategory.addEventListener("click", renderPreviousCategory);
    
    previousCategory.style.pointerEvents = "none";
    previousCategory.style.backgroundColor = "#181818";
    previousCategory.style.border = "1px solid #484848";

    let categoryNameHeading = document.querySelector("div#bettingPageContainer > h1");
    categoryNameHeading.textContent = firstCategoryOfCurrentAward;

    document.querySelector("div#cancelButton").addEventListener("click", renderAwardInfoPage);

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
    continueButton.style.backgroundColor = "rgb(24, 24, 24)";
    continueButton.style.border = "1px solid #484848";

    continueButton.addEventListener("click", continueBetting);

    function displayUserChoice(event) {
        usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
        continueButton = document.querySelector("div#continueButtonBettingPage");
        if(this.style.backgroundColor !== "rgba(222, 141, 67, 0.3)") {
            
            this.style.backgroundColor = "rgba(222, 141, 67, 0.3)";
            continueButton.style.pointerEvents = "auto";
            continueButton.style.backgroundColor = "#C98649";
            continueButton.style.color = "#000000";
            this.style.borderLeft = "solid 3px #DEDEDE";


        } else if(this.style.backgroundColor === "rgba(222, 141, 67, 0.3)") {

            this.style.backgroundColor = "#181818";
            this.style.borderLeft = "solid 3px #727272";

            continueButton.style.pointerEvents = "none";
            continueButton.style.backgroundColor = "rgb(24, 24, 24)";
            continueButton.style.border = "1px solid #484848";
            continueButton.style.color = "rgb(222, 222, 222)";
        }

        for(let i = 0; i < usersPossibleChoices.length; i++) {
           if(usersPossibleChoices[i] === this) {
            continue;
           }

            if(usersPossibleChoices[i].style.backgroundColor === "rgba(222, 141, 67, 0.3)") {
                usersPossibleChoices[i].style.backgroundColor = "#181818";
                usersPossibleChoices[i].style.borderLeft = "solid 3px #727272";
            } 
        }
    }

    let categoryIndex = 0;
    function continueBetting(event) {
       
        continueButton.style.pointerEvents = "none";
        continueButton.style.backgroundColor = "rgb(24, 24, 24)";
        continueButton.style.border = "1px solid #484848";
        continueButton.style.color = "rgb(222, 222, 222)";

        /*if(!document.querySelector("div#previousCategoryBettingPage")) {
            let previousCategory = document.createElement("div");
            document.querySelector("div#changeCategoryContainerBettingPage").prepend(previousCategory);
            previousCategory.setAttribute("id", "previousCategoryBettingPage");
            previousCategory.textContent = "Previous";
            previousCategory.addEventListener("click", renderPreviousCategory);
        }*/
        
        document.querySelector("div#previousCategoryBettingPage").style.pointerEvents = "auto";
        document.querySelector("div#previousCategoryBettingPage").addEventListener("click", renderPreviousCategory);
        document.querySelector("div#previousCategoryBettingPage").style.backgroundColor = "#C98649";
        document.querySelector("div#previousCategoryBettingPage").style.color = "#000000";

        categoryIndex++;
        
        if(userAwardArray.length === categoryIndex-1) {
            let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
            for(let i = 0; i < usersPossibleChoices.length; i++) {
                if(usersPossibleChoices[i].style.backgroundColor === "rgba(222, 141, 67, 0.3)") {
                    let awardObject = {};

                    let bettingChoice = usersPossibleChoices[i].children[0].textContent;
                    if(usersPossibleChoices[i].children[1]) {
                        let nomineeFromWhere = usersPossibleChoices[i].children[1].textContent;
                        awardObject.nomineeContext = nomineeFromWhere;

                    }
                    awardObject.category = categoryNameHeading.textContent;
                    awardObject.categoryChoice = bettingChoice;
                    awardObject.winner = categoriesArray[categoryIndex-1].winner;
                    userAwardArray.push(awardObject);
                }
            }
        } else {
            for(let i = 0; i < userAwardArray.length; i++) {
                if(i === categoryIndex-1) {
                    for(let ii = 0; ii < usersPossibleChoices.length; ii++) {
                        if(usersPossibleChoices[ii].style.backgroundColor === "rgba(222, 141, 67, 0.3)") {
                            let awardObject = {};

                            let bettingChoice = usersPossibleChoices[ii].children[0].textContent;
                            if(usersPossibleChoices[ii].children[1]) {
                                let nomineeFromWhere = usersPossibleChoices[ii].children[1].textContent;
                                awardObject.nomineeContext = nomineeFromWhere;

                            }
                            awardObject.category = categoryNameHeading.textContent;
                            awardObject.categoryChoice = bettingChoice;
                            awardObject.winner = categoriesArray[categoryIndex-1].winner;
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
                continueButton.textContent = "Submit Bets";
                continueButton.removeEventListener("click", continueBetting);
                continueButton.addEventListener("click", showDoneAwardInfoPage);
            } 
        }
        
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
                            usersPossibleChoices[i].style.backgroundColor = "rgba(222, 141, 67, 0.3)";
                            continueButton.style.pointerEvents = "auto";
                            continueButton.style.backgroundColor = "#C98649";
                            continueButton.style.color = "#000000";
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
            changeCategoryContainer.innerHTML = `
            <div id="previousCategoryBettingPage">Previous</div>
            <div id="continueButtonBettingPage">Next</div> 
            `;

            continueButton = document.querySelector("div#continueButtonBettingPage");
            continueButton.style.backgroundColor = "#C98649";
            continueButton.style.color = "#000000";
            continueButton.addEventListener("click", continueBetting);
            document.querySelector("div#previousCategoryBettingPage").style.pointerEvents = "none";

            document.querySelector("div#previousCategoryBettingPage").style.pointerEvents = "none";
            document.querySelector("div#previousCategoryBettingPage").style.backgroundColor = "#181818";
            document.querySelector("div#previousCategoryBettingPage").style.border = "1px solid #484848";


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
                    usersPossibleChoices[i].style.backgroundColor = "rgba(222, 141, 67, 0.3)";
                    usersPossibleChoices[i].style.borderLeft = "solid 3px #DEDEDE";

                    continueButton.style.pointerEvents = "auto";
                    continueButton.style.backgroundColor = "#C98649";
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
                usersPossibleChoices[i].style.backgroundColor = "rgba(222, 141, 67, 0.3)";
                usersPossibleChoices[i].style.borderLeft = "solid 3px #DEDEDE";

                continueButton.style.pointerEvents = "auto";
                continueButton.style.backgroundColor = "#C98649";
                continueButton.style.color = "#000000";
            }
        }
    }

    async function showDoneAwardInfoPage(event) {
        //-Make checkmark show on award page with all the awards
        document.querySelector("div#continueButtonBettingPage").style.pointerEvents = "none";

        categoryIndex++;

        if(userAwardArray.length === categoryIndex-1) {
            let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
            for(let i = 0; i < usersPossibleChoices.length; i++) {
                if(usersPossibleChoices[i].style.backgroundColor === "rgba(222, 141, 67, 0.3)") {
                    let awardObject = {};

                    let bettingChoice = usersPossibleChoices[i].children[0].textContent;
                    if(usersPossibleChoices[i].children[1]) {
                        let nomineeFromWhere = usersPossibleChoices[i].children[1].textContent;
                        awardObject.nomineeContext = nomineeFromWhere;

                    }
                    awardObject.category = categoryNameHeading.textContent;
                    awardObject.categoryChoice = bettingChoice;
                    awardObject.winner = categoriesArray[categoryIndex-1].winner;
                    userAwardArray.push(awardObject);
                }
            }
        } else {
            for(let i = 0; i < userAwardArray.length; i++) {
                if(i === categoryIndex-1) {
                    for(let ii = 0; ii < usersPossibleChoices.length; ii++) {
                        if(usersPossibleChoices[ii].style.backgroundColor === "rgba(222, 141, 67, 0.3)") {
                            let awardObject = {};

                            let bettingChoice = usersPossibleChoices[ii].children[0].textContent;
                            if(usersPossibleChoices[ii].children[1]) {
                                let nomineeFromWhere = usersPossibleChoices[ii].children[1].textContent;
                                awardObject.nomineeContext = nomineeFromWhere;

                            }
                            awardObject.category = categoryNameHeading.textContent;
                            awardObject.categoryChoice = bettingChoice;
                            awardObject.winner = categoriesArray[categoryIndex-1].winner;
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

        let postRequestDetails = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userAwardArray)
        };

        let response = await fetch("PHP/userBettingChoices.php", postRequestDetails);
        let resource = await response.json();

        if(!response.ok) {
            console.log(response);

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
        <nav class="sticky-nav">${stickyNav()}</nav>
        `;

        //Navbar addEventListeners to different part of the app below
        document.querySelector(".fa-trophy").classList.add("current-page");
        document.querySelector(".text-awards").classList.add("current-page");

        document.querySelector(".nav-groups").addEventListener("click", () => renderMyGroups(false));
        document.querySelector(".nav-awards").addEventListener("click", () => renderAwardsPage(awards));
        document.querySelector(".nav-profile").addEventListener("click", renderProfilePage);
        document.querySelector(".nav-home").addEventListener("click", renderHomePage);

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

async function checkIfBetsAreThere() {

    let user = JSON.parse(localStorage.getItem("user"));
    let userId = JSON.stringify(user.userId);

    let awardItems = document.querySelectorAll("button.award-item");
    let dates = document.querySelectorAll("button.award-item > p");


    for(let i = 0; i < awardItems.length; i++ ) {
        let award = awardItems[i].classList[1];

        let response = await fetch(`../PHP/userBettingChoices.php?award=${award}&userId=${userId}`);

        let resource = await response.json();

        if(resource.message === undefined) {
            let checkmark = document.createElement("img");
            checkmark.setAttribute("src", "../images/awardCheckmark.png");
            dates[i].appendChild(checkmark);
            checkmark.setAttribute("class", "checkmark");
        }
    }
}
