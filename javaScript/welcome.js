function renderWelcomePage() {
  main.innerHTML = `
    <div class="welcome-container backdrop">
      <h1 class="goldenbet">GoldenBet</h1>

      <div class="blurred-background-welcome"></div>

      <div class="welcome-text black-box">
        <div class="web-title">GoldenBet</div>
        <div class="welcome-content">
            <h1>Welcome!</h1>
            <p>Ready to predict like a pro? Let's start the betting frenzy!</p>
        </div>

        <div class="tablet-welcome-buttons">
            <div class="tablet-login-button button btn-main">Log In</div>
            <div class="tablet-register-button button btn-main">Create Account</div>
        </div>

        <div class="welcome-buttons">
            <div class="login-button button btn-main">Log In</div>
            <div class="register-button button btn-main">Create Account</div>
        </div>
      </div>
    </div>
  `;

  document
    .querySelector(".login-button")
    .addEventListener("click", renderLoginPage);
  document
    .querySelector(".register-button")
    .addEventListener("click", renderRegisterPage);
  document
    .querySelector(".tablet-login-button")
    .addEventListener("click", renderLoginPage);
  document
    .querySelector(".tablet-register-button")
    .addEventListener("click", renderRegisterPage);
}
