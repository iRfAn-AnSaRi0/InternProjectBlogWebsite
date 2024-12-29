import { UserDetails } from "../model/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const GenerateRefreshAndAccessToken = async (user) => {
    const RefreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
    const AccessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

    user.refreshtoken = RefreshToken
    await user.save({ validateBeforeSave: false })

    return { RefreshToken, AccessToken }
}


const Register = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await UserDetails.findOne({ email});
    if (userExists) {
        return res.status(400).json(
            new ApiError(
                400,
                "User Already Exists"
            )
    
        )
    }

    const userCreated = await UserDetails.create({
        username,
        email,
        password
    })

    if (userCreated) {
        return res.status(200).json(
            new ApiResponse(
                200,
                "Register Successfully"
            )
        )
    } else {
        return res.status(500).json(
            new ApiError(
                500,
                "Internal Server Error"
            )
        )
    }

})


const Login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserDetails.findOne({ email });

    if (!user) {
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid email"
            )
        )
    }


    const passwordcheck = await bcrypt.compare(password, user.password)

    if (!passwordcheck) {
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid password"
            )
        )
    }

    const { RefreshToken, AccessToken } = await GenerateRefreshAndAccessToken(user);

    const option = {
        httpOnly: true,
        // secure:true
        
    }

    return res.status(200)
        .cookie("RefreshToken", RefreshToken, option)
        .cookie("AccessToken", AccessToken, option)
        .json(
            new ApiResponse(
                200,
                { RefreshToken, AccessToken },
                "Login Successfully"
            )
        )

})

const GetUser = AsyncHandler(async (req, res) => {
    const user = req.user;

    return res.status(200).json(
        new ApiResponse(
            200,
            "Current User : ",
            user
        )
    )

})

const Logout = AsyncHandler(async (req, res) => {
    await UserDetails.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshtoken: undefined
            }
        },
        {
            new: true
        }
    )

    const Option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("RefreshToken", Option)
        .clearCookie("AccessToken", Option)
        .json(
            new ApiResponse(
                200,
                "Logout Successfully"
            )
        )
})

const RefreshTheToken = AsyncHandler(async (req, res) => {
    const IncomingRefreshToken = req.cookies.RefreshToken || req.body.RefreshToken
    if (!IncomingRefreshToken) {
        return res.status(401)
            .json(
                new ApiError(
                    401,
                    "Unauthorized Access"
                )
            )
    }

    const Decode = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

   
   
    

    const user = await UserDetails.findById(Decode.id);
    
    

    if (!user) {
        throw new ApiError(401, "Invalid Refresh token")
    }


    if (IncomingRefreshToken !== user?.refreshtoken) {
        throw new ApiError(401, "Refresh token is expire")
    }

    const Option = {
        httpOnly: true,
        secure: true
    }

    const { RefreshToken, AccessToken } = await GenerateRefreshAndAccessToken(user)

    return res.status(200).cookie("RefreshToken", RefreshToken, Option).cookie("AccessToken", AccessToken, Option).json(
        new ApiResponse(
            200, {}
        )
    )
})

export { Register, Login, GetUser, Logout, RefreshTheToken }