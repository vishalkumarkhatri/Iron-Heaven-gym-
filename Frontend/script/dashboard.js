// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    // 🔐 1. Protect Page Access
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || isLoggedIn !== "true") {
        window.location.href = "../pages/login.html";
        return;
    }

    // 🙋 2. Populate Profile Info
    if (user) {
        document.getElementById("profileName").value = user.name;
        document.getElementById("profileEmail").value = user.email;
        document.getElementById("profileOccupation").value = user.occupation?.occupation || "Student";
        document.getElementById("profileCountry").value = user.country?.country || "India";
        // Add more fields as needed
    }

    // 🚪 3. Logout Button Logic
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    }

    // 🧭 4. Profile Dropdown Hover
    const profileMenu = document.getElementById("profileMenu");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileMenu && profileDropdown) {
        profileMenu.addEventListener("mouseenter", () => {
            profileDropdown.style.display = "block";
        });

        profileMenu.addEventListener("mouseleave", () => {
            profileDropdown.style.display = "none";
        });
    }

    // 📜 5. Scroll to Sections
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1); // remove #
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
