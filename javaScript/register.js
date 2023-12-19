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
      var username = document.querySelector(".username").value;
      var email = document.querySelector(".email").value;
      var password = document.querySelector(".password").value;

      var newUser = {
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
        document.querySelector(".registerErrorMessage").style.color = "white";
        document.querySelector(".registerErrorMessage").textContent =
          "Registration successful";
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
}
