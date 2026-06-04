const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const isUserAlreadyPresent = await userModel.findOne({
      email: req.body.email,
    });

    if (isUserAlreadyPresent) {
      return res.status(200).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const LoginController = async (req, res) => {
  try {
    const {email,password,role}= req.body;
    const IsUserPresent = await userModel.findOne({ email: req.body.email });
    if (!IsUserPresent) {
      return res.status(404).json({ message: "User not found" });
    }
    if (IsUserPresent.role !== role) {
      return res.status(401).json({ 
        message: `Invalid credentials` 
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      IsUserPresent.password,
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: IsUserPresent._id }, 
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: IsUserPresent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getCurrentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    return res.status(200).json({
      message: "Current user fetched successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: " Unable to get current user",
      error: error.message,
    });
  }
};
module.exports = {
  registerController,
  LoginController,
  getCurrentUserController,
};
