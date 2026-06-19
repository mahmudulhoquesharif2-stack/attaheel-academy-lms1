import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingUser = await User.findOne({
      email: "mahmudulhoquesharif2@gmail.com",
    });

    if (existingUser) {
      console.log("User already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "sharif2000",
      10
    );

    const admin = await User.create({
      fullName: "Mahmudul Hoque Sharif",
      email: "mahmudulhoquesharif2@gmail.com",
      phone: "01800000000",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin Created Successfully");
    console.log(admin);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();