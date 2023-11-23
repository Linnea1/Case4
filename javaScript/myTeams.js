"use strict";

async function teamContent(profileContent) {
  let userTeams = await getUserTeams();

  profileContent.innerHTML = `
    <div class="teams">
      ${renderTeams(userTeams)}
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  document
    .querySelector(".sticky-nav .home")
    .addEventListener("click", renderHomePage);

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
