import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export const verifyJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded.username;
  } catch (error) {
    return res.status(401).json({ message: "Access denied. Invalid token." });
  }
  next();
};
