"use strict";

function renderAwardsPage(awards) {
  const award = awards
    .map(
      (element) => `
        <button class="award-item ${element.award.toLowerCase()}">
          <h2>${element.award}</h2>
          <p>${element.date}</p>
        </button>
      `
    )
    .join("");

  const renderedContent = `${award}`;

  main.classList.remove("bg-home");

  main.innerHTML = `
    <div class="awards-page">
      <h2>Awards</h2>
      <div class="awards-container">
      ${renderedContent}
      </div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
  `;

  document.querySelector(".fa-trophy").classList.add("current-page");
  document.querySelector(".text-awards").classList.add("current-page");

  document
    .querySelector(".nav-home")
    .addEventListener("click", renderHomePage);
  document
    .querySelector(".nav-groups")
    .addEventListener("click", renderMyGroups);
  document
    .querySelector(".nav-profile")
    .addEventListener("click", renderProfilePage);

  return renderedContent;
}

