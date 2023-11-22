function renderWelcomePage() {
    main.innerHTML = `
        <div class="welcome-container">
            <div class="blurred-background"></div>
            <div class="welcome-text">
                <div class="web-title">GoldenBet</div>
                <div class="welcome-content">
                    <h1>Hello!</h1>
                    <p>Ready to predict like a pro? Let's start the betting frenzy!</p>
                </div>
            </div>
        </div>
        <div class="welcome-buttons">
            <div class="login-button button">Log In</div>
            <div class="register-button button">Create Account</div>
        </div>
    `;

    document.querySelector(".login-button").addEventListener("click", renderLoginPage);
    document.querySelector(".register-button").addEventListener("click",renderRegisterPage);
}
