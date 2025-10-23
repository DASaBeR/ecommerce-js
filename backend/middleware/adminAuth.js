import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized, Please Login.",
      });
    }
    const token_decod = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decod);
    
    if (token_decod.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized, Please Login.",
      });
    }
    next();
  } catch (error) {
    onsole.log(error);
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};


export default adminAuth;
