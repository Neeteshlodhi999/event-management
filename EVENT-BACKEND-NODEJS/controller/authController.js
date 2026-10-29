import { ApiResponse } from "../utils/responsePattern.js";
import userModel from "../models/userModel.js";
import { generateHash, verifyHash } from "../config/bcrypt.js";
import { generateToken } from "../config/jwt.js";
import crypto from "crypto";

const googleLoginExchanges = new Map();
const googleRedirectUri = () => process.env.GOOGLE_REDIRECT_URI || "https://event-management-api-x7za.onrender.com/auth/google/callback";
const userClientUrl = () => (process.env.CLIENT_URL || "https://event-management-user-qfum.onrender.com").replace(/\/$/, "");

function redirectWithGoogleError(res, message) {
    return res.redirect(`${userClientUrl()}/auth?google_error=${encodeURIComponent(message)}`);
}

function safeGoogleName(name, email) {
    const cleaned = (name || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z ]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 32);
    return cleaned.length >= 2 ? cleaned : email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim().slice(0, 32) || "EventHub User";
}

// login api
export async function authController(req, res) {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json(new ApiResponse(false, null, "Email and password are required"));
        }

        let user = await userModel.findOne({ email: normalizedEmail });

        if (!user) return res.status(404).json(new ApiResponse(false, null, "No account found with this email. Please register first."))

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

export function startGoogleLogin(req, res) {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return redirectWithGoogleError(res, "Google sign-in is not configured yet.");
    }

    const state = crypto.randomBytes(24).toString("hex");
    res.cookie("eventhub_google_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
    });

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.search = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: googleRedirectUri(),
        response_type: "code",
        scope: "openid email profile",
        state,
        prompt: "select_account",
    }).toString();
    return res.redirect(url.toString());
}

export async function completeGoogleLogin(req, res) {
    try {
        const { code, state, error } = req.query;
        if (error) return redirectWithGoogleError(res, "Google sign-in was cancelled.");
        if (!code || !state || state !== req.cookies.eventhub_google_state) {
            return redirectWithGoogleError(res, "Google sign-in could not be verified. Please try again.");
        }
        res.clearCookie("eventhub_google_state");

        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: googleRedirectUri(),
                grant_type: "authorization_code",
            }),
        });
        const tokenData = await tokenResponse.json();
        if (!tokenResponse.ok || !tokenData.access_token) throw new Error("Google token exchange failed");

        const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const profile = await profileResponse.json();
        const email = profile.email?.trim().toLowerCase();
        if (!profileResponse.ok || !profile.email_verified || !email) throw new Error("Google did not provide a verified email address");

        let user = await userModel.findOne({ email });
        if (user?.role === "admin") return redirectWithGoogleError(res, "Please use the admin login page.");
        if (!user) {
            user = await userModel.create({
                name: safeGoogleName(profile.name, email),
                email,
                password: await generateHash(crypto.randomBytes(32).toString("hex")),
                role: "user",
            });
        }

        for (const [exchangeCode, exchange] of googleLoginExchanges) {
            if (exchange.expiresAt <= Date.now()) googleLoginExchanges.delete(exchangeCode);
        }
        const exchangeCode = crypto.randomUUID();
        googleLoginExchanges.set(exchangeCode, { userId: user._id.toString(), expiresAt: Date.now() + 2 * 60 * 1000 });
        return res.redirect(`${userClientUrl()}/auth?google_code=${encodeURIComponent(exchangeCode)}`);
    } catch (error) {
        console.error("Google sign-in failed:", error.message);
        return redirectWithGoogleError(res, "Google sign-in failed. Please try again.");
    }
}

export async function exchangeGoogleLoginCode(req, res) {
    try {
        const exchange = googleLoginExchanges.get(req.body.code);
        googleLoginExchanges.delete(req.body.code);
        if (!exchange || exchange.expiresAt <= Date.now()) {
            return res.status(400).json(new ApiResponse(false, null, "Google sign-in session expired. Please try again."));
        }
        const user = await userModel.findById(exchange.userId);
        if (!user || user.role !== "user") {
            return res.status(400).json(new ApiResponse(false, null, "Google account is unavailable."));
        }
        const safeUser = user.toObject();
        safeUser.accessToken = generateToken({ id: user._id, name: user.name, role: user.role });
        delete safeUser.password;
        delete safeUser.__v;
        delete safeUser.isDeleted;
        return res.status(200).json(new ApiResponse(true, safeUser, "Google sign-in successful"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(false, null, "Unable to complete Google sign-in"));
    }
}
