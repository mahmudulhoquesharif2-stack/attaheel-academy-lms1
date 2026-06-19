# ARCHITECTURE.md

# At Taheel Academy LMS

## System Architecture

Version: 2.0

Status: Active

---

# Purpose

This document defines the official architecture of At Taheel Academy LMS.

All future development must follow this architecture.

No feature should be implemented outside this structure.

---

# High Level Architecture

Visitor

↓

React Frontend

↓

REST API

↓

Express Backend

↓

Service Layer

↓

MongoDB Atlas

---

# Technology Stack

Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Framer Motion

Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

Deployment

Frontend

* Netlify / Vercel

Backend

* VPS / Shared Hosting

Database

* MongoDB Atlas

---

# Backend Architecture

The backend follows a layered architecture.

Route

↓

Controller

↓

Service

↓

Model

↓

Database

---

# Route Layer

Responsibilities

* API Endpoint Definition
* Middleware Registration
* Authentication Protection
* Authorization Rules

Example

/api/v1/payments

/api/v1/courses

/api/v1/enrollments

---

# Controller Layer

Responsibilities

* Receive Request
* Validate Input Presence
* Call Service Layer
* Return Standard Response

Controllers must NOT contain business logic.

Example

paymentController.js

courseController.js

authController.js

---

# Service Layer

Responsibilities

* Business Logic
* Validation Logic
* Database Operations
* Workflow Management

Examples

paymentService.js

enrollmentService.js

dashboardService.js

---

# Model Layer

Responsibilities

* Data Structure
* Validation Rules
* Relationships
* Indexes

Models

User

Course

Enrollment

Payment

Assignment

AssignmentSubmission

Exam

ExamResult

Activity

Notification

---

# Authentication Architecture

Register

↓

Password Hash

↓

Database

↓

Login

↓

JWT Token

↓

Protected Routes

↓

Authenticated User

---

# Authorization Architecture

Roles

Visitor

Student

Teacher

Admin

Super Admin

Access is controlled through middleware.

Example

authorize(
"admin",
"super_admin"
)

---

# Enrollment Workflow

Student

↓

Choose Course

↓

Create Enrollment

↓

Pending Enrollment

↓

Submit Payment

↓

Admin Review

↓

Approve Payment

↓

Enrollment Activated

↓

Course Access Granted

---

# Payment Workflow

Student

↓

Enrollment

↓

Submit Transaction

↓

Pending Payment

↓

Admin Review

↓

Approve

↓

Payment Status = Paid

↓

Enrollment Status Updated

↓

Course Access Granted

---

# Future Payment Gateway Flow

Student

↓

bKash / Nagad Gateway

↓

Payment Verification

↓

Webhook

↓

Automatic Approval

↓

Enrollment Activated

Current Version

Manual Verification

Future Version

Automated Verification

---

# Course Access Architecture

Student

↓

Enrollment

↓

Payment Approved

↓

Course Access

A student can enroll in multiple courses.

Course access is determined by enrollment records.

NOT by user role.

---

# Dashboard Architecture

Admin Dashboard

Provides

* Users
* Students
* Courses
* Revenue
* Payments
* Analytics

Student Dashboard

Provides

* Profile
* Courses
* Payments
* Notifications
* Assignments
* Exams

Teacher Dashboard

Provides

* Courses
* Assignments
* Student Results

---

# Notification Architecture

System Event

↓

Notification Creation

↓

Recipient

↓

Notification Collection

↓

Dashboard Display

Examples

Payment Approved

Enrollment Approved

Assignment Published

Exam Result Published

---

# Activity Log Architecture

User Action

↓

Activity Record

↓

Activity Collection

↓

Admin Monitoring

Examples

Payment Approved

Course Created

Enrollment Submitted

Assignment Submitted

---

# File Upload Architecture

Frontend Upload

↓

API

↓

Storage Provider

↓

Database Reference

↓

Frontend Access

Current

Local Upload

Future

Cloud Storage

* Cloudinary
* AWS S3

---

# Zoom Integration Architecture

Admin

↓

Create Zoom Link

↓

Assign Course(s)

↓

Student Access

One Zoom Link

↓

One Course

OR

↓

Multiple Courses

---

# API Response Standard

Success

{
"success": true,
"message": "",
"data": {}
}

Error

{
"success": false,
"message": "",
"data": null
}

---

# Security Architecture

Authentication

* JWT

Password

* bcrypt

Authorization

* RBAC

Protected Routes

* Middleware

Environment Variables

* Required

---

# Scalability Strategy

Future Modules

* Recorded Classes
* Quiz System
* Attendance
* Certificate Generation
* Live Class Management
* Student Search
* Support Tickets
* Payment Gateway Integration
* Mobile Application

Architecture must support future modules without major restructuring.

---

# Development Rule

Requirement

↓

Architecture

↓

Database

↓

API

↓

Frontend

↓

Testing

↓

Deployment

No feature should skip architecture review.

---

END OF DOCUMENT
 