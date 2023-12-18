async function renderProfilePage(){
    let response = await fetch(`../PHP/getUserData.php?userId=${getUserData().userId}`);

    const userData = await response.json();
    console.log(userData.profilePicture)
    let userProfilePicture;
    if(userData.profilePicture===undefined){
        userProfilePicture="../images/profilePictures/standardPP.jpg"
    }else{
        userProfilePicture=userData.profilePicture;
    }
    main.innerHTML=`
        <div class="profilePageWrapper">
            <div class="backgroundPictureProfile">
                <button class="logoutButton">Logout</button>
                <div class="profilePicAndName">
                    <div class="profilePicture"></div> 
                    <h2 class="profileName">${userData.username}</h2>
                </div>
                
            </div>
            <div class="profileContent"></div>
        </div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `
    document.querySelector(".profilePicture").style.backgroundImage=`url('${userProfilePicture}')`;
    let profileContent=document.querySelector(".profileContent");
    document.querySelector(".logoutButton").addEventListener("click", logoutFromAccount);
    const hiddenPassword = hidePassword(userData.password);
    const isPortrait600px = window.matchMedia('(min-width: 600px) and (orientation: portrait)').matches;
    const isMinWidth600px = window.matchMedia('(min-width: 600px)').matches;
    

    function logoutFromAccount() {
        window.localStorage.removeItem("user");
        renderWelcomePage();
        main.classList.remove("bg-home");
    }

    profileContent.innerHTML=`
            <div class="myBetsWrapper">
                <h2 class="myBets">My Bets</h2>
                <div class="awardsWrapper">
                    <div class="emmysBetButton betButton">Emmys</div>
                    <div class="grammysBetButton betButton">Grammys</div>
                    <div class="oscarsBetButton betButton">Oscars</div>
                </div>
                <div class="awardsContentWrapper"></div>
            </div>
            <div class="settingsContentWrapper">
                <h2>Settings</h2>
                <div class="settingsContainer">
                    <div class="inputBox">
                        <div>Username: </div>
                        <div class="userInfo"><span>${userData.username}</span></div>
                        <div class="editBox">
                            <div class="usernameEdit fa-solid fa-pen"></div>
                        </div>
                    </div>
                    <div class="responsiveContainerUsername responsiveContainer"></div>
                    <div class="inputBox">
                        <div>Email: </div>
                        <div class="userInfo"><span>${userData.email}</span></div>
                        <div class="editBox">
                            <div class="emailEdit fa-solid fa-pen"></div>
                        </div>
                    </div>
                    <div class="responsiveContainerEmail responsiveContainer"></div>
                    <div class="inputBox">
                        <div>Password: </div>
                        <div class="userInfo hiddenPassword">${hiddenPassword}</div>
                        <div class="editBox">
                            <div class="passwordEdit fa-solid fa-pen"></div>
                        </div>
                    </div>
                    <div class="responsiveContainerPassword responsiveContainer"></div>
                    <div class="profilePictureButton">Change profile picture</div>
                    
                </div>
            </div>
        `
        const responsiveContainerUsername=document.querySelector(".responsiveContainerUsername");
        const responsiveContainerEmail=document.querySelector(".responsiveContainerEmail");
        const responsiveContainerPassword=document.querySelector(".responsiveContainerPassword");

        getBets("emmys", userData.userId);
        document.querySelector(".emmysBetButton").addEventListener("click",e=>{getBets("emmys", userData.userId);})
        document.querySelector(".grammysBetButton").addEventListener("click",e=>{getBets("grammys", userData.userId);})
        document.querySelector(".oscarsBetButton").addEventListener("click",e=>{getBets("oscars", userData.userId);})
        document
            .querySelector(".nav-groups")
            .addEventListener("click", () => renderMyGroups(false));
        document
            .querySelector(".nav-awards")
            .addEventListener("click", () => renderAwardsPage(awards));
        document
            .querySelector(".nav-home")
            .addEventListener("click", renderHomePage);
        document.querySelector(".usernameEdit").addEventListener("click", e => {
            if (isPortrait600px || isMinWidth600px) {
                responsiveContainerUsername.innerHTML = `
                    <label class="settingsLabel">Enter new username</label>
                    <input type="text" class="settingsInput inputUsername inputOrder1">
                    <p class="settingsErrorMessage"></p>
                    <div class="settingsButtonsContainer">
                        <button class="settingsButton exitPopup">Cancel</button>
                        <button class="settingsButton settingsButtonUsername">Change username</button>
                    </div>
                `;
                document.querySelector(".exitPopup").addEventListener("click", e=>{responsiveContainerUsername.innerHTML=""})
            } else {
                popup(`
                    <label class="settingsLabel">Enter new username</label>
                    <input type="text" class="settingsInput inputUsername inputOrder1">
                    <p class="settingsErrorMessage"></p>
                    <div class="settingsButtonsContainer">
                        <button class="settingsButton exitPopup">Cancel</button>
                        <button class="settingsButton settingsButtonUsername">Change username</button>
                    </div>
                `);
            }
        
            document.querySelector(".settingsButtonUsername").addEventListener("click", e => {
                const settingsUserID = userData.userId;
                const newUsername = document.querySelector(".inputUsername").value;
                const newUser = {
                    id: settingsUserID,
                    newUsername: newUsername
                };
                changeUser(newUser);
            });
        });
            

        document.querySelector(".emailEdit").addEventListener("click",e=>
        {
            if (isPortrait600px || isMinWidth600px) {
                responsiveContainerEmail.innerHTML = `
                <label class="settingsLabel">Enter new email</label>
                <input type="text" class="settingsInput inputEmail inputOrder1">
                <label class="settingsLabel">Repeat new email</label>
                <input type="text" class="settingsInput inputEmailRepeat inputOrder2">
                <p class="settingsErrorMessage"></p>
                <div class="settingsButtonsContainer">
                    <button class="settingsButton exitPopup">Cancel</button>
                    <button class="settingsButton settingsButtonUsername">Change email</button>
                </div>
                `;
                document.querySelector(".exitPopup").addEventListener("click", e=>{responsiveContainerEmail.innerHTML=""})
            }else {
                popup(`
                    <label class="settingsLabel">Enter new email</label>
                    <input type="text" class="settingsInput inputEmail inputOrder1">
                    <label class="settingsLabel">Repeat new email</label>
                    <input type="text" class="settingsInput inputEmailRepeat inputOrder2">
                    <p class="settingsErrorMessage"></p>
                    <div class="settingsButtonsContainer">
                        <button class="settingsButton exitPopup">Cancel</button>
                        <button class="settingsButton settingsButtonUsername">Change email</button>
                    </div>
                `);
            }
            document.querySelector(".settingsButtonUsername").addEventListener("click", e=>{
                const settingsUserID=userData.userId;
                const newEmail=document.querySelector(".inputEmailRepeat").value;
                const newEmailRepeat=document.querySelector(".inputEmail").value;
                if(newEmail===newEmailRepeat){
                    const newUser = {
                        id:settingsUserID,
                        newEmail: newEmail
                    };
                    changeUser(newUser)
                }else{
                    document.querySelector(".settingsErrorMessage").textContent="Email does not match";
                }
            })
        });

        document.querySelector(".passwordEdit").addEventListener("click",e=>
        {
            if (isPortrait600px || isMinWidth600px) {
                responsiveContainerPassword.innerHTML = `
                <label class="settingsLabel">Enter new password</label>
                <input type="password" class="settingsInput inputPassword inputOrder1">
                <label class="settingsLabel">Repeat new password</label>
                <input type="password" class="settingsInput inputPasswordRepeat inputOrder2">
                <p class="settingsErrorMessage"></p>
                <div class="settingsButtonsContainer">
                    <button class="settingsButton exitPopup">Cancel</button>
                    <button class="settingsButton settingsButtonUsername">Change password</button>
                </div>
                `;
                document.querySelector(".exitPopup").addEventListener("click", e=>{responsiveContainerPassword.innerHTML=""})
            }else {
                popup(`
                <label class="settingsLabel">Enter new password</label>
                <input type="password" class="settingsInput inputPassword inputOrder1">
                <label class="settingsLabel">Repeat new password</label>
                <input type="password" class="settingsInput inputPasswordRepeat inputOrder2">
                <p class="settingsErrorMessage"></p>
                <div class="settingsButtonsContainer">
                    <button class="settingsButton exitPopup">Cancel</button>
                    <button class="settingsButton settingsButtonUsername">Change password</button>
                </div>
                `);
            }
            
            document.querySelector(".settingsButtonUsername").addEventListener("click", e=>{
                const settingsUserID=userData.userId;
                const newPassword=document.querySelector(".inputPasswordRepeat").value;
                const newPasswordRepeat=document.querySelector(".inputPassword").value;
                if(newPassword===newPasswordRepeat){
                    const newUser = {
                        id:settingsUserID,
                        newPassword: newPassword
                    };
                    changeUser(newUser)
                }else{
                    document.querySelector(".settingsErrorMessage").textContent="Password does not match";
                }
            })
        });

        document.querySelector(".profilePictureButton").addEventListener("click",e=>
        {
            popup(`
        <form id="profilePictureForm" method="POST" enctype="multipart/form-data">
            <label for="fileInput" class="PPlabel">Change profile picture</label>
            <input class="changePicture" type="file" id="fileInput" name="pfp">
            <p class="settingsErrorMessagePP"></p>
            <button class="settingsButton exitPopup">Cancel</button>
            <button type="submit" class="profilePictureFormButton">Change profile Picture</button>
        </form>
        `);
            document.getElementById("profilePictureForm").addEventListener("submit", async function(event){
                event.preventDefault();
                let fileForm = document.getElementById("profilePictureForm");
                let fileInput = document.getElementById("fileInput");

                if (fileInput.files.length === 0) {
                    console.log("File input is empty");
                    document.querySelector(".settingsErrorMessagePP").textContent = "Please upload a picture";
                    return;
                }else{
                    const formData = new FormData(fileForm);
                    formData.append("id", userData.userId);
                    console.log(formData);

                    try {

                        const response = await fetch("PHP/settings.php", {
                            method: "POST",
                            body: formData,
                        });

                        if (!response.ok) {
                            console.error("Error in response:", response);

                            const data = await response.json();
                            console.error("Server error:", data.error);
                            document.querySelector(".settingsErrorMessagePP").textContent = data.error;
                        } else {
                            const data = await response.json();
                            console.log("Change successful:", data);
                            document.querySelector(".popup").style.display = 'none';
                            renderProfilePage();
                        }
                    } catch (error) {
                        document.querySelector(".settingsErrorMessagePP").textContent=error;
                    }
                }
            });
        });

    document.querySelector(".fa-user").classList.add("current-page");
    document.querySelector(".text-profile").classList.add("current-page");



}
function hidePassword(password) {
    return '*'.repeat(password.length);
}
function popup(htmlContent){
    document.querySelector(".inputContent").innerHTML=htmlContent;
    document.querySelector(".exitPopup").addEventListener("click", e=>{document.querySelector(".popup").style.display = 'none';})
    document.querySelector(".popup").style.display = 'block';
}
async function getBets(award, userId){
    let response = await fetch(`../PHP/userBettingChoices.php?award=${award}&userId=${userId}`);
    let userBet = await response.json();
    console.log(userBet);

    let awardsBox = document.querySelector(".awardsContentWrapper");
    awardsBox.innerHTML="";
    if(userBet.message){
        awards.forEach(element => {
            if(element.award.toLowerCase()===award){
                element.categories.forEach(category=>{
                    let betContainer=document.createElement("div");
                    betContainer.classList.add("betContainer");
                    betContainer.innerHTML=`
                    <h3 class="betHeader">${category.category}</h3>
                    <p class="betChoice">No Bet</p>
                    `;
                    awardsBox.appendChild(betContainer);
                })
            }
        });
    }else{
        for (let index = 0; index < userBet.length; index++) {
            const betObject = userBet[index];
            if (betObject === userBet[userBet.length - 1]) {
              continue;
            } else {
              let betContainer = document.createElement("div");
              betContainer.classList.add("betContainer");
              betContainer.innerHTML = `
                <h3 class="betHeader">${betObject.category}</h3>
                <p class="betChoice">${betObject.categoryChoice}</p>
              `;
              awardsBox.appendChild(betContainer);
            }
        }
    }
    
    document.querySelectorAll(".betButton").forEach(function(element) {
        element.classList.remove("chosenAward");
    });
    document.querySelector(`.${award}BetButton`).classList.add("chosenAward");
}
async function changeUser(newUser){
    try {
        const response = await fetch("PHP/settings.php", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        });

        const data = await response.json();
        if (!response.ok) {
            document.querySelector(".settingsErrorMessage").textContent = data.error;
        } else {
            console.log("Change successful:", data);
            document.querySelector(".popup").style.display = 'none';
            renderProfilePage()
        }
    } catch (error) {
        console.error("Error during change:", error);
    }
}
