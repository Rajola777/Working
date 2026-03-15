// Label animation
window.addEventListener('load', ()=>{
    const labels = document.querySelectorAll('.form-control label');
    labels.forEach(label =>{
        label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
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
const auth = firebase.auth();
const db = firebase.firestore();

let confirmationResult;

// Form handling
const form = document.getElementById('loginForm');
const actionBtn = document.getElementById('actionBtn');
const otpDiv = document.getElementById('otpDiv');
const message = document.getElementById('message');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const otp = document.getElementById('otp').value.trim();

    // Step 1: Send OTP
    if(actionBtn.innerText === "Send OTP"){
        if(phone === ""){
            message.innerText = "Please enter your phone number.";
            return;
        }

        // Setup reCAPTCHA
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => { }
        });

        auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
            .then((res)=>{
                confirmationResult = res;
                message.innerText = "OTP sent! Check your phone.";
                otpDiv.style.display = "block";
                actionBtn.innerText = "Verify OTP";
            })
            .catch((err)=>{
                console.error(err);
                message.innerText = "Error sending OTP. Check phone number.";
            });
    }
    // Step 2: Verify OTP
    else if(actionBtn.innerText === "Verify OTP"){
        if(otp === ""){
            message.innerText = "Please enter OTP.";
            return;
        }

        confirmationResult.confirm(otp)
            .then((result)=>{
                const user = result.user;
                message.innerText = "Phone verified!";

                // Check if user exists in Firestore
                db.collection("users").doc(user.uid).get()
                .then((doc)=>{
                    if(doc.exists){
                        // Existing user → go to home
                        message.innerText = "Welcome back!";
                        window.location.href = "home.html";
                    } else {
                        // New user → save data
                        db.collection("users").doc(user.uid).set({
                            username: username,
                            email: email,
                            phone: phone
                        })
                        .then(()=>{
                            message.innerText = "Account created!";
                            window.location.href = "home.html";
                        });
                    }
                });
            })
            .catch((err)=>{
                console.error(err);
                message.innerText = "Invalid OTP. Try again.";
            });
    }
});
