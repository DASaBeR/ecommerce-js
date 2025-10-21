import userModel from "../models/userModel.js";
import validator from "validator";
import bycript from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) => {

    return jwt.sign({id}, process.env.JWT_SECRET);
    
}

// Route for user login
const loginUser = async (req, res) => {};

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
    const salt = await bycript.genSaltSync(saltRounds);
    const hashedPasswrod = await bycript.hashSync(password, salt);

    const newUser = new userModel({
        name: name,
        password: hashedPasswrod,
        email: email
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({
        success: true,
        token: token
      });

  } catch (error) {
    console.log(error);
    return res.json({
        success: false,
        msg: error.message,
      });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
