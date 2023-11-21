"use strict";

function renderLoginPage() {
  main.innerHTML = `
    <div class="login-page">
      <i class="fa-solid fa-arrow-left"></i>
      <div class="login-welcome">
        <h1>Welcome back!</h1>
        <p>Log in to continue</p>
      </div>
      <form class="login-form" action="PHP/login.php" method="POST">
        <input type="text" class="login-email" placeholder="Email" name="email">
        <input type="password" class="login-password" placeholder="Password" name="password">
        <button class="go-to-home-page" type="submit">Continue</button>
        <p class="message-login"></p>
      </form>
      <footer class="sign-up-from-login">Don’t have an account?
        <button>Sign up</button>
      </footer>
    </div>
  `;

  document.querySelector(".fa-arrow-left").addEventListener("click", renderWelcomePage);
}
