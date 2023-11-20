function renderWelcomePage(){
main.innerHTML=`
    <div class="welcomePageWrapper">
        <div class="welcomePagePicture"></div>
        <div class="welcomePageContentContainer">
            <h1>Hello!</h1>
            <p>Lorem ipsum dolor sit amet consectetur. Phasellus hac est pellentesque elementum massa vel.</p>
            <div class="loginRegisterButtonContainer">
                <div class="loginButton">Log In</div>
                <div class="registerButton">Create Account</div>
            </div>
        </div>
    </div>
`
document.querySelector(".registerButton").addEventListener("click",renderRegisterPage);
}