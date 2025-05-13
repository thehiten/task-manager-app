import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies?.jwt;
  console.log("jwt middleware", token);
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    console.log("Invalid token");
    return res.status(403).send("Access denied. Invalid token.");
  }
  next();
};
