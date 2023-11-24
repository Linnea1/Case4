"use strict";

function renderAwardInfoPage() {
    main.innerHTML = `
    <div id="awardInfoContainerAIPage">
        <div id="awardImageContainerAIPage">
            <div id="awardNameAndDate">
                <h1>The Oscars</h1>
                <p>March 10, 2024</p>
            </div>
        </div>
        <div id="navBarAIPage">
            <div id="navHome"></div>
            <div id="navFriends"></div>
            <div id="navProfile"></div>
            <div id="navSettings"></div>
        </div>
        <h2>Place your bets</h2>
        <div id="awardCategoriesContainer">
            <div class="categoryAIPage">
                <h3 class="categoryNameAIPage">Best Picture</h3>
                <div class="bettingChoiceAIPage">No bet</div>
            </div>
            <div class="categoryAIPage">
                <h3 class="categoryNameAIPage">Actor in a Leading Role</h3>
                <div class="bettingChoiceAIPage">No bet</div>
            </div>
            <div class="categoryAIPage">
                <h3 class="categoryNameAIPage">Actress in a Leading Role</h3>
                <div class="bettingChoiceAIPage">No bet</div>
            </div>
            <div class="categoryAIPage">
                <h3 class="categoryNameAIPage">Actor in a Supporting Role</h3>
                <div class="bettingChoiceAIPage">No bet</div>
            </div>
            <div class="categoryAIPage">
                <h3 class="categoryNameAIPage">Actress in a Supporting Role</h3>
                <div class="bettingChoiceAIPage">No bet</div>
            </div>
        </div>
        <div id="startBettingAwardBettingPage">Start betting</div>
    </div>
    `;


    let navButtons = document.querySelectorAll("#navBarAIPage > div");

    //let awardCategories = document.querySelectorAll("div.categoryAIPage");
    //Denna ovan behövs kanske inte, i alla fall inte nu

    let startBettingButton = document.querySelector("div#startBettingAwardBettingPage");
    startBettingButton.addEventListener("click", renderBettingPage);
}

function renderBettingPage(event) {
    //Renders when user clicks on a category on the award page
    //Need to place a previous button if user did not click on the first one?

    //Need to check which category the user clicked on, what number

    let awardCategories = document.querySelectorAll("div.categoryAIPage");
    let firstCategoryOfCurrentAward = awardCategories[0].firstElementChild.textContent;

    let currentAward;
    let i = 0;
    while(i < awards.length) {
        console.log(awards[i]);
        if(firstCategoryOfCurrentAward === awards[i]["categories"][0].category) {
            currentAward = awards[i]["award"];
            //Find right award
        }

        i++
    }

    console.log(currentAward);

    //Ändra continue-knappen nedan, ska inte alltid vara där
    main.innerHTML =  `
    <div id="bettingPageContainer">
        <h1></h1>
        <div id="bettingsContainerBettingPage"></div>
        <div id="continueButton">Next</div> 
        
        <div id="navBarAIPage">
            <div id="navHome"></div>
            <div id="navFriends"></div>
            <div id="navProfile"></div>
            <div id="navSettings"></div>
        </div>
    </div>
    `;

    let categoryNameHeading = document.querySelector("div#bettingPageContainer > h1");
    categoryNameHeading.textContent = firstCategoryOfCurrentAward;
    console.log(event);
    console.log(this);
    console.log(event.currentTarget);

    //Current category below

    //When this page renders, it will always be displaying the first category for the award
    /*let categoryClicked = this.children[0].textContent;
    console.log(categoryClicked);
    categoryNameHeading.textContent = categoryClicked;

    let nomineeAlternativesContainers = document.querySelectorAll("div.nomineeAlternativeBettingPage");

    let nomineesArray;

    for(let i = 0; i < awards.length; i++) {
        if(awards[i].award === currentAward) {
            for(let ii = 0; ii < awards[i].categories.length; ii++) {
                if(awards[i].categories[ii].category === categoryClicked) {
                    nomineesArray = awards[i].categories[ii].nominees;
                    //Find array with nominees for the right category, for the right award
                    //The elements of the nominees array are made of objects
                }
            }
        }
    }*/

    let nomineesArray;

    for(let i = 0; i < awards.length; i++) {
        if(awards[i].award === currentAward) {
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
            <div>Alt ${i+1}</div>
            <div class="nomineeAlternativeBettingPage">${nomineesArray[i].film}</div>
            `;
            bettingsContainer.appendChild(bettingChoiceContainer);
        }
    }



    let nomineeAlternativesContainers = document.querySelectorAll("div.nomineeAlternativeBettingPage");

    let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
    for(let i = 0; i < usersPossibleChoices.length; i++) {
        usersPossibleChoices[i].addEventListener("click", displayUserChoice);
    }

    let continueButton = document.querySelector("div#continueButton");
    continueButton.style.pointerEvents = "none";
    continueButton.style.backgroundColor = "#343434";
    continueButton.addEventListener("click", continueBetting);

    function displayUserChoice(event) {

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

    function continueBetting(event) {
        //Vilken kategori i ordningen
        //Nomineringarna för denna kategorin
        //Spara föregående nominering som valdes -- i objekt?
        let usersPossibleChoices = document.querySelectorAll(".bettingChoiceContainer");
      
    }
}
