const express = require('express');
const router = express.Router()

const {registerUser , deleteUser , updateUsers , loginUser} = require("../Controller/userController")

router.route("/register").post(registerUser);
router.route("/register/:id").delete(deleteUser).put(updateUsers)

router.route("/login").post(loginUser);

module.exports = router