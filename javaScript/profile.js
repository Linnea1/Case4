function renderProfilePage(){
    let storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);

    main.innerHTML=`
    <div class="profilePageWrapper">
        <div class="backgroundPictureProfile">
            <div class="avatar"></div>
            <div class="profileName"></div>
            <div class="profileButtons">
                <div class="profileTeams button">My Teams</div>
                <div class="profileAwards button">Awards</div>
                <div class="profileSettings button active">Settings</div>
            </div>
        </div>
        <div class="profileContent"></div>
        <div class="profileNavigationBar"></div>
    </div>
    `
    let profileTeams=document.querySelector(".profileTeams");
    let profileAwards=document.querySelector(".profileAwards");
    let profileSettings=document.querySelector(".profileSettings");

    let profileContent=document.querySelector(".profileContent");

    function settingsContent(){
        profileContent.innerHTML=`
            <div class="settingsContentWrapper">
                <form id="settingsForm">
                    <label for="username">Username:</label>
                    <input type="text" class="username registerBox" name="username" placeholder="Username" required><br>

                    <label for="email">Email:</label>
                    <input type="text" class="email registerBox" name="email" placeholder="Email" required><br>

                    <label for="password">Password:</label>
                    <input type="password" class="password registerBox" name="password" placeholder="Password" required><br>

                    <button class="sendRegisterForm" type="button">Save</button>
                </form>
            </div>
        `
    }

    function awardContent(){
        profileContent.innerHTML=`
            <div class="awardContentWrapper">
                <div>Emmys</div>
                <div>Grammys</div>
                <div>Oscar</div>
            </div>
        `
    }

    profileTeams.addEventListener("click", () => {
      teamContent(profileContent);
    });
    profileAwards.addEventListener("click", awardContent);
    profileSettings.addEventListener("click", settingsContent);

    settingsContent();
}
