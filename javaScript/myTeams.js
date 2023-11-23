"use strict";

async function teamContent(profileContent) {
  let userTeams = await getUserTeams();

  profileContent.innerHTML = `
    <div class="teams">
      ${renderTeams(userTeams)}
    </div>
            <div class="groupContentWrapper">
               Groups....
            </div>
        `;
  `;
}

function renderTeams(userTeams) {
}
