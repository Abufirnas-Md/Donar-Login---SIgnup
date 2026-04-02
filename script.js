function showRegister() {
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
}

function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("registerForm").classList.add("hidden");
}

// Generate random username & password
function generateCredentials() {
    let username = "user" + Math.floor(Math.random() * 10000);
    let password = Math.floor(100000 + Math.random() * 900000);
    return { username, password };
}

function registerUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (!name || !email || !phone) {
        alert("Fill all fields");
        return;
    }

    let creds = generateCredentials();

    // Store in localStorage
    localStorage.setItem("username", creds.username);
    localStorage.setItem("password", creds.password);

    let credDiv = document.getElementById("credentials");
    credDiv.classList.remove("hidden");
    credDiv.innerHTML = `
        <b>Your Credentials (Valid for 10 sec):</b><br>
        Username: ${creds.username}<br>
        Password: ${creds.password}
    `;

    // Hide after 10 seconds
    setTimeout(() => {
        credDiv.innerHTML = "Credentials expired. Please remember them!";
    }, 10000);
}

function loginUser() {
    let enteredUser = document.getElementById("loginUser").value;
    let enteredPass = document.getElementById("loginPass").value;

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if (enteredUser === storedUser && enteredPass === storedPass) {
        window.location.href = "https://abufirnas-md.github.io/Filling-Page/";
    } else {
        document.getElementById("loginMsg").innerText = "Invalid credentials!";
    }
}
