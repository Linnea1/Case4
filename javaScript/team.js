function navigateToTeamPage(selectedTeam) {
  main.classList.remove("bg-home");
  main.innerHTML = `
    <div class="team-container">
      <div class="profile-heading-bg">
        <h2 class="group-name">${selectedTeam.groupName.toUpperCase()}</h2>
        <button>Leave Team</button>
      </div>
      <div class="team-rank">
        <h3>Ranking</h3>
        <div class="users-in-rank">${putUsersInOrder(selectedTeam)}</div>
      </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  document
    .querySelector(".sticky-nav .home")
    .addEventListener("click", renderHomePage);
}

function putUsersInOrder(selectedTeam) {
  const users = selectedTeam.users;

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
