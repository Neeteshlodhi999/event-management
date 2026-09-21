import { connect } from "mongoose";
import dotenv from 'dotenv';
import userModel from "../models/userModel.js";
import { generateHash } from "./bcrypt.js";
dotenv.config();

export default async function dbConnect() {
    try {
        let conn = await connect(process.env.MONGO_URI, { dbName: "event-Managment-DB" });

        if (conn) {
            console.log("Db Connected success !");
            await ensureConfiguredAdmin();
        }

    } catch (error) {
        console.log(error);
    }
}

// A production admin is created only when these environment variables are set.
// Keeping the credentials in Render environment variables prevents them from
// being committed to GitHub or exposed in the frontend.
async function ensureConfiguredAdmin() {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME?.trim() || "Admin User";

    if (!email || !password) return;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        if (existingUser.role !== "admin") {
            existingUser.role = "admin";
            await existingUser.save();
            console.log("Configured admin role updated.");
        }
        return;
    }

    const hashedPassword = await generateHash(password);
    await userModel.create({ name, email, password: hashedPassword, role: "admin" });
    console.log("Configured admin account created.");
}
