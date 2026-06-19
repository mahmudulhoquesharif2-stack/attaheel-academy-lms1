import Batch from "../models/Batch.js";

const createBatch = async (data) => {
  const batch = await Batch.create(data);

  return batch;
};

const getAllBatches = async () => {
  return Batch.find().sort({
    createdAt: -1,
  });
};

export default {
  createBatch,
  getAllBatches,
};