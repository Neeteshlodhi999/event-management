import { ApiResponse } from "../utils/responsePattern.js";
import userModel from "../models/userModel.js";
import { verifyHash } from "../config/bcrypt.js";
import { generateToken } from "../config/jwt.js";

// login api
export async function authController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiResponse(false, null, "Email and password are required"));
        }

        let user = await userModel.findOne({ email });

        if (!user) return res.status(404).json(new ApiResponse(false, null, "User Not Found"))

        let match = await verifyHash(password, user.password);

        if (!match) return res.status(403).json(new ApiResponse(false, null, "Password Incorrect"))

        let tokenData = {
            id: user._id,
            name: user.name,
            role: user.role
        }

        let token = generateToken(tokenData);

        user = user.toObject();
        user.accessToken = token;

        delete user.password;
        delete user.__v
        delete user.isDeleted

        return res.status(200).json(new ApiResponse(true, user, "login success"))

    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(false, null, "Internal server error"));
    }
}
