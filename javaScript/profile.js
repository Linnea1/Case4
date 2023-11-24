async function renderProfilePage(){
    let response = await fetch(`../PHP/getUserData.php?userId=${getUserData().userId}`);

    const userData = await response.json();
    console.log(userData.profilePicture)
    main.innerHTML=`
    <div class="profilePageWrapper">
        <div class="backgroundPictureProfile">
            <img class="profilePicture" src=${userData.profilePicture} alt="Standard Avatar"> 
            <h2 class="profileName"><span>${userData.username}</span></h2>
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

    settingsContent();
}
