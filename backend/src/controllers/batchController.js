import batchService from "../services/batchService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

const createBatch = asyncHandler(
  async (req, res) => {
    const batch =
      await batchService.createBatch(
        req.body
      );

    sendSuccess(
      res,
      201,
      "Batch created successfully",
      batch
    );
  }
);

const getAllBatches = asyncHandler(
  async (req, res) => {
    const batches =
      await batchService.getAllBatches();

    sendSuccess(
      res,
      200,
      "Batches fetched successfully",
      batches
    );
  }
);

export default {
  createBatch,
  getAllBatches,
};