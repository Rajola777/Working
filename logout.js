// ================= Label Animation =================
window.addEventListener('load', ()=>{
    const labels = document.querySelectorAll('.form-control label');

    labels.forEach(label =>{
        label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) =>
            `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
        )
        .join('');
    });
});


// ================= Firebase Setup =================
const firebaseConfig = {
    apiKey: "AIzaSyBWW5kT1GqpIGou84aOfmo3y0osUd7rRQ",
    authDomain: "zchat-7b59a.firebaseapp.com",
    projectId: "zchat-7b59a",
    storageBucket: "zchat-7b59a.firebasestorage.app",
    messagingSenderId: "391204652656",
    appId: "1:391204652656:web:7c88d2bfb7ca2261ecd6b5",
    measurementId: "G-YB4MSXJ6QC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// ================= Form Handling =================
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if(!username || !email || !phone){
        message.innerText = "Please fill all fields.";
        return;
    }

    try{

        // Create simple user id
        const userId = "user_" + Date.now();

        // Save to Firestore
        await db.collection("users").doc(userId).set({
            username: username,
            email: email,
            phone: phone,
            createdAt: new Date()
        });

        // Save session locally
        localStorage.setItem("crunkUser", JSON.stringify({
            username: username,
            email: email,
            phone: phone
        }));

        message.innerText = "Login successful!";

        // Redirect to home
        setTimeout(()=>{
            window.location.href = "index.html";
        },1000);

    }catch(err){

        console.error(err);
        message.innerText = "Error saving user. Try again.";

    }

});
