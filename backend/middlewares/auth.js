const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "توکن ارسال نشده" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "توکن نامعتبر است" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // اطلاعات کاربر از توکن
    next();
  } catch (err) {
    return res.status(403).json({ message: "توکن نامعتبر یا منقضی شده" });
  }
}

module.exports = verifyToken;
