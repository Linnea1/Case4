function renderRegisterPage(){
    
    main.innerHTML=`
    <div class="registerPageWrapper">
        <div class="registerGoBack">←</div>
        <div class="registerTextContainer">
            <h1>Hi!</h1>
            <p>Create an account to continue</p>
        </div>
        <form id="registrationForm">
            <input type="text" class="username" name="username" placeholder="Username" required><br>
            <input type="text" class="email" name="email" placeholder="Email" required><br>
            <input type="password" class="password" name="password" placeholder="Password" required><br>

            <button class="sendRegisterForm" type="button">Continue</button>
        </form>
    </div>
    `
    document.querySelector(".sendRegisterForm").addEventListener("click", register);
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
            groups: []
          };
      
          const response = await fetch("PHP/register.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
      
          const data = await response.json();
          console.log("Registration successful:", data);
        } catch (error) {
          console.error("Error during registration:", error);
        }
    }

}