window.addEventListener('load', () => {
    const box = document.getElementById('loginBox');
    box.classList.add('loaded');
});

function expandBox() {
    const box = document.getElementById('loginBox');
    box.classList.add('expanded');
    box.classList.add('flicker');
    document.getElementById('mainButtons').style.display = 'none';
    document.getElementById('backButton').style.display = 'block';
}

function goBack() {
    const box = document.getElementById('loginBox');
    box.classList.remove('expanded');
    box.classList.remove('flicker');
    document.getElementById('mainButtons').style.display = 'flex';
    document.getElementById('backButton').style.display = 'none';
    document.getElementById('formContent').innerHTML = '';
}

function openLogin() {
    expandBox();
    document.getElementById('formContent').innerHTML = `
        <h3>Login</h3>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Submit</button>
      `;
}

function openRegister() {
    expandBox();
    document.getElementById('formContent').innerHTML = `
        <h3>Register</h3>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Create Account</button>
      `;
}

function continueGuest() {
    expandBox();
    document.getElementById('formContent').innerHTML = `
        <h3>Guest Access</h3>
        <p style="color:white">You're continuing as a guest!</p>
        <button>Enter</button>
      `;
}