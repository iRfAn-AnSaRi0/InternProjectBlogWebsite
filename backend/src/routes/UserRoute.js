import { Router } from "express";
import { Register } from "../controller/UserController.js"
import { Login } from "../controller/UserController.js"
import { GetUser } from "../controller/UserController.js"
import { Logout } from "../controller/UserController.js"
import { VerifyUser } from "../middleware/AuthMiddleware.js"
import { RefreshTheToken } from "../controller/UserController.js";

const userrouter = Router();

userrouter.route("/signup").post(
    Register
)

userrouter.route("/login").post(
    Login
)
userrouter.route("/me").get(
    VerifyUser, GetUser
)
userrouter.route("/logout").post(
    VerifyUser, Logout
)
userrouter.route("/refreshtoken").post(
    RefreshTheToken
)

export { userrouter }
