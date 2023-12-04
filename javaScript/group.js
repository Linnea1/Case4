async function navigateToGroupPage(selectedGroup) {
  main.classList.remove("bg-home");
  main.innerHTML = `
    <div class="group-container">
      <div class="profile-heading-bg">
        <h2>And the winner is...</h2>
          <img src="" alt="">
          <h1>X</h1>
      </div>
      <div class="group-text">
        <h2 class="group-name">${selectedGroup.groupName.toUpperCase()}</h2>
        <button class="button-leave">Leave Group</button>
        <h3>Results</h3>
        <div class="users-in-rank">${await putUsersInOrder(selectedGroup)}</div>
        <button class="btn-main button-history">RESULT HISTORY</button>
      </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  document.querySelector(".fa-people-group").classList.add("current-page");
  document.querySelector(".text-groups").classList.add("current-page");

  document
    .querySelector(".nav-home")
    .addEventListener("click", renderHomePage);
  document
    .querySelector(".nav-groups")
    .addEventListener("click", renderMyGroups);
  document
    .querySelector(".nav-awards")
    .addEventListener("click", () => renderAwardsPage(awards));
  document
    .querySelector(".nav-profile")
    .addEventListener("click", renderProfilePage);
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
          <div class="rank-number">${rankCounter++}.</div>
          <img src="${imagesArray[index]}" alt="${element.name}" class="rank-user-image">
          <div class="user-in-rank">
            <div>${element.name}</div>
            <div>${element.games.userTotalPointsForGroup} points</div>
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
