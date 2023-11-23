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
}

function renderTeams(userTeams) {
  const team = userTeams
    .map(
      (element) => `
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
