const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Import crypto for token generation
const User = require("../model/userModel"); // Corrected variable name to 'User'
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    // Generate a random static token
    const token = crypto.randomBytes(16).toString("hex"); // 32-character hex token

    res.status(201).json({ 
        message: "User registered successfully", 
        user: newUser,
        token // Send the token in the response
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }
    
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate a random static token
        const token = crypto.randomBytes(16).toString("hex"); // 32-character hex token

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            token // Send the token in the response
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, loginUser };