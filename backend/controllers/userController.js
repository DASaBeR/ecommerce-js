import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = createToken(email + password);
      return res.json({
        success: true,
        token: token,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User dosen't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user.id);
      res.json({
        success: true,
        token: token,
      });
    } else {
      res.json({ success: false, msg: "Invalid credentials" });
    }
  } catch (error) {
    onsole.log(error);
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await userModel.findOne({ email })) {
      return res.json({ success: false, msg: "User already exists" });
    }

    //Validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Please enter a strong password",
      });
    }

    //Hash Password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPasswrod = await bcrypt.hashSync(password, salt);

    const newUser = new userModel({
      name: name,
      password: hashedPasswrod,
      email: email,
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

export { login, registerUser };
