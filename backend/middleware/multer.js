import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    // prefix with timestamp (or UUID) to avoid collisions
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

// Basic file-type filter (images only). Adjust to your needs.
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const mimetypeOk = allowed.test(file.mimetype);
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  if (mimetypeOk && extOk) cb(null, true);
  else cb(new Error("Invalid file type. Only images are allowed."));
};

// Limits (example: max 10 MB per file)
const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({ storage, fileFilter, limits });

export default upload;
