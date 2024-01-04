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
          <button class="logoutButton home-logout-button">Logout</button>
          <div class="home-welcome">
            <h1>Hi
              <span>${userData.username}</span>
            </h1>
            <p>Ready to predict like a pro? Let's start the betting frenzy!</p>
          </div>
          <i class="fas fa-chevron-down arrow"></i>

          <div class="countdown">
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
      <h3 class="award-header">${element.award}</h3>
      <div class="award-countdown">
        <div class="days">
            <p>10</p>
            <div>Days</div>
        </div>
        <div class="hours">
            <p>2</p>
            <div>Hours</div>
        </div>
        <div class="minutes">
            <p>59</p>
            <div>Minutes</div>
        </div>
        <div class="seconds">
            <p>59</p>
            <div>Seconds</div>
        </div>
      </div>
      <div class="awardsContentWrapper ${element.award}Bets"></diV>
    </div>
  `);

  awardsHtml.splice(-2, 2,
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

  await Promise.all(awards.map(async (awardObject) => {
    let award = awardObject.award;
    let lowerCaseAward = award.toLowerCase();
    let response = await fetch(`../PHP/userBettingChoices.php?award=${lowerCaseAward}&userId=${userData.userId}`);
    let userBet = await response.json();
    let awardsBox = document.querySelector(`.${award}Bets`);
    awardsBox.innerHTML = "";

    if (userBet.message) {
      awards.forEach((element) => {
        if (element.award.toLowerCase() === lowerCaseAward) {
          element.categories.forEach((category) => {
            let betContainer = document.createElement("div");
            betContainer.classList.add("betContainer");
            betContainer.innerHTML = `
              <h3 class="betHeader">${category.category}</h3>
              <p class="betChoice">No Bet</p>
            `;
            awardsBox.appendChild(betContainer);
          });
        }
      });
    } else {
      for (let index = 0; index < userBet.length; index++) {
        const betObject = userBet[index];
        if (betObject === userBet[userBet.length - 1]) {
          continue;
        } else {
          let betContainer = document.createElement("div");
          betContainer.classList.add("betContainer");
          betContainer.innerHTML = `
            <h3 class="betHeader">${betObject.category}</h3>
            <p class="betChoice">${betObject.categoryChoice}</p>
          `;
          awardsBox.appendChild(betContainer);
        }
      }
    }
  }));
}
