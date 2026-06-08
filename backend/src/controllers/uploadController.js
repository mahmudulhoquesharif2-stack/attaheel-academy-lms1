import uploadService from "../services/uploadService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/uploads
 */
const uploadFile = asyncHandler(
  async (req, res) => {
    const { filePath, folder } =
      req.body;

    if (!filePath) {
      throw new AppError(
        "Please provide filePath",
        400
      );
    }

    const result =
      await uploadService.uploadFile(
        filePath,
        folder
      );

    sendSuccess(
      res,
      200,
      "File uploaded successfully",
      result
    );
  }
);

/**
 * DELETE /api/v1/uploads/:publicId
 */
const deleteFile = asyncHandler(
  async (req, res) => {
    const result =
      await uploadService.deleteFile(
        req.params.publicId
      );

    sendSuccess(
      res,
      200,
      "File deleted successfully",
      result
    );
  }
);

export default {
  uploadFile,
  deleteFile,
};