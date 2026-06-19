# ROLE_PERMISSION.md

# At Taheel Academy LMS

Version: 2.0

Status: Active

---

# Official Role System

The LMS uses Role Based Access Control (RBAC).

Current Roles

1. Visitor

2. Student

3. Teacher

4. Admin

5. Super Admin

---

# Visitor Permissions

Unauthenticated users.

Can

✓ View Homepage

✓ View Landing Page

✓ View Courses

✓ View Pricing

✓ Register

✓ Login

✓ Contact Academy

Cannot

✗ Access Dashboard

✗ Access Payments

✗ Access Enrollments

✗ Access Student Features

---

# Student Permissions

Authenticated users.

Default role after registration.

Can

✓ View Dashboard

✓ Update Profile

✓ Browse Courses

✓ Create Enrollment

✓ Submit Payment

✓ View Payment Status

✓ View My Enrollments

✓ View My Courses

✓ View Notifications

✓ Submit Assignments

✓ View Exam Results

Cannot

✗ Manage Users

✗ Manage Courses

✗ Approve Payments

✗ Access Admin Panel

---

# Teacher Permissions

Academic management role.

Can

✓ Access Teacher Dashboard

✓ View Assigned Courses

✓ Create Assignments

✓ Update Assignments

✓ Delete Assignments

✓ Create Exams

✓ Publish Results

✓ Review Assignment Submissions

✓ View Student Progress

Cannot

✗ Manage Users

✗ Approve Payments

✗ Access System Settings

---

# Admin Permissions

System management role.

Can

✓ Access Admin Dashboard

✓ Manage Students

✓ Manage Courses

✓ Manage Enrollments

✓ Approve Enrollments

✓ Reject Enrollments

✓ Manage Payments

✓ Approve Payments

✓ Reject Payments

✓ Manage Notifications

✓ View Activities

✓ View Analytics

✓ Manage Uploads

✓ Manage Student Portal

Cannot

✗ Manage Super Admin Accounts

✗ Access Root-Level Settings

---

# Super Admin Permissions

Highest level authority.

Can

✓ Everything Admin Can Do

✓ Manage Admin Accounts

✓ Promote Users

✓ Demote Users

✓ Manage System Settings

✓ Access All Modules

✓ Full Analytics Access

✓ Full Activity Access

✓ System-Wide Control

---

# Enrollment Workflow

Visitor

↓

Register

↓

Student

↓

Create Enrollment

↓

Submit Payment

↓

Pending Review

↓

Admin Approval

↓

Enrollment Activated

↓

Course Access Granted

---

# Payment Workflow

Student

↓

Create Enrollment

↓

Submit Payment

↓

Pending

↓

Admin Review

↓

Approved

↓

Enrollment Activated

↓

Course Access

---

# Important Architecture Rule

Course access is NOT controlled by role.

Course access is controlled by:

Enrollment

*

Payment Status

*

Approval Status

Example

A Student can have:

0 Courses

1 Course

5 Courses

10 Courses

while remaining in the same role.

---

# Future Roles

Reserved Roles

* Moderator
* Support Team
* Course Manager
* Finance Manager

The architecture must support future role expansion.

---

# Authorization Middleware

Example

```javascript
authorize(
  "admin",
  "super_admin"
);
```

Example

```javascript
authorize(
  "teacher",
  "admin",
  "super_admin"
);
```

---

# Security Rule

Never trust frontend permissions.

All permission checks must be enforced on the backend.

---

END OF DOCUMENT
