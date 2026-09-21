import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const configured = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (configured) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
}

export async function uploadImage(file, folder) {
    if (!configured || !file?.path) return null;
    try {
        const result = await cloudinary.uploader.upload(file.path, { folder, resource_type: "image" });
        await fs.unlink(file.path).catch(() => {});
        return result.secure_url;
    } catch (error) {
        throw new Error("Unable to upload image to permanent storage.");
    }
}

export const cloudinaryConfigured = configured;
