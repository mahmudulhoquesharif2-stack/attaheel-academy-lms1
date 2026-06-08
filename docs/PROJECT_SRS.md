# PROJECT_SRS.md

# At Taheel Academy LMS

## Software Requirement Specification (SRS)

### Version: 1.0

---

# 1. Project Information

**Project Name:** At Taheel Academy Learning Management System (LMS)

**Project Type:** Online Academy Management Platform

**Technology Stack:**

* MERN Stack
* MongoDB Atlas
* Express.js
* React.js
* Node.js
* JWT Authentication
* bcrypt Password Hashing

---

# 2. Project Vision

Build a modern, scalable, secure, and production-ready Online Academy Management System with a flexible architecture that supports continuous UI, UX, and animation improvements throughout the development lifecycle.

The initial Landing Page can be used as a reference, but the design, layout, components, and animations may be redesigned or enhanced whenever necessary to improve usability, branding, and user experience.

---

# 3. Business Goal

The academy generates revenue by selling online courses with one-time payments.

Students receive access after manual payment approval by the Admin.

---

# 4. Primary Objectives

* Course selling platform
* Student management
* User management
* Payment approval workflow
* Zoom class management
* Notification system
* Future scalability

---

# 5. User Roles

## Visitor

Can:

* Visit Landing Page
* View Courses
* View Pricing
* Register
* Login

---

## User

Registered but not approved.

Can:

* Access User Dashboard
* View available courses
* Submit payment request
* Edit profile

---

## Student

Approved user.

Can:

* Access Student Dashboard
* View purchased courses
* View Zoom Links
* Receive notifications
* Edit profile

---

## Admin

System administrator.

Can:

* View students
* Approve payments
* Reject payments
* Manage Zoom links
* Assign Zoom links to individual courses or multiple courses

---

# 6. Future Roles

The system must be designed to support future roles without major restructuring.

Future Roles:

* Teacher
* Moderator
* Support Team

---

# 7. Future Modules

The architecture must support:

* Recorded Classes
* Quiz System
* Assignment System
* Certificate Download
* Attendance System
* Student Search
* Payment Gateway Integration

---

# 8. Authentication Rules

Registration:

* Full Name
* Email
* Mobile Number
* Password

Login:

* Email + Password

Password:

* bcrypt hash

Authentication:

* JWT

---

# 9. Payment Workflow

Visitor

↓

Register

↓

Login

↓

User Dashboard

↓

Select Course

↓

Submit Payment

↓

Pending

↓

Admin Review

↓

Approve

↓

Student Role Activated

↓

Student Dashboard

---

# 10. Payment Method

Current Methods:

* bKash
* Nagad

Submission Fields:

* Transaction ID
* Payment Number

No payment gateway integration in Version 1.

---

# 11. Student Dashboard

Modules:

* My Profile
* My Courses
* Zoom Links
* Notifications
* Course Progress

Students can purchase multiple courses.

### Zoom Link Policy

The system must support two flexible options:

1. **Individual Course Zoom Link**

   * Each course can have its own dedicated Zoom meeting link.

2. **Shared Zoom Link**

   * The Admin can assign a single Zoom meeting link that grants access to multiple courses.
   * Students enrolled in any of those courses will see the same shared Zoom link in their dashboard.

This design allows the academy to conduct separate classes or combine multiple courses into a single live session without changing the system architecture.

---

# 12. Admin Dashboard

Real Working Features:

* View Students
* Approve Payment
* Reject Payment
* Add Zoom Link
* Update Zoom Link
* Delete Zoom Link
* Assign one Zoom link to a single course
* Assign one Zoom link to multiple courses

Future Features:

* Student Search
* Analytics
* Reports

---

# 13. UI & Landing Page Guidelines

The current Landing Page serves as the initial implementation and design reference.

The UI, layout, components, color scheme, typography, glassmorphism effects, and animations may be modified, redesigned, or replaced in future versions whenever necessary.

Design updates should follow these principles:

* Improve user experience
* Maintain responsive behavior
* Keep accessibility in mind
* Preserve branding consistency
* Use reusable components
* Optimize performance
* Support future scalability

UI and animation redesigns are considered part of the normal development process and do not require preserving the original implementation.

---

# 14. Security Level

Security Level:

Medium

Security Features:

* JWT Authentication
* bcrypt Password Hashing
* Environment Variables
* Protected Routes
* Role-Based Access Control (RBAC)

---

# 15. Development Principles

No random coding.

Every feature follows:

Requirement

↓

Design

↓

Implementation

↓

Testing

↓

Review

↓

Production

---

# 16. Folder Structure

Project Root

frontend/

backend/

docs/

README.md

Frontend

assets/

components/

pages/

routes/

services/

utils/

Backend

config/

controllers/

middleware/

models/

routes/

services/

utils/

---

# 17. Coding Standards

Use:

* Clean Architecture
* Modular Components
* Reusable Functions
* Consistent Naming
* Environment Variables
* Proper Error Handling
* Async/Await

---

# 18. Deployment Strategy

Development:

* Local Machine

Testing:

* Netlify + Backend Server

Production:

* Shared Hosting

Domain:

* attaheelacademy2.com

---

# 19. Documentation Driven Development

ChatGPT:

* Software Architect
* Requirement Analysis
* API Design
* Database Design
* Code Review

Cursor AI:

* MERN Development
* Component Creation
* CRUD APIs
* UI Integration

Developer:

* Testing
* Validation
* Git Management
* Deployment

---

# 20. Version Roadmap

### Version 1.0

* Project Vision
* Business Requirements
* Architecture
* Development Rules

### Version 2.0

* MongoDB Schema
* API Reference
* Folder Details
* Role Matrix
* Zoom Link Mapping Strategy

### Version 3.0

* Authentication
* Backend Modules
* Frontend Modules
* Deployment
* Testing
* Production Checklist

---

END OF DOCUMENT
