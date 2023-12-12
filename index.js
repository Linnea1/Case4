let username;
let main = document.querySelector("main");

function checkIfUserLoggedIn() {
  if (window.localStorage.getItem("user")) {
    renderHomePage();
  } else {
    renderWelcomePage();
  }
}

checkIfUserLoggedIn();

//renderAwardInfoPage();
