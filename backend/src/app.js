import examRoutes from "./routes/examRoutes.js";
import adminPanelRoutes from "./routes/adminPanelRoutes.js";
import studentPortalRoutes from "./routes/studentPortalRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import examResultRoutes from "./routes/examResultRoutes.js";
import assignmentSubmissionRoutes from "./routes/assignmentSubmissionRoutes.js";
import express from "express";
import cors from "cors";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "At Taheel Academy LMS API Running Successfully",
  });
});

/**
 * API Routes
 */

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/enrollments", enrollmentRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/analytics", analyticsRoutes);

app.use("/api/v1/activities", activityRoutes);

app.use("/api/v1/notifications", notificationRoutes);
// Assignment Module
app.use(
  "/api/v1/assignments",
  assignmentRoutes
);
// Assignment Submission Module
app.use(
  "/api/v1/assignment-submissions",
  assignmentSubmissionRoutes
);
// Exam Module
app.use(
  "/api/v1/exams",
  examRoutes
);
// Exam Result Module
app.use(
  "/api/v1/exam-results",
  examResultRoutes
);
// Upload Module
app.use(
  "/api/v1/uploads",
  uploadRoutes
);
// Student Portal Module
app.use(
  "/api/v1/student-portal",
  studentPortalRoutes
);
// Admin Panel Module
app.use(
  "/api/v1/admin-panel",
  adminPanelRoutes
);

/**
 * Error Handling
 */

app.use(notFoundHandler);

app.use(errorHandler);

export default app;