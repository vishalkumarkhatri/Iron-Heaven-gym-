// controllers/authController.js
const db = require("../lib/db");


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.json({ success: false, message: "Please fill all fields" });

    db.query("SELECT * FROM users WHERE user_email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB error" });

        if (results.length > 0)
            return res.json({ success: false, message: "Email already exists" });



        db.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)",
            [name, email, password],
            (err) => {
                if (err) return res.status(500).json({ success: false, message: "Insert error" });
                res.json({ success: true, message: "User registered successfully" });
            }
        );
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.json({ success: false, message: "Please fill in all fields" });

    db.query("SELECT * FROM users WHERE user_email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB error" });

        if (results.length === 0) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const user = results[0];

        const isMatch = password === user.user_password;

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }


        // Optionally: send only safe user data
        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email
            }
        });
    });
};

const updateUser = (req, res) => {
    const { name, email, password } = req.body;

    db.query(
        "UPDATE users SET user_name = ?, user_email = ?, user_password = ? WHERE user_id = ?",
        [name, email, password, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Update error" });

            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: "User not found" });

            res.json({ success: true, message: "User updated successfully" });
        }
    );
};

module.exports = { registerUser, loginUser, updateUser };
