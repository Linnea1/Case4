"use strict";

async function renderMyGroups(newGroupCreated) {
  let userGroups = await getUserTeams();

  main.innerHTML = `
    <div class="groups-container">
      <div class="bg-group">
        <div class="tablet-group-title-button">
          <h2>My Groups</h2>
          <button class="btn-main tablet-create-group">
            <i class="fa-solid fa-plus"></i>New group
          </button>
        </div>
      </div>
      <div class="page-my-groups">
        <div class="groups-title-button">
          <h2>My Groups</h2>
          <button class="btn-main create-group">
            <i class="fa-solid fa-plus"></i>New group</button>
        </div>
        <div class="groups">
          ${renderGroups(userGroups)}
        </div>
      </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  main.classList.remove("bg-home");

  let groups = document.querySelectorAll(".group");

  groups.forEach((group) => {
    const groupId = group.id;
    group.addEventListener("click", () => {
      const selectedGroup = userGroups.find(
        (element) =>
          element.groupName.toLowerCase().replace(/\s+/g, "-") === groupId
      );
      navigateToGroupPage(selectedGroup);
    });
  });

  let popUp = document.querySelector(".popup");
  popUp.classList.remove("shown");

  if (newGroupCreated) {
    popUp.classList.add("shown");
    let inputContent = document.querySelector(".inputContent");
    inputContent.innerHTML = `
      <button>
        <i class="fa-solid fa-xmark go-to-my-groups" aria-hidden="true"></i>
      </button>
      <p>Your new group has been created!</p>
    `;

    document.querySelector(".go-to-my-groups").addEventListener("click", () => {
      popUp.classList.remove("shown");
    });
  }

  document.querySelector(".fa-people-group").classList.add("current-page");
  document.querySelector(".text-groups").classList.add("current-page");

  document.querySelector(".tablet-create-group").addEventListener("click", renderCreateNewGroupPage);
  document.querySelector(".create-group").addEventListener("click", renderCreateNewGroupPage);
  document.querySelector(".nav-home").addEventListener("click", renderHomePage);
  document
    .querySelector(".nav-awards")
    .addEventListener("click", () => renderAwardsPage(awards));
  document
    .querySelector(".nav-profile")
    .addEventListener("click", renderProfilePage);
}

function renderGroups(userGroups) {
  const group = userGroups
    .reverse()
    .map(
      (element) => `
      <button class="group" id="${element.groupName
          .toLowerCase()
          .replace(/\s+/g, "-")}">
        <h3>${element.groupName.toUpperCase()}</h3>
        <div class="group-info">
          <p>${element.members.length} members</p>
          <p>${checkAmountOfBettedMembers(element)}/${element.members.length} members have placed their bet</p>
        </div>
      </button>
    `
    )
    .join("");

  return group;
}

function checkAmountOfBettedMembers(element) {
  let numbersOfBettedUsers = 0;
  const users = element.users;

  for(const user of users) {
    const games = user.games;

    const gameWithBettedResult = (
      Object.values(games)
      .filter(element => typeof element === 'object')
      .filter(element => Object.keys(element).length)
    );

      if(gameWithBettedResult.length > 0) {
        numbersOfBettedUsers++;
      }
    }

  return numbersOfBettedUsers;
}
