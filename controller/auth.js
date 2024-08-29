import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

// register user
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

  // Middleware to verify JWT
 export function authenticateToken(req, res, next) {
    const token = req.cookies.authToken;
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

//  login user
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
    //   Cookies
      res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });

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

//   Logout
// Logout route
    export const logoutUser = (req, res) => {
    res.clearCookie('authToken');
    res.send('Logged out');
  };

  // Protected route
    export const protectedRoute =  (req, res) => {
    res.send('This is a protected route');
  };