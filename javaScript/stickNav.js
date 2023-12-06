"use strict";

function stickyNav() {
  return `
    <ul>
      <div class="app-logo">G</div>
      <li class="nav-home">
        <i class="fa-solid fa-house nav-icon"></i>
        <p class="nav-icon-name text-house">Home</p>
      </li>
      <li class="nav-groups">
        <i class="fa-solid fa-people-group nav-icon"></i>
        <p class="nav-icon-name text-groups">Groups</p>
      </li>
      <li class="nav-awards">
        <i class="fa-solid fa-trophy nav-icon"></i>
        <p class="nav-icon-name text-awards">Awards</p>
      </li>
      <li class="nav-profile">
        <i class="fa-solid fa-user nav-icon"></i>
        <p class="nav-icon-name text-profile">Profile</p>
        </li>
    </ul>
  `;
}
