const express = require('express');
// const JWTDecoder = require('../utils/JWTDecoder');
// const app = express();
const router = express.Router();

const {Login,  Register, ActivateAccount} = require("../controllers/UserController");

router.post("/login", Login);

router.post("/register", Register);

router.get("/activate/:id", ActivateAccount)

module.exports = router;
