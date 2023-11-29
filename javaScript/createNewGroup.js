"use strict";

async function renderCreateNewGroupPage() {
  main.classList.remove("bg-home");
  main.innerHTML = `
    <div class="page-create-new-group">
      <div class="create-new-group-container">
        <form class="new-group-form" action="PHP/createNewGroup.php" method="POST">
          <div class="new-group-name-container">
            <input type="text" class="new-group-name" placeholder="Enter group name &#xf304;" name="new-group-name" required">
            <i class="fa-solid fa-pen"></i>
          </div>
          <div class="new-group-member-container">
            <label for="new-group-member">Add group member</label>
            <div class="input-row">
              <input type="text" class="new-group-member" placeholder="Enter username" name="new-group-member" oninput="searchUsername()" required>
              <i class="fa-solid fa-plus"></i>
            </div>
            <div class="dropdownList"></div>
          </div>
          <div class="group-members-list">
            <div>Group members</div>
            <ul></ul>
          </div>
        </form>
        <button class="create-new-group">Done</button>
      </div>
    <div>
  `;
  const usernames = await getAllUsernames();
async function getAllUsernames() {
  const allUsers = await getAllUsers();
  const usernames = allUsers.map((user) => user.username);
  return usernames;
}
