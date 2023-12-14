"use strict";

async function renderCreateNewGroupPage() {
  let loggedInUser = getUserData();
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
            <input type="text" class="new-group-member" placeholder="Enter username" name="new-group-member">
            <div class="dropdown-list"></div>
          </div>
          <div class="group-members-list">
            <div>Group members</div>
            <ul class="group-members-names">
              <li class="list-item-container ${loggedInUser.username} logged-in-user-on-list">
                <img class="found-user-image" src="${loggedInUser.profilePicture}">
                <div class="new-member">${loggedInUser.username}</div>
              </li>
            </ul>
          </div>
          <div class="create-new-group-message"></div>
          <button class="create-new-group">Done</button>
        </form>
      </div>
    </div>
  `;

  const allUsers = await getUsersInfo();
  const usernames = allUsers.map((user) => user.username);
  const usernameInputField = document.querySelector(".new-group-member");
  const newGroupForm = document.querySelector(".new-group-form");
  const message = document.querySelector(".create-new-group-message");
  const newGroupName = document.querySelector(".new-group-name");
  const penIcon = document.querySelector(".fa-pen");

  usernameInputField.addEventListener("input", () => {
    const usernameInput = usernameInputField.value;
    searchUsername(allUsers, usernames, usernameInput, usernameInputField, message);
  });

  newGroupForm.addEventListener("submit", (event) =>
    createNewGroup(event, newGroupForm, message)
  );

  newGroupName.addEventListener("input", () => {
    if (newGroupName.value !== "") {
      penIcon.classList.add("hidden");
    } else {
      penIcon.classList.remove("hidden");
    }
  })

//   goToMyGroups.addEventListener("click", () => {
//     renderMyGroups();
//   })
}

async function createNewGroup(event, newGroupForm, message) {
  event.preventDefault();

  const listItemContainer = document.querySelectorAll(".list-item-container");
  const memberCount = listItemContainer.length;

  if (memberCount <= 1) {
    message.textContent = "You need to add at least one group member.";
    return;
  }

  const member = document.querySelectorAll(".new-member");
  const groupMembers = Array.from(member).map(
    (member) => member.textContent.trim()
  );

  try {
    let response = await fetch("../PHP/createNewGroup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupName: newGroupForm.querySelector(".new-group-name").value,
        groupMembers: groupMembers,
      }),
    });

    let data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
    } else {
      const newGroupCreated = true;
      renderMyGroups(newGroupCreated);
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}

function searchUsername(allUsers, usernames, usernameInput, usernameInputField, message) {
  const dropdown = document.querySelector(".dropdown-list");
  dropdown.innerHTML = "";

  if (usernameInput.trim() === "") {
    dropdown.innerHTML = "";
    return;
  }

  dropdown.innerHTML = "";

  const addedGroupMembers = Array.from(
    document.querySelectorAll(".new-member")
  ).map((newMember) => newMember.innerText);

  const usernameInputLowerCase = usernameInput.toLowerCase();

  const filteredUsernames = usernames.filter(
    (username) =>
      username.toLowerCase().startsWith(usernameInputLowerCase) &&
      !addedGroupMembers.includes(username)
  );

  filteredUsernames.forEach((username) => {
    const user = allUsers.find(currentUser => currentUser.username === username);
    const basePath = "../profilePictures/";
    const userImage = basePath + user.profilePicture;
    const optionContainer = document.createElement("div");

    optionContainer.classList.add("option-container");
    optionContainer.innerHTML = `
      <img class="dropdown-option-image" src="${userImage}">
      <option class="dropdown-option">${username}</option>
    `;

    dropdown.appendChild(optionContainer);

    optionContainer.addEventListener("click", () => {
      addUserToList(username, usernameInputField, dropdown, message, userImage);
    });
  });
}

function addUserToList(username, usernameInputField, dropdown, message, userImage) {
  usernameInputField.value = username;
  dropdown.innerHTML = "";
  message.textContent = "";

  const foundUsername = usernameInputField.value;
  const memberNames = document.querySelector(".group-members-names");

  if (foundUsername) {
    const listItemContainer = document.createElement("li");
    listItemContainer.classList.add("list-item-container", foundUsername);
    listItemContainer.innerHTML = `
      <div class="list-item-user">
        <img class="found-user-image" src="${userImage}">
        <div class="new-member">${foundUsername}</div>
      </div>
      <button>
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    `;

    memberNames.appendChild(listItemContainer);
    usernameInputField.value = "";

    removeListItem(listItemContainer);
  }

  return foundUsername;
}

function removeListItem(listItemContainer) {
  const removeListItemButton = listItemContainer.querySelector(".fa-xmark");

  if (removeListItemButton) {
    removeListItemButton.addEventListener("click", () => {
      listItemContainer.remove();
    });
  }
}

async function getUsersInfo() {
  const allUsers = await getAllUsers();
  const userInfo = allUsers.map((user) => user);
  return userInfo;
}
