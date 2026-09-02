import userModel from "../models/userModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import { generateHash, verifyHash } from "../config/bcrypt.js"

export async function getUsers(req, res, next) {
    try {

        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 25;
        let skip = page === 1 ? 0 : (page - 1) * limit

        let users = await userModel.find().skip(skip).limit(limit);

        return res.status(200).json(new ApiResponse(true, users, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function registerUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json(new ApiResponse(false, null, "name , password and Email is required"));
        }

        let hash = await generateHash(password);

        const newUser = await userModel.create({ name, email, password: hash });

        return res.status(201).json(new ApiResponse(true, newUser, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function updateUser(req, res, next) {
    try {
        const { userId } = req.params;
        const { name, phone, gender, } = req.body;

        if (!name || !phone || !gender) {
            return res.status(400).json(new ApiResponse(false, null, "name , gender and phone is required"));
        }

        const upUser = await userModel.findByIdAndUpdate(userId, { name, gender, phone }, { returnDocument: "after", runValidators: true });


        if (upUser) return res.status(200).json(new ApiResponse(true, upUser, "success"))

        return res.status(404).json(new ApiResponse(true, null, "User Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteUser(req, res, next) {
    try {
        const { userId } = req.params;

        const delUser = await userModel.findByIdAndDelete(userId, { returnDocument: "after" });

        if (delUser) return res.status(200).json(new ApiResponse(true, delUser, "deleted success"))

        return res.status(404).json(new ApiResponse(true, null, "User Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

// change password
export async function changePassword(req, res, next) {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json(new ApiResponse(false, null, "old Password and new Password is required"));
        }

        let match = await verifyHash(oldPassword, req.user.password);

        if (!match) return res.status(403).json(new ApiResponse(false, null, "Password Incorrect"));

        let hash = await generateHash(newPassword);

        const updatePass = await userModel.findByIdAndUpdate(req.user._id, { password: hash });

        return res.status(201).json(new ApiResponse(true, updatePass, "password changed success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function getMyProfile(req, res, next) {
    try {
        const User = await userModel.findById(req.user._id).select("-password -__v");

        if (User) return res.status(200).json(new ApiResponse(true, User, "profile success"))

        return res.status(404).json(new ApiResponse(true, null, "User Not Found"))
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function updateMyProfile(req, res) {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email) {
            return res.status(400).json(new ApiResponse(false, null, "Name and email are required"));
        }

        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { name, email, phone: phone || undefined },
            { new: true, runValidators: true }
        ).select("-password -__v");

        return res.status(200).json(new ApiResponse(true, user, "Profile updated"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, error.message || "Unable to update profile"));
    }
}

export async function updateProfilePhoto(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiResponse(false, null, "Profile image is required"));
        }

        const image = `${req.protocol}://${req.get("host")}/uploads/user-images/${req.file.filename}`;
        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { image },
            { new: true, runValidators: true }
        ).select("-password -__v");

        return res.status(200).json(new ApiResponse(true, user, "Profile photo updated"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"));
    }
}
