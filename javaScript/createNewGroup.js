"use strict";

async function renderCreateNewGroupPage() {
  main.classList.remove("bg-home");
  main.innerHTML = `
    <div class="page-create-new-group">
      <div class="create-new-group-container">
        <form class="new-group-form" action="PHP/createNewGroup.php" method="POST">
          <div class="new-group-name-container">
            <input type="text" class="new-group-name" placeholder="Enter group name" name="new-group-name" required>
            <i class="fa-solid fa-pen"></i>
          </div>
          <div class="new-group-member-container">
            <label for="new-group-member">Add group member</label>
            <input type="text" class="new-group-member" placeholder="Enter username" name="new-group-member" required>
            <div class="dropdown-list"></div>
          </div>
          <div class="group-members-list">
            <div>Group members</div>
            <ul class="group-members-names"></ul>
          </div>
        </form>
        <button class="create-new-group">Done</button>
      </div>
    </div>
  `;

  const usernames = await getAllUsernames();

  const usernameInputField = document.querySelector(".new-group-member");

  usernameInputField.addEventListener("input", () => {
    const usernameInput = usernameInputField.value;
    searchUsername(usernames, usernameInput, usernameInputField);
  });
}

function searchUsername(usernames, usernameInput, usernameInputField) {
  const dropdown = document.querySelector(".dropdown-list");
  dropdown.innerHTML = "";

  const filteredUsernames = usernames.filter((username) =>
    username.toLowerCase().startsWith(usernameInput)
  );

  filteredUsernames.forEach((username) => {
    const option = document.createElement("option");
    option.classList.add("dropdown-option");
    option.textContent = username;

    option.addEventListener("click", () =>
      addUserToList(username, usernameInputField, dropdown)
    );

    dropdown.appendChild(option);
  });
}

function addUserToList(username, usernameInputField, dropdown) {
  usernameInputField.value = username;
  dropdown.innerHTML = "";
  const foundUsername = usernameInputField.value;
  const memberNames = document.querySelector(".group-members-names");
  if (foundUsername) {
    const listItemContainer = document.createElement("li");
    const listItem = document.createElement("div");
    const removeListItem = document.createElement("button");

    removeListItem.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    listItemContainer.classList.add("listItemContainer");
    listItem.textContent = foundUsername;
    listItem.classList.add(foundUsername);
    listItem.classList.add("new-member");
    listItemContainer.appendChild(listItem);
    listItemContainer.appendChild(removeListItem);
    memberNames.appendChild(listItemContainer);
    usernameInputField.value = "";

    removeListItem.addEventListener("click", () => {
      listItemContainer.remove();
    })
  }

}

async function getAllUsernames() {
  const allUsers = await getAllUsers();
  const usernames = allUsers.map((user) => user.username);
  return usernames;
}
