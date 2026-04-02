import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    sendSignInLinkToEmail, 
    isSignInWithEmailLink, 
    signInWithEmailLink 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ---------------------------
// 1. Firebase Config
// ---------------------------
const firebaseConfig = {
    apiKey: "AIzaSyB1VNWIXYxU4DCkVNGjLNCBNRX1PVpP3Yk,
    authDomain: "one-time-password-2359f.firebaseapp.com",
    projectId: "one-time-password-2359f",
    storageBucket: "one-time-password-2359f.firebasestorage.app",
    messagingSenderId: "982403511017",
    appId: "1:982403511017:web:d42342e0f04f456c43f678",
    measurementId: "G-RTPN1FJ2Y3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// ---------------------------
// 2. Send OTP to Email
// ---------------------------
window.sendOTP = function () {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;

    if (!email || !name) {
        document.getElementById("msg").innerHTML = "Enter name & email!";
        return;
    }

    const actionCodeSettings = {
        url: window.location.href, // same page will catch OTP link
        handleCodeInApp: true
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            localStorage.setItem("emailForSignIn", email);
            localStorage.setItem("donorName", name);
            document.getElementById("msg").innerHTML = "OTP sent to your email!";
        })
        .catch((error) => {
            document.getElementById("msg").innerHTML = error.message;
        });
};

// ---------------------------
// 3. Verify OTP when donor clicks email link
// ---------------------------
if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = localStorage.getItem("emailForSignIn");

    signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {

            // save donor details
            const uid = result.user.uid;

            await setDoc(doc(db, "donors", uid), {
                name: localStorage.getItem("donorName"),
                email: email,
                createdAt: new Date()
            });

            // redirect to submit-donation page
            window.location.href = "submit-donation.html";
        })
        .catch((error) => {
            console.log(error);
        });
}
