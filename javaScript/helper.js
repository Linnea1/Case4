"use strict";

function getUserData() {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
}

async function getUserTeams() {
  let userId = getUserData().userId;
  let response = await fetch(`../PHP/groupInfo.php?userId=${userId}`);
  let userTeams = await response.json();
  return userTeams;
}
