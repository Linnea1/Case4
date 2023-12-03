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
            <div class="profilePicture"></div> 
            <h2 class="profileName"><span>${userData.username}</span></h2>
        </div>
        <div class="profileContent"></div>
        <div class="profileNavigationBar"></div>
    </div>
    <nav class="sticky-nav">${stickyNav()}</nav>
    `
    document.querySelector(".profilePicture").style.backgroundImage=`url('${userProfilePicture}')`;
    let profileContent=document.querySelector(".profileContent");

    function settingsContent(){
        profileContent.innerHTML=`
            <div class="settingsContentWrapper">
                <div class="settingsContainer">
                    <div class="inputBox">
                        <div>Username: </div>
                        <div><span>${userData.username}</span></div>
                        <div class="editBox">
                            <div class="usernameEdit fa-solid fa-pen"></div>
                        </div>
                    </div>
                    <div class="inputBox">
                        <div>Email: </div>
                        <div><span>${userData.email}</span></div>
                        <div class="editBox">
                            <div class="emailEdit fa-solid fa-pen"></div>
                        </div>
                    </div>
                    <div class="inputBox">
                        <div>Password: </div>
                        <div type="password">${userData.password}</div>
                        <div class="editBox">
                            <div class="passwordEdit fa-solid fa-pen"></div>
                        </div>
                    </div>
                    <div class="profilePictureButton">Change profile picture</div>
                </div>
            </div>
        `
        document.querySelector(".usernameEdit").addEventListener("click",e=>
        {popup(`
            <div class="exitPopup">x</div>
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
            <div class="exitPopup">x</div>
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
            <div class="exitPopup">x</div>
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

        document.querySelector(".profilePictureButton").addEventListener("click",e=>
        { 
            popup(`
        <div class="exitPopup">x</div>
        <form id="profilePictureForm" method="POST" enctype="multipart/form-data">
            <label for="fileInput">Change profile picture</label>
            <input class="changePicture" type="file" id="fileInput" name="pfp">
            <button type="submit" class="profilePictureFormButton">Change profile Picture</button>
        </form>
        `); 
            document.getElementById("profilePictureForm").addEventListener("submit", async function(event){
                event.preventDefault();
                let fileForm = document.getElementById("profilePictureForm");
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
                        document.querySelector(".settingsErrorMessage").textContent = data.error;
                    } else {
                        const data = await response.json();
                        console.log("Change successful:", data);
                        document.querySelector(".popup").style.display = 'none';
                        renderProfilePage();
                    }
                } catch (error) {
                    console.error("Error during change:", error);
                }
                
            });
        });
    
       
    }

    document.querySelector(".fa-user").classList.add("current-page");
    document.querySelector(".text-profile").classList.add("current-page");

    settingsContent();

}
function popup(htmlContent){
    document.querySelector(".inputContent").innerHTML=htmlContent;
    document.querySelector(".exitPopup").addEventListener("click", e=>{document.querySelector(".popup").style.display = 'none';})
    document.querySelector(".popup").style.display = 'block';
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

