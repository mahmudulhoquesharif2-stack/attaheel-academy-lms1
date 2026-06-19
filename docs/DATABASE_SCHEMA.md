# DATABASE_SCHEMA.md

# At Taheel Academy LMS

## MongoDB Database Schema

Version: 2.0

Status: Active

---

# Database Rules

* MongoDB Atlas
* Mongoose ODM
* ObjectId References
* timestamps: true
* Scalable Architecture
* Modular Collections
* RBAC Ready

---

# Collection: users

Purpose

Store all system users.

Fields

_id

fullName

email (unique)

phone (unique)

password (hashed)

role

Possible Values

student

teacher

admin

super_admin

profileImage

isActive

createdAt

updatedAt

---

# Collection: courses

Purpose

Store academy courses.

Fields

_id

title

slug (unique)

shortDescription

description

thumbnail

durationMonths

feeMadrasa

feeGeneral

freeClassDate

admissionDeadline

classStartDate

status

Possible Values

draft

published

archived

isPublished

createdBy

createdAt

updatedAt

---

# Collection: enrollments

Purpose

Store course enrollments.

Fields

_id

student

(ObjectId → users)

course

(ObjectId → courses)

studentType

Possible Values

madrasa

general

paymentStatus

Possible Values

pending

paid

failed

approvalStatus

Possible Values

pending

approved

rejected

batch

notes

enrollmentDate

createdBy

createdAt

updatedAt

Indexes

student + course

(unique)

---

# Collection: payments

Purpose

Store payment submissions.

Fields

_id

student

(ObjectId → users)

course

(ObjectId → courses)

enrollment

(ObjectId → enrollments)

amount

paymentMethod

Possible Values

bkash

nagad

transactionId

paymentStatus

Possible Values

pending

paid

failed

paidAt

createdAt

updatedAt

Indexes

transactionId

(unique)

---

# Collection: assignments

Purpose

Store assignments.

Fields

_id

title

description

course

createdBy

dueDate

status

createdAt

updatedAt

---

# Collection: assignmentSubmissions

Purpose

Store assignment submissions.

Fields

_id

assignment

student

submissionText

submissionFile

obtainedMarks

feedback

status

createdAt

updatedAt

---

# Collection: exams

Purpose

Store exams.

Fields

_id

title

description

course

examDate

totalMarks

createdBy

createdAt

updatedAt

---

# Collection: examResults

Purpose

Store exam results.

Fields

_id

exam

student

obtainedMarks

remarks

createdAt

updatedAt

---

# Collection: notifications

Purpose

Store user notifications.

Fields

_id

recipient

title

message

type

Possible Values

system

payment

enrollment

course

announcement

isRead

readAt

createdBy

createdAt

updatedAt

---

# Collection: activities

Purpose

Store system activities.

Fields

_id

actor

action

entityType

Possible Values

user

course

enrollment

payment

system

entityId

title

description

metadata

visibility

Possible Values

public

admin

private

createdAt

updatedAt

Indexes

createdAt

(descending)

---

# Collection Relationships

User

↓

Enrollment

↓

Course

↓

Payment

↓

Notification

↓

Activity

---

# Access Architecture

Important Rule

Course access is NOT controlled by role.

Course access is controlled by:

Enrollment

*

Payment Status

*

Approval Status

Example

Student

↓

Enrollment Approved

↓

Payment Paid

↓

Course Access Granted

---

# Index Strategy

users.email

(unique)

users.phone

(unique)

courses.slug

(unique)

payments.transactionId

(unique)

enrollments.student + course

(unique)

activities.createdAt

(indexed)

notifications.recipient

(indexed)

---

# Security Rules

Password

Always Hashed

Role

Enum Validation

Payment Status

Enum Validation

Approval Status

Enum Validation

Course Slug

Unique

Transaction ID

Unique

---

# Soft Delete Strategy

Reserved For Future

isDeleted

deletedAt

---

# Future Collections

zoomLinks

certificates

attendance

liveClasses

supportTickets

paymentGatewayLogs

systemSettings

auditLogs

---

# Naming Convention

Collections

camelCase

Examples

assignmentSubmissions

examResults

Fields

camelCase

Examples

transactionId

paymentStatus

createdAt

Models

PascalCase

Examples

User

Course

Enrollment

Payment

Assignment

Exam

Activity

Notification

---

END OF DOCUMENT
