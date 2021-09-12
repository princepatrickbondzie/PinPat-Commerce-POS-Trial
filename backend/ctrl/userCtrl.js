const User = require("../model/User");
// const role = require("../role");

const getUsers = async (req, res) => {
  const user = await User.find();
  res.status(200).json({ user });
};

const getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401);
  }
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
