# ROUTE_MAPPING.md

# At Taheel Academy LMS

Version: 2.0

Status: Active

---

# Frontend Route Structure

## Public Routes

/

/login

/register

/forgot-password

/courses

/courses/:slug

/about

/contact

---

# Student Routes

/student/dashboard

/student/profile

/student/enrollments

/student/payments

/student/courses

/student/assignments

/student/exams

/student/results

/student/notifications

---

# Teacher Routes

/teacher/dashboard

/teacher/assignments

/teacher/exams

/teacher/results

/teacher/students

---

# Admin Routes

/admin/dashboard

/admin/courses

/admin/enrollments

/admin/payments

/admin/students

/admin/assignments

/admin/exams

/admin/results

/admin/notifications

/admin/activities

/admin/analytics

/admin/uploads

/admin/student-portal

---

# Super Admin Routes

/super-admin/dashboard

/super-admin/admins

/super-admin/system-settings

/super-admin/logs

---

# Backend API Routes

## Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

POST /api/v1/auth/logout

GET /api/v1/auth/profile

---

## Courses

GET /api/v1/courses

GET /api/v1/courses/:id

POST /api/v1/courses

PATCH /api/v1/courses/:id

DELETE /api/v1/courses/:id

---

## Enrollments

POST /api/v1/enrollments

GET /api/v1/enrollments

GET /api/v1/enrollments/my-enrollments

PATCH /api/v1/enrollments/:id/approve

PATCH /api/v1/enrollments/:id/reject

---

## Payments

POST /api/v1/payments

GET /api/v1/payments

GET /api/v1/payments/my-payments

PATCH /api/v1/payments/:id/approve

PATCH /api/v1/payments/:id/reject

---

## Dashboard

GET /api/v1/dashboard/stats

---

## Analytics

GET /api/v1/analytics

---

## Activities

GET /api/v1/activities

---

## Notifications

GET /api/v1/notifications

PATCH /api/v1/notifications/:id/read

---

## Assignments

POST /api/v1/assignments

GET /api/v1/assignments

GET /api/v1/assignments/:id

PATCH /api/v1/assignments/:id

DELETE /api/v1/assignments/:id

---

## Assignment Submissions

POST /api/v1/assignment-submissions

GET /api/v1/assignment-submissions

GET /api/v1/assignment-submissions/my-submissions

PATCH /api/v1/assignment-submissions/:id/review

---

## Exams

POST /api/v1/exams

GET /api/v1/exams

GET /api/v1/exams/:id

PATCH /api/v1/exams/:id

DELETE /api/v1/exams/:id

---

## Exam Results

POST /api/v1/exam-results

GET /api/v1/exam-results

GET /api/v1/exam-results/:id

---

## Uploads

POST /api/v1/uploads

---

## Student Portal

GET /api/v1/student-portal

---

## Admin Panel

GET /api/v1/admin-panel

---

## Debug

GET /api/v1/debug

---

# Route Protection Matrix

## Public

/

/login

/register

/courses

/courses/:slug

---

## Student Protected

/student/*

Requires

Role = student

---

## Teacher Protected

/teacher/*

Requires

Role = teacher

---

## Admin Protected

/admin/*

Requires

Role = admin

or

Role = super_admin

---

## Super Admin Protected

/super-admin/*

Requires

Role = super_admin

---

# Authorization Examples

Student

```javascript
authorize("student");
```

Teacher

```javascript
authorize(
  "teacher",
  "admin",
  "super_admin"
);
```

Admin

```javascript
authorize(
  "admin",
  "super_admin"
);
```

Super Admin

```javascript
authorize(
  "super_admin"
);
```

---

# Future Route Groups

/api/v1/certificates

/api/v1/attendance

/api/v1/live-classes

/api/v1/support-tickets

/api/v1/payment-gateway

---

END OF DOCUMENT
