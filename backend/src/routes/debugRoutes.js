import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find().select(
    "fullName email role isActive"
  );

  res.json(users);
});

export default router;