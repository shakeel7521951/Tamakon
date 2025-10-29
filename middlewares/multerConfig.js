import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();

    let folder = "uploads";
    let resourceType = "auto";

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      folder = "images";
      resourceType = "image";
    } else if (["pdf", "docx", "epub"].includes(ext)) {
      folder = "documents";
      resourceType = "raw";
    } else if (["mp4", "avi", "mov"].includes(ext)) {
      folder = "videos";
      resourceType = "video";
    }

    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}_${file.originalname.split(".")[0]}`,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf", "epub", "docx", "mp4", "avi", "mov"],
    };
  },
});

const upload = multer({ storage });

export default upload;
