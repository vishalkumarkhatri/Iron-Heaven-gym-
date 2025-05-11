document.addEventListener("DOMContentLoaded", () => {
  // Toast Function
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  // Populate profile fields
  document.getElementById("name").value = user.name || "";
  document.getElementById("email").value = user.email || "";


  // Handle update
  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    try {
      const response = await fetch(`http://localhost:8080/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      });

      const data = await response.json();

      if (response.ok) {
        // Merge updated data into localStorage
        const newUser = { ...user, ...updatedUser };
        localStorage.setItem("user", JSON.stringify(newUser));
        // alert("Profile updated successfully!");
        showToast(data.message || "Profile updated successfully!");
        setTimeout(() => {
          window.location.href = "../pages/dashboard.html";
        }, 1500);

      } else {
        // alert(data.message || "Failed to update profile");
        showToast(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("Something went wrong while updating profile.");
      showToast("Something went wrong while updating profile.");
    }
  });

  // Go back to dashboard
  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
});
