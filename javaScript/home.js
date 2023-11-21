"use strict";

async function renderHomePage() {
  main.innerHTML = `
    <img src="" alt="">
    <div>Hi</div>
    <div>Hi
      <span></span>
    </div>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias nesciunt tempora officiis, qui placeat dicta deleniti quidem iure.</p>
    <div class="navigation icons">
      <i class="fa-solid fa-house"></i>
      <i class="fa-solid fa-people-group"></i>
      <i class="fa-solid fa-user"></i>
      <i class="fa-solid fa-gears"></i>
    </div>
    <div>
      <div>
          <img src="" alt="">
          <div>Name</div>
          <div>Date</div>
      </div>
      <div>
          <img src="" alt="">
          <div>Name</div>
          <div>Date</div>
      </div>
      <div>
          <img src="" alt="">
          <div>Name</div>
          <div>Date</div>
      </div>
    </div>
  `;

  document.querySelector(".logoutButton").addEventListener("click", logoutFromAccount);
}

function logoutFromAccount() {
  window.localStorage.removeItem("user");
  renderWelcomePage();
}
