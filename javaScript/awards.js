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

  document.querySelector(".fa-user").addEventListener("click", renderProfilePage);

  return renderedContent;
}

