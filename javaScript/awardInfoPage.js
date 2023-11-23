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
        <div id="sendBetsAIPage">Send bets</div>
    </div>
    `;


    let navButtons = document.querySelectorAll("#navBarAIPage > div");

    let awardCategories = document.querySelectorAll("div.categoryAIPage");

    for(let i = 0; i < awardCategories.length; i++) {
        awardCategories[i].addEventListener("click", renderBettingPage);
    }
}

function renderBettingPage(event) {
    let awardCategories = document.querySelectorAll("div.categoryAIPage");
    let firstCategoryOfCurrentAward = awardCategories[0].firstElementChild.textContent;

    let currentAward;
    let i = 0;
    while(i < awards.length) {
        console.log(awards[i]);
        if(firstCategoryOfCurrentAward === awards[i]["categories"][0].category) {
            currentAward = awards[i]["award"];
        }

        i++
    }

    console.log(currentAward);

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

    console.log(event);
    console.log(this);
    console.log(event.currentTarget);

    let categoryClicked = this.children[0].textContent;
    console.log(categoryClicked);
    categoryNameHeading.textContent = categoryClicked;

    let nomineeAlternativesContainers = document.querySelectorAll("div.nomineeAlternativeBettingPage");

    let nomineesArray;

    for(let i = 0; i < awards.length; i++) {
        if(awards[i].award === currentAward) {
            for(let ii = 0; ii < awards[i].categories.length; ii++) {
                if(awards[i].categories[ii].category === categoryClicked) {
                    nomineesArray = awards[i].categories[ii].nominees;
                }
            }
        }
    }

    let bettingsContainer = document.querySelector("div#bettingsContainerBettingPage");

    if(categoryClicked === "Best Picture") {
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

    let usersChoices = document.querySelectorAll(".bettingChoiceContainer");
    for(let i = 0; i < usersChoices.length; i++) {
        usersChoices[i].addEventListener("click", displayUserChoice);
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

        for(let i = 0; i < usersChoices.length; i++) {
           if(usersChoices[i] === this) {
            continue;
           }

            if(usersChoices[i].style.backgroundColor === "darkgrey") {
                usersChoices[i].style.backgroundColor = "black";
            } 
        }
    }

    function continueBetting(event) {

        let usersChoices = document.querySelectorAll(".bettingChoiceContainer");
      
    }
}
