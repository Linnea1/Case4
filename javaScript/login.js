"use strict";

function renderLoginPage() {
  main.innerHTML = `
    <div class="login-page">
      <div><i class="fa-solid fa-arrow-left"></i></div>
      <div class="login-welcome">
        <h1>Welcome back!</h1>
        <p>Log in to continue</p>
      </div>
      <form class="login-form" action="PHP/login.php" method="POST">
        <input type="text" class="login-email" placeholder="Email" name="email">
        <input type="password" class="login-password" placeholder="Password" name="password">
        <button class="btn-main go-to-home-page" type="submit">Continue</button>
        <p class="message-login"></p>
      </form>
      <footer class="sign-up-from-login">Don’t have an account?
        <button>Sign up</button>
      </footer>
    </div>
  `;

  document.querySelector(".fa-arrow-left").addEventListener("click", renderWelcomePage);
  document.querySelector(".sign-up-from-login button").addEventListener("click", renderRegisterPage);

  let loginMain = document.querySelector("main");
  let loginForm = loginMain.querySelector("form");
  let message = loginForm.querySelector(".message-login");
  loginForm.addEventListener("submit", (event) =>
    submitLogin(event, loginForm, message)
  );
}

async function submitLogin(event, loginForm, message) {
  event.preventDefault();
  message.textContent = "";

  try {
    let response = await fetch("../PHP/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.querySelector(".login-email").value,
        password: loginForm.querySelector(".login-password").value,
      }),
    });


    let data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
    } else {
      window.localStorage.setItem("user", JSON.stringify(data));
      renderHomePage();
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}
