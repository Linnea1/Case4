async function navigateToGroupPage(selectedGroup) {
  let userGroups = await getUserTeams();

  const loggedInUser = getUserData();
  main.classList.remove("bg-home");
  main.innerHTML = `
    <div class="group-container">
      <div class="tablet-group-left">
        <h2>My Groups</h2>
        <div class="tablet-groups">
          ${renderGroups(userGroups)}
        </div>
      </div>

      <div class="tablet-group-right">
        <div class="profile-heading-bg">
          <h2>And the winner is...</h2>
            <div class="question-box">
              <i class="fa-solid fa-question"></i>
            </div>
        </div>
        <div class="group-text">
          <div class="group-name-result-history">
            <h2 class="group-name">${selectedGroup.groupName.toUpperCase()}</h2>
            <button class="btn-main tablet-result-history">RESULT HISTORY</button>
          </div>
          <h3>Results</h3>
          <div class="users-in-rank">${await putUsersInOrder(
            selectedGroup
          )}</div>

          <div class="add-group-members-grouppage">
            <i class="fa-solid fa-plus"></i>
            <p>Add group members</p>
          </div>

          <div class="btn-result-leave">
            <button class="btn-main result-history">RESULT HISTORY</button>
            <button class="btn-main button-leave">LEAVE GROUP</button>
          </div>
        </div>
      </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  let tabletGroups = document.querySelectorAll(".group");

  tabletGroups.forEach((group) => {
    const groupId = group.id;
    group.addEventListener("click", () => {
      const selectedGroup = userGroups.find(
        (element) =>
          element.groupName.toLowerCase().replace(/\s+/g, "-") === groupId
      );
      navigateToGroupPage(selectedGroup);
    });
  });

  document.querySelector(".fa-people-group").classList.add("current-page");
  document.querySelector(".text-groups").classList.add("current-page");

  document
    .querySelector(".button-leave")
    .addEventListener("click", () => leaveGroup(loggedInUser, selectedGroup));
  document
    .querySelector(".nav-home")
    .addEventListener("click", renderHomePage);
  document
    .querySelector(".nav-groups")
    .addEventListener("click", () => renderMyGroups(false));
  document
    .querySelector(".nav-awards")
    .addEventListener("click", () => renderAwardsPage(awards));
  document
    .querySelector(".nav-profile")
    .addEventListener("click", renderProfilePage);
}

async function leaveGroup(loggedInUser, selectedGroup) {
  const userId = loggedInUser.userId;
  const userGroupId = selectedGroup.groupId;

  const response = await fetch("../PHP/removeGroupFromUser.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      userGroupId: userGroupId,
    }),
  });

  let data = await response.json();
  let popUp = document.querySelector(".popup");
  let popUpContent = document.querySelector(".inputContent");
  popUp.classList.add("shown");
  popUpContent.classList.remove("inputContent");
  popUpContent.classList.add("leave-group-popup");
  popUpContent.innerHTML = `
    ${data.message}
    <i class="fa-solid fa-xmark button-close"></i>
  `;

  document
    .querySelector(".button-close")
    .addEventListener("click", () => renderMyGroups(false));
}

async function putUsersInOrder(selectedGroup) {
  const users = selectedGroup.users;

  const sortByTotalPoints = (a, b) =>
    b.games.userTotalPointsForGroup - a.games.userTotalPointsForGroup;

  const sortedUsersInOrder = users.sort(sortByTotalPoints);

  return await renderUsers(sortedUsersInOrder);
}

async function renderUsers(sortedUsersInOrder) {
  let imagesArray = await findUsersImages(sortedUsersInOrder);

  let rankCounter = 1;
  const ranking = sortedUsersInOrder
    .map(
      (element, index) => `
        <div class="user-perfomance">
          <div class="user-in-rank-left">
            <div class="rank-number">${rankCounter++}.</div>
            <img src="${imagesArray[index]}" alt="${element.name}" class="rank-user-image">
            <div class="tablet-rank-username">${element.name}</div>
          </div>

          <div class="user-in-rank">
            <div class="rank-username">${element.name}</div>
            <div>${element.games.userTotalPointsForGroup} points</div>
            <button class="see-bets btn-main">See bets</button>
          </div>
        </div>
      `
    )
    .join("");


  return ranking;
}

async function findUsersImages(sortedUsersInOrder) {
  const usernamesArray = sortedUsersInOrder.map((element) => element.name);

  const response = await fetch("../PHP/findUsersImages.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernames: usernamesArray
    }),
  });

  let imagesArray = await response.json();

  return imagesArray;
}
