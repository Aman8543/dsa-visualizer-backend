const express = require("express");
const userRouter = express.Router();
const {userRegister, userLogin , userLogout ,userDelete ,userCheck}= require("../src/register")
const usermidleware = require("../middleware/userMiddleware");

userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
userRouter.post("/logout",usermidleware,userLogout);
userRouter.post("/delete",usermidleware, userDelete);
userRouter.post("/check",usermidleware, userCheck);
module.exports = userRouter;