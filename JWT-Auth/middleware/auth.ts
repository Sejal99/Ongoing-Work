import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  const token = req?.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    req.user= jwt.verify(token, process.env.JWT_SECRET);
  console.log((req.user));
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
