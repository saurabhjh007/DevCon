const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password, 
        user.password
    )

    if(!isPasswordCorrect){
        return res.status(401).json({
            message : "invalid email or password"
        });
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
    );

    return res.status(200).json({
        message : "login succesful",
        token
    });
};

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
    console.log("password hashed");

    const newUser = await User.create({
        name,
        username,
        email,
        password : hashedPassword    
    });

    console.log("user created");


    console.log("Hashed password:", hashedPassword);

    return res.status(201).json({
        message: "User registered successful",
        user : {
            id : newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email
        }
    });

};

module.exports = {
    registerController,
    loginController
};