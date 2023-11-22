function renderRegisterPage(){
    
    main.innerHTML=`
    <div class="registerPageWrapper">
        <div><i class="fa-solid fa-arrow-left"></i></div>
        <div class="registerTextContainer">
            <h1>Hi!</h1>
            <p>Create an account to continue</p>
        </div>
        <form id="registrationForm">
            <input type="text" class="username registerBox" name="username" placeholder="Username" required><br>
            <input type="text" class="email registerBox" name="email" placeholder="Email" required><br>
            <input type="password" class="password registerBox" name="password" placeholder="Password" required><br>

            <p class="registerErrorMessage"></p>
            <button class="btn-main sendRegisterForm" type="button">Continue</button>
        </form>
        <footer class="alreadyAccount">Already have an account?
          <button>Log In</button>
        </footer>
    </div>
  document.querySelector(".fa-arrow-left").addEventListener("click", renderWelcomePage);
  document.querySelector(".alreadyAccount button").addEventListener("click", renderLoginPage);
}