const firebaseConfig = {
  apiKey: "AIzaSyAo1p1gS6p1_cIZF1pn9_20iVrQAAeokkA",
  authDomain: "internship-81ea1.firebaseapp.com",
  projectId: "internship-81ea1",
  appId: "1:39039691101:web:f8e0b38ac13dc065dc20b4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Notification
function showSnackbar(message, color = "#333") {
  let snackbar = document.getElementById("snackbar");

  if (!snackbar) {
    snackbar = document.createElement("div");
    snackbar.id = "snackbar";
    document.body.appendChild(snackbar);
  }

  snackbar.textContent = message;
  snackbar.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${color};
    color: #fff;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  requestAnimationFrame(() => {
    snackbar.style.opacity = '1';
  });

  setTimeout(() => {
    snackbar.style.opacity = '0';
    setTimeout(() => snackbar.remove(), 300);
  }, 2500);
}

// 🔐 Login Handler
const loginBtn = document.querySelector(".btn-primary[onclick='redirectToProfile()']");
if (loginBtn) {
  window.redirectToProfile = () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      showSnackbar("Please enter both email and password.", "#e63946");
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        showSnackbar("✅ Login successful!", "#207CEB");
        setTimeout(() => window.location.href = "pro.html", 1500);
      })
      .catch((err) => {
        let message = "Something went wrong.";
        if (err.code === 'auth/user-not-found') {
          message = "User not found.";
        } else if (err.code === 'auth/wrong-password') {
          message = "Incorrect password.";
        } else if (err.code === 'auth/invalid-email') {
          message = "Invalid email format.";
        }
        console.error("Login Error:", err.message);
        showSnackbar(message, "#e63946");
      });
  };
}


const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!username || !email || !password) {
      showSnackbar("Please fill in all fields.", "#e63946");
      return;
    }

    try {
      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      await userCred.user.updateProfile({ displayName: username });

      showSnackbar("🎉 Successfully registered!", "#207CEB");
      setTimeout(() => window.location.href = "pro.html", 1500);
    } catch (err) {
      let message = "Signup failed.";
      if (err.code === 'auth/email-already-in-use') {
        message = "Email is already registered.";
      } else if (err.code === 'auth/weak-password') {
        message = "Password should be at least 6 characters.";
      } else if (err.code === 'auth/invalid-email') {
        message = "Invalid email address.";
      }
      console.error("Signup Error:", err.message);
      showSnackbar(message, "#e63946");
    }
  });
}
