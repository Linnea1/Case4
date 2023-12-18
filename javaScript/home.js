"use strict";

async function renderHomePage() {
  main.classList.remove("register-bg");
  main.classList.remove("login-bg");

  let response = await fetch(`../PHP/getUserData.php?userId=${getUserData().userId}`);

  const userData = await response.json();

  main.innerHTML = `
    <div class="home-container">
      <div class="bg-home">
      <div class="home-content">
        <button class="logoutButton">Logout</button>
        <div class="home-welcome">
          <h1>Hi
            <span>${userData.username}</span>
          </h1>
          <p>Ready to predict like a pro? Let's start the betting frenzy!</p>
        </div>
        <i class="fas fa-chevron-down arrow"></i>

        <div class="countdown">
          <h2></h2>
          <div class="countdownTimers">
            ${renderCountDown()}
          </div>
        </div>

      </div>
      <nav class="sticky-nav">${stickyNav()}</nav>
      <div>
    <div>
  `;

  document.querySelector(".fa-house").classList.add("current-page");
  document.querySelector(".text-house").classList.add("current-page");

  document
    .querySelector(".nav-groups")
    .addEventListener("click", () => renderMyGroups(false));
  document
    .querySelector(".nav-awards")
    .addEventListener("click", () => renderAwardsPage(awards));
  document.querySelector(".nav-profile").addEventListener("click", renderProfilePage);

  document.querySelector(".logoutButton").addEventListener("click", logoutFromAccount);
}

function renderCountDown() {
  const awardsHtml = awards.map((element) => `
    <div class="timers">
      <h3 class="awardHeader">${element.award}</h3>
      <div class=awardCountdown>
        <div class="days">
            <div>10</div>
            <div>Days</div>
        </div>
        <div class="hours">
            <div>2</div>
            <div>Hours</div>
        </div>
        <div class="minutes">
            <div>59</div>
            <div>Minutes</div>
        </div>
        <div class="seconds">
            <div>59</div>
            <div>Seconds</div>
        </div>
      </div>
      <div class="awardsContentWrapper ${element.award}Bets"></diV>
    </div>
  `);

    awardsHtml.splice(-2,2,
      `
        <div class="oscars-grammys">
          ${awardsHtml.slice(-2).join("")}
        </div>
      `
    );
    getBetsHome()
    return awardsHtml.join("");
}

function logoutFromAccount() {
  window.localStorage.removeItem("user");
  renderWelcomePage();
  main.classList.remove("bg-home");
}

async function getBetsHome() {
  let data = await fetch(`../PHP/getUserData.php?userId=${getUserData().userId}`);
  const userData = await data.json();

  // Use Promise.all to wait for all fetch calls to resolve
  await Promise.all(awards.map(async (awardObject) => {
    let award=awardObject.award;
    console.log(award)
    let lowerCaseAward = award.toLowerCase();
    let response = await fetch(`../PHP/userBettingChoices.php?award=${lowerCaseAward}&userId=${userData.userId}`);
    let userBet = await response.json();
    let awardsBox = document.querySelector(`.${award}Bets`);
    awardsBox.innerHTML = "";
    console.log(userBet)
    if (userBet.message) {
      awards.forEach((element) => {
        if (element.award.toLowerCase() === lowerCaseAward) {
          element.categories.forEach((category) => {
            let betContainer = document.createElement("div");
            betContainer.classList.add("betContainer");
            betContainer.innerHTML = `
              <h3>${category.category}</h3>
              <p>No Bet</p>
            `;
            awardsBox.appendChild(betContainer);
          });
        }
      });
    } else {
      userBet.forEach((betObject) => {
        let betContainer = document.createElement("div");
        betContainer.classList.add("betContainer");
        betContainer.innerHTML = `
          <h3>${betObject.category}</h3>
          <p>${betObject.categoryChoice}</p>
        `;
        awardsBox.appendChild(betContainer);
      });
    }
  }));
}

