const User = require("../models/user.js");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
    }
    // Mã hóa password
    const hassed_password = await argon2.hash(password);
    const newUser = new User({ username, email, password: hassed_password });

    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Đăng kí tài khoản không thành công",
        });
      }
      res.status(200).json({
        success: true,
        message: "Đăng kí tài khoản thành công",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đủ thông tin",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    // Check password
    const passwordValidate = await argon2.verify(user.password, password);

    if (!passwordValidate) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    // Create token
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
