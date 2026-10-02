import userModel from "../models/userModel.js";
import { ApiResponse } from "../utils/responsePattern.js";
import { generateHash, verifyHash } from "../config/bcrypt.js"
import { uploadImage } from "../config/cloudinary.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../config/mailer.js";

export async function getUsers(req, res, next) {
    try {

        let page = req.query.page || 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 25;
        let skip = page === 1 ? 0 : (page - 1) * limit

        let users = await userModel.find({ isDeleted: { $ne: true } })
            .select("-password -passwordResetToken -passwordResetExpires -__v")
            .skip(skip)
            .limit(limit);

        return res.status(200).json(new ApiResponse(true, users, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function registerUser(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!name || !normalizedEmail || !password) {
            return res.status(400).json(new ApiResponse(false, null, "name , password and Email is required"));
        }

        const existingUser = await userModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json(new ApiResponse(false, null, "An account with this email already exists. Please log in."));
        }

        let hash = await generateHash(password);

        const newUser = await userModel.create({ name: name.trim(), email: normalizedEmail, password: hash });

        const safeUser = newUser.toObject();
        delete safeUser.password;
        delete safeUser.__v;
        return res.status(201).json(new ApiResponse(true, safeUser, "success"))

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

        const upUser = await userModel.findByIdAndUpdate(
            userId,
            { name, gender, phone },
            { returnDocument: "after", runValidators: true }
        ).select("-password -passwordResetToken -passwordResetExpires -__v");


        if (upUser) return res.status(200).json(new ApiResponse(true, upUser, "success"))

        return res.status(404).json(new ApiResponse(true, null, "User Not Found"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteUser(req, res, next) {
    try {
        const { userId } = req.params;

        const delUser = await userModel.findByIdAndDelete(userId)
            .select("-password -passwordResetToken -passwordResetExpires -__v");

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

        await userModel.findByIdAndUpdate(req.user._id, { password: hash });

        return res.status(200).json(new ApiResponse(true, null, "password changed success"))

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
        const normalizedEmail = email?.trim().toLowerCase();

        if (!name || !normalizedEmail) {
            return res.status(400).json(new ApiResponse(false, null, "Name and email are required"));
        }

        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { name: name.trim(), email: normalizedEmail, phone: phone || undefined },
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

        const image = await uploadImage(req.file, "eventhub/profiles")
            || `${req.protocol}://${req.get("host")}/uploads/user-images/${req.file.filename}`;
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

export async function requestPasswordReset(req, res) {
    try {
        const email = req.body.email?.trim().toLowerCase();
        // Always use the same response for unknown accounts to protect privacy.
        if (!email) return res.status(200).json(new ApiResponse(true, null, "If an account exists, a reset link has been sent."));

        const user = await userModel.findOne({ email }).select("+passwordResetToken +passwordResetExpires");
        if (!user) return res.status(200).json(new ApiResponse(true, null, "If an account exists, a reset link has been sent."));

        const rawToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
        await user.save({ validateBeforeSave: false });

        const isAdmin = user.role === "admin";
        const appUrl = (
            isAdmin
                ? process.env.ADMIN_CLIENT_URL || "https://event-management-admin-2fra.onrender.com"
                : process.env.CLIENT_URL || "https://event-management-user-qfum.onrender.com"
        ).replace(/\/$/, "");
        const resetUrl = isAdmin
            ? `${appUrl}/#/admin/reset-password?token=${rawToken}`
            : `${appUrl}/reset-password?token=${rawToken}`;
        try {
            await sendPasswordResetEmail({ to: user.email, resetUrl });
        } catch (emailError) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            throw emailError;
        }

        return res.status(200).json(new ApiResponse(true, null, "If an account exists, a reset link has been sent."));
    } catch (error) {
        return res.status(503).json(new ApiResponse(false, null, error.message || "Unable to send reset email"));
    }
}

export async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { password } = req.body;
        if (!password || password.length < 6) {
            return res.status(400).json(new ApiResponse(false, null, "New password must be at least 6 characters"));
        }

        const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await userModel.findOne({ passwordResetToken, passwordResetExpires: { $gt: new Date() } }).select("+passwordResetToken +passwordResetExpires");
        if (!user) return res.status(400).json(new ApiResponse(false, null, "This reset link is invalid or has expired"));

        user.password = await generateHash(password);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return res.status(200).json(new ApiResponse(true, null, "Password reset successfully. You can now log in."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, error.message || "Unable to reset password"));
    }
}
