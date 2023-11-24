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
    <nav class="sticky-nav">${stickyNav()}</nav>
    `
    let profileTeams=document.querySelector(".profileTeams");
    let profileAwards=document.querySelector(".profileAwards");
    let profileSettings=document.querySelector(".profileSettings");


    let profileContent=document.querySelector(".profileContent");

    function settingsContent(){
        profileContent.innerHTML=`
            <div class="settingsContentWrapper">
                <div class="settingsContainer">
                    <div class="inputBox">
                        <p>Username:</p>
                        <p><span>${userData.username}</span></p>
                        <div class="editBox">
                            <div class="usernameEdit">edit</div>
                        </div>
                    </div>
                    <div class="inputBox">
                        <p>Email: </p>
                        <p><span>${userData.email}</span></p>
                        <div class="editBox">
                            <div class="emailEdit">edit</div>
                        </div>
                    </div>
                    <div class="inputBox">
                        <p>Password: </p>
                        <p type="password">${userData.password}</p>
                        <div class="editBox">
                            <div class="passwordEdit">edit</div>
                        </div>
                    </div>
                </div>
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
