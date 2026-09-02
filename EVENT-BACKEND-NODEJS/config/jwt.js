import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10d" })
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        return false;
    }
}   
