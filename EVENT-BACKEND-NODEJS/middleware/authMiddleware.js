import { verifyToken } from "../config/jwt.js";
import userModel from "../models/userModel.js";
import { ApiResponse } from "../utils/responsePattern.js";

export async function authMiddleware(req, res, next) {
    try {
        let headers = req && req.headers;

        let token = headers && headers?.authorization?.split(" ")[1];

        if (!token) return res.status(401).json(new ApiResponse(false, null, "token not found"));

        let tokenData = verifyToken(token);

        if (!tokenData) return res.status(401).json(new ApiResponse(false, null, "Invalid token"));

        let user = await userModel.findById(tokenData.id);

        if (!user || user.isDeleted) return res.status(401).json(new ApiResponse(false, null, "user Not found or Deleted"));

        user = user.toObject();

        delete user.__v
        
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(false, null, "Internal server Error"));
    }

}