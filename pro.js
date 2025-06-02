const firebaseConfig = {
  apiKey: "AIzaSyAo1p1gS6p1_cIZF1pn9_20iVrQAAeokkA",
  authDomain: "internship-81ea1.firebaseapp.com",
  projectId: "internship-81ea1",
  appId: "1:39039691101:web:f8e0b38ac13dc065dc20b4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    
    document.getElementById("username").textContent = user.displayName || "N/A";
    document.getElementById("email").textContent = user.email;
    document.getElementById("uid").textContent = user.uid;
  } else {
    
    window.location.href = "login.html";
  }
});


function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
