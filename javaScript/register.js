"use strict";

function renderRegisterPage() {
  main.innerHTML = `
    <div class="backdrop mobile-backdrop">
      <h1 class="goldenbet">GoldenBet</h1>

      <div class="blurred-background-register"></div>

      <div class="register-page black-box">
        <img src="../images/arrow-left.png" alt="arrow-left" class="go-to-welcome-page">
        <div class="register-welcome">
          <h2>Welcome!</h2>
          <p>Create an account to continue</p>
        </div>

        <form class="registration-form">
          <input type="text" class="username registerBox" name="username" placeholder="Username" required><br>
          <input type="text" class="email registerBox" name="email" placeholder="Email" required><br>
          <input type="password" class="password registerBox" name="password" placeholder="Password" required><br>
          <button class="btn-main sendRegisterForm" type="button">Continue</button>
          <p class="registerErrorMessage"></p>
        </form>

        <footer class="alreadyAccount">Already have an account?
          <button>Log In</button>
        </footer>
      </div>
    </div>
  `;

  document
    .querySelector(".go-to-welcome-page")
    .addEventListener("click", () => {
      renderWelcomePage();
    });
  document
    .querySelector(".sendRegisterForm")
    .addEventListener("click", register);
  document
    .querySelector(".alreadyAccount button")
    .addEventListener("click", renderLoginPage);

  async function register() {
    try {
      const username = document.querySelector(".username").value;
      const email = document.querySelector(".email").value;
      const password = document.querySelector(".password").value;

      let newUser = {
        username: username,
        email: email,
        password: password,
        totalPoints: 0,
        groups: [],
      };

      const response = await fetch("PHP/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (!response.ok) {
        document.querySelector(".registerErrorMessage").style.color =
          "rgb(151, 16, 16)";
        document.querySelector(".registerErrorMessage").textContent =
          data.error;
      } else {
        popup(`
          <div class="registrationSuccessfulContainer">
            <h2 class="registrationSuccessful">Registration successful</h2>
            <div class="exitPopup" style="display: none;"></div>
            <button class="settingsButton continueToLogin">Continue to login</button>
          </div>
       `);
        document.querySelector(".continueToLogin").addEventListener("click", e=>{
          renderLoginPage();
          document.querySelector(".popup").style.display = 'none';
        })
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
}
