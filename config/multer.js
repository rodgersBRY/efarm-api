const multer = require("multer");

// store files on memory to quickly upload them to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB FILE LIMIT
});

module.exports = upload;
