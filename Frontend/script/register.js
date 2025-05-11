// Toast Function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Register Logic
document.getElementById("register-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    showToast("⚠️ Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    console.log("Registration response:", data);

    if (data.success) {
      showToast("✅ Registered successfully!");
      // Optional: Redirect to login after delay
      setTimeout(() => {
        window.location.href = "../pages/login.html";
      }, 1500);
    } else {
      showToast("❌ " + (data.message || "Registration failed"));
    }

  } catch (error) {
    console.error("Registration error:", error);
    showToast("❌ Server error. Try again later.");
  }
});
