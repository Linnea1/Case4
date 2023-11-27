"use strict";

async function renderMyGroups(homePage) {
  let userTeams = await getUserTeams();

  homePage.innerHTML = `
    <div class="teams">
      ${renderTeams(userTeams)}
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  let teams = document.querySelectorAll(".team");

  teams.forEach((team) => {
    const teamId = team.id;
    team.addEventListener("click", () => {
      const selectedTeam = userTeams.find(
        (element) =>
          element.groupName.toLowerCase().replace(/\s+/g, "-") === teamId
      );
      navigateToTeamPage(selectedTeam);
    });
  });

  document
    .querySelector(".fa-trophy")
    .addEventListener("click", () => renderAwardsPage(awards));
}

function renderTeams(userTeams) {
  const team = userTeams
    .map(
      (element) => `
      <button class="team" id="${element.groupName
        .toLowerCase()
        .replace(/\s+/g, "-")}">
        <h3>${element.groupName.toUpperCase()}</h3>
        <div class="team-info">
          <p>${element.members.length} members</p>
          <p>/${element.members.length} members have placed their bet</p>
        </div>
      </button>
    `
    )
    .join("");

  return `
    ${team}
  `;
}
