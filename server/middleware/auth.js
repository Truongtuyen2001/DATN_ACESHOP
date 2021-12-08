const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Không tìm thấy token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Token không hợp lệ",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.userId.role === 0) {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền",
    });
  }
  next();
};
