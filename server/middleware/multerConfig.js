const multer = require("multer");

// Configure memory storage (store file in RAM as Buffer)
const storage = multer.memoryStorage();

// File filter (accept images only)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

// Initialize multer
const upload = multer({
    storage, // Use memoryStorage
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter
});

module.exports = upload;
