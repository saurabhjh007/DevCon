const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerController = async (req, res) => {

    console.log("Register controller started");

    const { name, username, email, password } = req.body;

    console.log("Request body:", req.body);

    if (!name || !username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    console.log("Checking existing user...");

    const existingUser = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    console.log("Database query completed");

    if (existingUser) {
        return res.status(400).json({
            message: "Email or username already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    res.status(200).json({
        message: "User validation successful"
    });
};

module.exports = registerController;