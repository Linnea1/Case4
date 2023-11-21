"use strict";

function getUserData() {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
}

async function renderHomePage() {
  let response = await fetch(`../PHP/getUserData.php?userId=${getUserData().userId}`);

  const userData = await response.json();

  main.classList.add("bg-home");

  main.innerHTML = `
    <div class="page-home">
      <button class="logoutButton">Logout</button>
      <div class="home-welcome">
        <h1>Hi
          <span>${userData.username}</span>
        </h1>
        <p>Ready to predict like a pro? Let's start the betting frenzy!</p>
      </div>
      <nav class="sticky-nav">${stickyNav()}</nav>
    </div>
  `;

  document.querySelector(".logoutButton").addEventListener("click", logoutFromAccount);
}

function logoutFromAccount() {
  window.localStorage.removeItem("user");
  renderWelcomePage();
}
