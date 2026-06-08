# DATABASE_SCHEMA.md

# At Taheel Academy LMS

## MongoDB Schema Design

Version: 1.0

---

# Design Principles

* Use MongoDB Atlas
* Use Mongoose
* Use ObjectId References
* Enable timestamps for every collection
* Keep schema scalable and normalized

---

# Collection: users

Purpose:

Store all registered users.

Fields

_id

fullName

email (unique)

phone

password (hashed)

role

Possible Values

user

student

admin

avatar

isActive

createdAt

updatedAt

---

# Collection: courses

Purpose:

Store all academy courses.

Fields

_id

title

slug

description

price

thumbnail

isPublished

createdAt

updatedAt

---

# Collection: payments

Purpose:

Store payment requests.

Fields

_id

user

(ObjectId → users)

course

(ObjectId → courses)

paymentMethod

Possible Values

bkash

nagad

transactionId

status

Possible Values

pending

approved

rejected

submittedAt

approvedAt

createdAt

updatedAt

---

# Collection: zoomLinks

Purpose:

Store Zoom meeting links.

Fields

_id

title

zoomUrl

meetingId

passcode

courseIds

(Array of Course ObjectIds)

isActive

createdAt

updatedAt

---

# Collection: notifications

Purpose:

Store system notifications.

Fields

_id

user

title

message

isRead

createdAt

updatedAt

---

# User Relationships

User

↓

Payment

↓

Course

↓

Zoom Link

↓

Notification

---

# Index Strategy

users.email

Unique

courses.slug

Unique

payments.transactionId

Indexed

notifications.user

Indexed

---

# Common Mongoose Options

{
timestamps: true
}

---

# Future Collections

teachers

assignments

quizzes

attendance

certificates

liveClasses

supportTickets

activityLogs

---

# Data Integrity Rules

Password:

Always hashed

Email:

Always unique

Role:

Enum validation

Payment Status:

Enum validation

Course Slug:

Unique

---

# Soft Delete Policy

Future Support:

isDeleted

deletedAt

instead of permanent delete.

---

# Naming Convention

Collections

camelCase

Example

zoomLinks

Fields

camelCase

Example

transactionId

Models

PascalCase

Example

User

Payment

Course

---

END OF DOCUMENT
