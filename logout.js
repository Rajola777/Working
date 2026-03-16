// ================= LABEL ANIMATION & SESSION CHECK =================
window.addEventListener('load', () => {
    const container = document.querySelector('.container');
    const user = localStorage.getItem("crunkUser");

    if (user) {
        // User already logged in → go directly to home
        window.location.href = "home.html";
        return;
    }

    // Show login page only if user not logged in
    container.style.opacity = 1;

    // Animate labels
    const labels = document.querySelectorAll('.form-control label');
    labels.forEach(label => {
        label.innerHTML = label.innerText
            .split('')
            .map((letter, idx) =>
                `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
            )
            .join('');
    });
});

// ================= FIREBASE SETUP =================
const firebaseConfig = {
    apiKey: "AIzaSyBWW5kT1GqpIGou84aOfmo3y0osUd7rRQ",
    authDomain: "zchat-7b59a.firebaseapp.com",
    projectId: "zchat-7b59a",
    storageBucket: "zchat-7b59a.firebasestorage.app",
    messagingSenderId: "391204652656",
    appId: "1:391204652656:web:7c88d2bfb7ca2261ecd6b5",
    measurementId: "G-YB4MSXJ6QC"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ================= FORM LOGIN =================
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!username || !email || !phone) {
        message.innerText = "Please fill all fields.";
        return;
    }

    // Optional: basic email & phone validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        message.innerText = "Enter a valid email.";
        return;
    }
    if (!/^\d{8,15}$/.test(phone)) {
        message.innerText = "Enter a valid phone number.";
        return;
    }

    try {
        const userId = "user_" + Date.now();

        // Save user to Firebase
        await db.collection("users").doc(userId).set({
            username,
            email,
            phone,
            loginMethod: "form",
            createdAt: new Date()
        });

        // Save session locally
        localStorage.setItem("crunkUser", JSON.stringify({ username, email, phone }));

        message.innerText = "Login successful!";
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);

    } catch (err) {
        console.error(err);
        message.innerText = "Error saving user.";
    }
});

// ================= GOOGLE LOGIN =================
function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);

    const user = {
        username: data.name,
        email: data.email,
        picture: data.picture
    };

    // Save session locally
    localStorage.setItem("crunkUser", JSON.stringify(user));

    // Save user to Firebase
    db.collection("users").doc(data.sub).set({
        username: data.name,
        email: data.email,
        picture: data.picture,
        loginMethod: "google",
        createdAt: new Date()
    });

    // Redirect to home
    window.location.href = "home.html";
}

// ================= JWT PARSER =================
function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
