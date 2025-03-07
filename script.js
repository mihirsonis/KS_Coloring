// script.js

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const messageDiv = document.getElementById("message");
  
    // Function to show messages
    function showMessage(msg, type = "info") {
      messageDiv.style.display = "block";
      messageDiv.className = "alert alert-" + type;
      messageDiv.innerText = msg;
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 5000);
    }
  
    // Registration form submission
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        const result = await response.text();
        showMessage(result, response.ok ? "success" : "danger");
      } catch (error) {
        showMessage("Registration failed.", "danger");
      }
    });
  
    // Login form submission
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          const data = await response.json();
          showMessage("Login successful! Token: " + data.token, "success");
          // Save token for future API calls
          localStorage.setItem("token", data.token);
        } else {
          const result = await response.text();
          showMessage("Login failed: " + result, "danger");
        }
      } catch (error) {
        showMessage("Login failed.", "danger");
      }
    });
  });
