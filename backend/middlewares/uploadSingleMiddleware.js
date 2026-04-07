import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadInternsFile = (req, res, next) => {
  const uploadSingle = upload.single("file");

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // This catches "Field name missing" and sends a nice JSON response!
      return res.status(400).json({
        success: false,
        message: `Upload Error: ${err.message}. Please make sure you are using "file" as the key in your form-data.`,
      });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Unknown upload error occurred." });
    }
    next(); // Move to the next function (uploadInterns) if no errors
  });
};
