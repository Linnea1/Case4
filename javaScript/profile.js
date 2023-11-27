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
    let profileAwards=document.querySelector(".profileAwards");
    let profileSettings=document.querySelector(".profileSettings");


    let profileContent=document.querySelector(".profileContent");

    function settingsContent(){
        profileContent.innerHTML=`
            <div class="settingsContentWrapper">
                <div class="settingsContainer">
                    <div class="inputBox">
                        <div>Username: </div>
                        <div><span>${userData.username}</span></div>
                        <div class="editBox">
                            <div class="usernameEdit">edit</div>
                        </div>
                    </div>
                    <div class="inputBox">
                        <div>Email: </div>
                        <div><span>${userData.email}</span></div>
                        <div class="editBox">
                            <div class="emailEdit">edit</div>
                        </div>
                    </div>
                    <div class="inputBox">
                        <div>Password: </div>
                        <div type="password">${userData.password}</div>
                        <div class="editBox">
                            <div class="passwordEdit">edit</div>
                        </div>
                    </div>
                    <label for="fileInput">Change profile picture</label>
                    <input class="changePicture" type="file" id="fileInput" name="fileInput">
                </div>
            </div>
        `
        document.querySelector(".usernameEdit").addEventListener("click",e=>
        {popup(`
            <div class="exitPopup">X</div>
            <input type="text" class="settingsInput inputUsername inputOrder1" placeholder="New username">
            <p class="settingsErrorMessage"></p>
            <button class="settingsButton settingsButtonUsername">Change username</button>
            `
            )
            document.querySelector(".settingsButtonUsername").addEventListener("click", e=>{
                var settingsUserID=userData.userId;
                var newUsername=document.querySelector(".inputUsername").value;
                var newUser = {
                    id:settingsUserID,
                    newUsername: newUsername
                };
                changeUser(newUser)
            })

        });

        document.querySelector(".emailEdit").addEventListener("click",e=>
        {popup(`
            <div class="exitPopup">X</div>
            <input type="text" class="settingsInput inputEmail inputOrder1" placeholder="New email">
            <input type="text" class="settingsInput inputEmailRepeat inputOrder2" placeholder="Repeat new email">
            <p class="settingsErrorMessage"></p>
            <button class="settingsButton settingsButtonUsername">Change email</button>
            `
            )
            document.querySelector(".settingsButtonUsername").addEventListener("click", e=>{
                var settingsUserID=userData.userId;
                var newEmail=document.querySelector(".inputEmailRepeat").value;
                var newEmailRepeat=document.querySelector(".inputEmail").value;
                if(newEmail===newEmailRepeat){
                    var newUser = {
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
        {popup(`
            <div class="exitPopup">X</div>
            <input type="text" class="settingsInput inputPassword inputOrder1" placeholder="New password">
            <input type="text" class="settingsInput inputPasswordRepeat inputOrder2" placeholder="Repeat new password">
            <p class="settingsErrorMessage"></p>
            <button class="settingsButton settingsButtonUsername">Change password</button>
            `
            )
            document.querySelector(".settingsButtonUsername").addEventListener("click", e=>{
                var settingsUserID=userData.userId;
                var newPassword=document.querySelector(".inputPasswordRepeat").value;
                var newPasswordRepeat=document.querySelector(".inputPassword").value;
                if(newPassword===newPasswordRepeat){
                    var newUser = {
                        id:settingsUserID,
                        newPassword: newPassword
                    };
                    changeUser(newUser)
                }else{
                    document.querySelector(".settingsErrorMessage").textContent="Password does not match";
                }
            })
        });
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
    }

    function popup(htmlContent){
        document.querySelector(".inputContent").innerHTML=htmlContent;
        document.querySelector(".exitPopup").addEventListener("click", e=>{document.querySelector(".popup").style.display = 'none';})
        document.querySelector(".popup").style.display = 'block';
    }

    profileAwards.addEventListener("click", awardContent);
    profileSettings.addEventListener("click", settingsContent);
}
