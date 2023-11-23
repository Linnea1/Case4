"use strict";

async function teamContent(profileContent) {
  let userTeams = await getUserTeams();

  profileContent.innerHTML = `
    <div class="teams">
      ${renderTeams(userTeams)}
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;
}

function renderTeams(userTeams) {
  const team = userTeams
    .map(
      (element) => `
      <div class="team">
        <h3>${element.groupName}</h3>
        <div class="team-info">
          <p>${element.members.length} members</p>
          <p>/${element.members.length} members have placed their bet</p>
        </div>
      </div>
    `
    )
    .join("");

  return `
    ${team}
  `;
}
