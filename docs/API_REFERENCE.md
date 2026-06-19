# API_REFERENCE.md

# At Taheel Academy LMS

## REST API Reference

Version: 2.0

Status: Active

---

# Base URL

Development

/api/v1

Production

/api/v1

---

# Standard Response Format

Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": null
}
```

---

# Authentication APIs

## Register

POST

/api/v1/auth/register

Body

```json
{
  "fullName": "",
  "email": "",
  "phone": "",
  "password": ""
}
```

Response

201 Created

---

## Login

POST

/api/v1/auth/login

Body

```json
{
  "email": "",
  "password": ""
}
```

Response

200 OK

Returns

* JWT Token
* User Information
* Role

---

## Logout

POST

/api/v1/auth/logout

Protected

JWT Required

---

## Profile

GET

/api/v1/auth/profile

Protected

JWT Required

---

# Course APIs

## Get All Courses

GET

/api/v1/courses

Public

---

## Get Course Details

GET

/api/v1/courses/:id

Public

---

## Create Course

POST

/api/v1/courses

Role

Admin

Super Admin

---

## Update Course

PATCH

/api/v1/courses/:id

Role

Admin

Super Admin

---

## Delete Course

DELETE

/api/v1/courses/:id

Role

Admin

Super Admin

---

# Enrollment APIs

## Create Enrollment

POST

/api/v1/enrollments

Role

Student

---

## My Enrollments

GET

/api/v1/enrollments/my-enrollments

Role

Student

---

## All Enrollments

GET

/api/v1/enrollments

Role

Admin

Super Admin

---

## Approve Enrollment

PATCH

/api/v1/enrollments/:id/approve

Role

Admin

Super Admin

---

## Reject Enrollment

PATCH

/api/v1/enrollments/:id/reject

Role

Admin

Super Admin

---

# Payment APIs

## Submit Payment

POST

/api/v1/payments

Role

Student

Body

```json
{
  "enrollmentId": "",
  "amount": 3900,
  "paymentMethod": "bkash",
  "transactionId": ""
}
```

Validation

Amount must match course fee.

Madrasa

3900

General

5300

---

## My Payments

GET

/api/v1/payments/my-payments

Role

Student

---

## All Payments

GET

/api/v1/payments

Role

Admin

Super Admin

---

## Approve Payment

PATCH

/api/v1/payments/:id/approve

Role

Admin

Super Admin

Result

* Payment Status = Paid
* Enrollment Status Updated

---

## Reject Payment

PATCH

/api/v1/payments/:id/reject

Role

Admin

Super Admin

Result

* Payment Status = Failed

---

# Dashboard APIs

## Dashboard Statistics

GET

/api/v1/dashboard/stats

Role

Admin

Super Admin

Returns

* Total Users
* Total Students
* Total Teachers
* Total Courses
* Total Enrollments
* Total Payments
* Pending Payments
* Pending Enrollments
* Total Revenue

---

# Assignment APIs

## Create Assignment

POST

/api/v1/assignments

Teacher

Admin

---

## Get Assignments

GET

/api/v1/assignments

Protected

---

## Update Assignment

PATCH

/api/v1/assignments/:id

Teacher

Admin

---

## Delete Assignment

DELETE

/api/v1/assignments/:id

Teacher

Admin

---

# Assignment Submission APIs

## Submit Assignment

POST

/api/v1/assignment-submissions

Student

---

## My Submissions

GET

/api/v1/assignment-submissions/my-submissions

Student

---

## Review Submission

PATCH

/api/v1/assignment-submissions/:id/review

Teacher

Admin

---

# Exam APIs

## Create Exam

POST

/api/v1/exams

Teacher

Admin

---

## Get Exams

GET

/api/v1/exams

Protected

---

## Update Exam

PATCH

/api/v1/exams/:id

Teacher

Admin

---

## Delete Exam

DELETE

/api/v1/exams/:id

Teacher

Admin

---

# Exam Result APIs

## Publish Result

POST

/api/v1/exam-results

Teacher

Admin

---

## Get Results

GET

/api/v1/exam-results

Protected

---

# Notification APIs

## Get Notifications

GET

/api/v1/notifications

Protected

---

## Mark As Read

PATCH

/api/v1/notifications/:id/read

Protected

---

# Activity APIs

## Get Activities

GET

/api/v1/activities

Role

Admin

Super Admin

---

# Upload APIs

## Upload File

POST

/api/v1/uploads

Protected

---

# Authentication

JWT

Authorization Header

```text
Bearer TOKEN
```

---

# Current Payment System

Version 1

Manual Verification

Supported

* bKash
* Nagad

Admin manually approves payments.

---

# Future Payment System

Version 2

Automatic Gateway Verification

Supported

* bKash API
* Nagad API

Payment approval will be automatic.

---

# HTTP Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

---

# Version Policy

Current

v1

Future

v2

Backward compatible whenever possible.

---

END OF DOCUMENT
