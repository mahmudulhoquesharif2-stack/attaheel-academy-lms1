# API_REFERENCE.md

# At Taheel Academy LMS

## REST API Reference

Version: 1.0

---

# Base URL

Development

/api/v1

Production

/api/v1

---

# API Response Format

Success

{
"success": true,
"message": "Operation successful",
"data": {}
}

Error

{
"success": false,
"message": "Something went wrong"
}

---

# Authentication APIs

## Register

POST

/api/v1/auth/register

Body

{
"fullName": "",
"email": "",
"phone": "",
"password": ""
}

Response

201 Created

---

## Login

POST

/api/v1/auth/login

Body

{
"email": "",
"password": ""
}

Response

200 OK

Returns:

JWT Token

User Information

Role

---

## Get Profile

GET

/api/v1/auth/profile

Protected

JWT Required

---

# User APIs

## Update Profile

PATCH

/api/v1/users/profile

Protected

---

## Change Password

PATCH

/api/v1/users/change-password

Protected

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

# Payment APIs

## Submit Payment

POST

/api/v1/payments

Role:

User

Request

{
"courseId": "",
"paymentMethod": "",
"transactionId": ""
}

Status

Pending

---

## Get My Payments

GET

/api/v1/payments/my

Protected

---

# Student APIs

## Student Dashboard

GET

/api/v1/student/dashboard

Role:

Student

---

## My Courses

GET

/api/v1/student/courses

Role:

Student

---

## Zoom Links

GET

/api/v1/student/zoom-links

Role:

Student

---

# Admin APIs

## Dashboard

GET

/api/v1/admin/dashboard

Role:

Admin

---

## Get Users

GET

/api/v1/admin/users

---

## Get Students

GET

/api/v1/admin/students

---

## Get Pending Payments

GET

/api/v1/admin/payments/pending

---

## Approve Payment

PATCH

/api/v1/admin/payments/:id/approve

Result:

User Role

↓

Student

---

## Reject Payment

PATCH

/api/v1/admin/payments/:id/reject

---

# Zoom APIs

## Create Zoom Link

POST

/api/v1/admin/zoom-links

Role:

Admin

---

## Update Zoom Link

PATCH

/api/v1/admin/zoom-links/:id

---

## Delete Zoom Link

DELETE

/api/v1/admin/zoom-links/:id

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

# Authentication

JWT

Authorization Header

Bearer TOKEN

---

# Version Policy

Current

v1

Future

v2

Backward compatible whenever possible.

END OF DOCUMENT
