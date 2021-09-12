const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, phone, password, staff, isAdmin } = req.body;

  if (!fullName || !email || !phone || !password) {
    res.status(400).json({ message: "All fields required" });
    return;
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400).json({ message: "Email already exist." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    fullName,
    email,
    phone,
    staff,
    password: hashedPassword,
    // confirmPassword,
    role: isAdmin && "admin",
  });

  await user.save();
  res.json({
    data: user,
  });
  res.status(201).json({ user });
};

//-----LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      res.status(400).json({ message: "Please enter all fields" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalide credentials" });
    }

    const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });
    user = user.toObject();
    delete user.password;
    delete user.__v;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

//TOKEN
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "123456789");
    req.user = decodedToken.id;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Staff Registeration
const registerStaff = async (req, res) => {
  const { username, email, phone, pin } = req.body.staff;
  const staff = await Staff.create({
    username,
    email,
    phone,
    staff,
    pin,
  });
};

module.exports = { register, login, verifyToken, refreshToken, logout };
