import multer from "multer";
import path from "path"
import fs from "fs";

fs.mkdirSync('uploads/event-images', { recursive: true });
fs.mkdirSync('uploads/user-images', { recursive: true });

// Configure disk storage
const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/event-images'); // Ensure folder exists
    },
    filename: (req, file, cb) => {
        // Generate a unique filename: timestamp + original extension
        const uniqueSuffix = "Event-" + Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Configure disk storage
const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/user-images'); // Ensure folder exists
    },
    filename: (req, file, cb) => {
        // Generate a unique filename: timestamp + original extension
        const uniqueSuffix = "User-" + Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Configure file filter (e.g., only accept images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

export const eventImageUpload = multer({
    storage: eventStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 } // 10MB Size;
});

export const userImageUpload = multer({
    storage: userStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB Size;
});
