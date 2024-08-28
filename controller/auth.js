import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
          return res.status(400).json({ message: "Please enter all fields" });
        }
        const isEmailExisted = await User.findOne({ email });
        if (isEmailExisted) {
          return res.status(400).json({ message: "Email already exists" });
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({
          message: "User created successfully",
          success: true,
          data: user,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    //   jwt
      const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(200).json({
        message: "User logged in successfully",
        success: true,
        data: user,
        token: token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };