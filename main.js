// Firebase Configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// DOM Elements
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const registerLink = document.getElementById("register-link");
const loginLink = document.getElementById("login-link");

// Switch to registration form
registerLink.addEventListener("click", function() {
    loginContainer.style.display = "none";
    registerContainer.style.display = "block";
});

// Switch to login form
loginLink.addEventListener("click", function() {
    loginContainer.style.display = "block";
    registerContainer.style.display = "none";
});

// Register new user
registerButton.addEventListener("click", function() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const username = document.getElementById("username").value;

    // Check if username is taken
    firebase.database().ref("users/" + username).get().then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById("error-message-reg").textContent = "Brukernavnet er allerede tatt.";
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                // Save the username in the database
                firebase.database().ref("users/" + username).set({
                    email: email,
                    userId: user.uid
                });
                alert("Bruker registrert!");
                loginContainer.style.display = "block";
                registerContainer.style.display = "none";
            })
            .catch((error) => {
                document.getElementById("error-message-reg").textContent = error.message;
            });
        }
    });
});

// Login user
loginButton.addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Logget inn!");
        window.location.href = "search.html"; // Redirect to search page after login
    })
    .catch((error) => {
        document.getElementById("error-message").textContent = error.message;
    });
});
