"use strict";

async function renderMyGroups(homePage) {
  let userGroups = await getUserTeams();

  homePage.innerHTML = `
    <div class="teams">
      ${renderTeams(userTeams)}
      <div class="groups">
        ${renderGroups(userGroups)}
      </div>
    </div>

    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

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

  document
    .querySelector(".fa-trophy")
    .addEventListener("click", () => renderAwardsPage(awards));
}

function renderGroups(userGroups) {
  const group = userGroups
    .map(
      (element) => `
      <button class="group" id="${element.groupName
        .toLowerCase()
        .replace(/\s+/g, "-")}">
        <h3>${element.groupName.toUpperCase()}</h3>
        <div class="group-info">
          <p>${element.members.length} members</p>
          <p>/${element.members.length} members have placed their bet</p>
        </div>
      </button>
    `
    )
    .join("");

  return `
    ${group}
  `;
}
