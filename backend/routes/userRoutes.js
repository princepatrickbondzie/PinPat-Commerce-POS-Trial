const router = require("express").Router();
const userCtrl = require("../Ctrl/userCtrl");
const { verifyToken } = require("../Ctrl/authCtrl");

router.get("/users", userCtrl.getUsers);
router.get("/user/:id", verifyToken, userCtrl.getUser);
router.patch("/user/:id", verifyToken, userCtrl.updateUser);
router.delete("/user/:id", verifyToken, userCtrl.deleteUser);

module.exports = router;