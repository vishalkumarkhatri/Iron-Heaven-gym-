// Toast Function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Login Logic
document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log("Login response:", data);

    if (data.success) {
      showToast(data.message);
      // Save user info if needed
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "../pages/dashboard.html";
      }, 1500);
    } else {
      showToast("❌ " + (data.message || "Login failed"));
    }

  } catch (error) {
    console.error("Login error:", error);
    showToast("❌ Server error. Try again later.");
  }
});
