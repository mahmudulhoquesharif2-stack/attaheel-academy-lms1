import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import Activity from "../models/Activity.js";
import AppError from "../utils/AppError.js";

/**

* Create Payment
  */
  const createPayment = async (
  studentId,
  paymentData
  ) => {
  const {
  enrollmentId,
  amount,
  paymentMethod,
  transactionId,
  } = paymentData;

const enrollment =
await Enrollment.findById(
enrollmentId
);

if (!enrollment) {
throw new AppError(
"Enrollment not found",
404
);
}

const course =
await Course.findById(
enrollment.course
);

if (!course) {
throw new AppError(
"Course not found",
404
);
}

let expectedAmount = 0;

if (
enrollment.studentType ===
"madrasa"
) {
expectedAmount =
course.feeMadrasa;
}

if (
enrollment.studentType ===
"general"
) {
expectedAmount =
course.feeGeneral;
}

if (
Number(amount) !==
Number(expectedAmount)
) {
throw new AppError(
`Invalid amount. Expected ${expectedAmount}`,
400
);
}

const existingPayment =
await Payment.findOne({
transactionId,
});

if (existingPayment) {
throw new AppError(
"Transaction ID already exists",
400
);
}

const payment =
await Payment.create({
student: studentId,
course: enrollment.course,
enrollment: enrollment._id,
amount,
paymentMethod,
transactionId,
paymentStatus: "pending",
});

return payment;
};

/**

* My Payments
  */
  const getMyPayments = async (
  studentId
  ) => {
  return Payment.find({
  student: studentId,
  })
  .populate(
  "course",
  "title slug"
  )
  .sort({
  createdAt: -1,
  });
  };

/**

* Admin All Payments
  */
  const getAllPayments =
  async () => {
  return Payment.find()
  .populate(
  "student",
  "fullName email phone"
  )
  .populate(
  "course",
  "title slug"
  )
  .sort({
  createdAt: -1,
  });
  };

/**

* Approve Payment
  */
  const approvePayment =
  async (paymentId) => {

  const payment =
  await Payment.findById(
  paymentId
  );

  if (!payment) {
  throw new AppError(
  "Payment not found",
  404
  );
  }

  if (
  payment.paymentStatus ===
  "paid"
  ) {
  throw new AppError(
  "Payment already approved",
  400
  );
  }

  payment.paymentStatus =
  "paid";

  payment.paidAt =
  new Date();

  await payment.save();

  const enrollment =
  await Enrollment.findById(
  payment.enrollment
  );

  if (enrollment) {

  enrollment.paymentStatus =
  "paid";

  enrollment.approvalStatus =
  "approved";

  await enrollment.save();
  }

  const user =
  await User.findById(
  payment.student
  );

  if (user) {

  user.role =
  "student";

  await user.save();

  await Notification.create({
  recipient: user._id,
  title:
  "Payment Approved",
  message:
  "Your payment has been approved. You now have access to your course.",
  type:
  "payment",
  });

  await Activity.create({
  actor: user._id,
  action:
  "payment_approved",
  entityType:
  "payment",
  entityId:
  payment._id,
  title:
  "Payment Approved",
  description:
  "Student access activated after payment approval.",
  });
  }

  return payment;
  };

/**

* Reject Payment
  */
  const rejectPayment =
  async (paymentId) => {

  const payment =
  await Payment.findById(
  paymentId
  );

  if (!payment) {
  throw new AppError(
  "Payment not found",
  404
  );
  }

  payment.paymentStatus =
  "failed";

  await payment.save();

  return payment;
  };

export default {
createPayment,
getMyPayments,
getAllPayments,
approvePayment,
rejectPayment,
};
