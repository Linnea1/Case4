function navigateToGroupPage(selectedGroup) {
  main.classList.remove("bg-home");
  main.innerHTML = `
    <div class="group-container">
      <div class="profile-heading-bg">
        <h2 class="group-name">${selectedGroup.groupName.toUpperCase()}</h2>
        <button>Leave Group</button>
      </div>
      <div class="group-rank">
        <h3>Ranking</h3>
        <div class="users-in-rank">${putUsersInOrder(selectedGroup)}</div>
      </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  document.querySelector(".fa-trophy").addEventListener("click", () => renderAwardsPage(awards));
}

function putUsersInOrder(selectedGroup) {
  const users = selectedGroup.users;

  const sortByTotalPoints = (a, b) =>
    b.games.userTotalPointsForGroup - a.games.userTotalPointsForGroup;

  const sortedUsersInOrder = users.sort(sortByTotalPoints);

  return `
    ${renderUsers(sortedUsersInOrder)}
  `;
}

function renderUsers(sortedUsersInOrder) {
  let rankCounter = 1;
  const ranking = sortedUsersInOrder
    .map(
      (element) => `
        <div class="user-perfomance">
          <div class="rank-number">${rankCounter++}. </div>
          <img src="" alt="">
          <div class="user-in-rank">
            <div>${element.name}</div>
            <div>${element.games.userTotalPointsForGroup} points</div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    ${ranking}
  `;
}