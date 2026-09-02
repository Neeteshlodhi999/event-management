import { ApiResponse } from "../utils/responsePattern.js";

export function roleMiddleware(...roles) {
    return (req, res, next) => {
        let match = roles.includes(req.user.role);
        if (!match) return res.status(401).json(new ApiResponse(false, null, "Access Denied"))
        next()
    }
}