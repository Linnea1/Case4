"user strict";

function renderLoginPage() {
  main.innerHTML = `
    <i class="fa-solid fa-arrow-left"></i>
    <div class="welcome">
      <h1>Welcome back!</h1>
      <p>Log in to continue</p>
    </div>
    <form class="login-form" action="PHP/login.php" method="POST">
      <input type="text" class="required" placeholder="Email">
      <input type="password" class="required" placeholder="Password">
      <button class="loginButton" type="submit">Continue</button>
      <p class="message"></p>
    </form>
    <footer>Don’t have an account?
      <button>Sign up</button>
    </footer>
  `;
}
