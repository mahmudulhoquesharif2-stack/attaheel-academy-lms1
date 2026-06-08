import cloudinary from "../config/cloudinary.js";
import AppError from "../utils/AppError.js";

/**
 * Upload File To Cloudinary
 */
const uploadFile = async (
  filePath,
  folder = "attaheel-academy"
) => {
  if (!filePath) {
    throw new AppError(
      "File path is required",
      400
    );
  }

  const result =
    await cloudinary.uploader.upload(
      filePath,
      {
        folder,
        resource_type: "auto",
      }
    );

  return {
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    bytes: result.bytes,
  };
};

/**
 * Delete File
 */
const deleteFile = async (
  publicId
) => {
  if (!publicId) {
    throw new AppError(
      "Public ID is required",
      400
    );
  }

  return cloudinary.uploader.destroy(
    publicId
  );
};

export default {
  uploadFile,
  deleteFile,
};