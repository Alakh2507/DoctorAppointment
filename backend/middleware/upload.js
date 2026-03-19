import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    //save uploaded files in the "uploads" folder
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    //generate a unique filename for each uploaded file
    filename: (req, file, cb) => {
        const extname = Date.now() + path.extname(file.originalname);
        cb(null, extname);
    },
})

// ✅ File filter for images and videos only
    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/")
        ) {
            cb(null, true); // accept file
        } else {
            cb(new Error("Only image and video files are allowed!"), false); // reject file
        }
    };

const upload = multer({ storage: storage , fileFilter: fileFilter });

export default upload;