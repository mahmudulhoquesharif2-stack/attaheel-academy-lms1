# CURSOR_RULES.md

# At Taheel Academy LMS

## Cursor AI Development Rules

Version: 1.0

---

# 1. General Rules

You are working on the At Taheel Academy LMS project.

Always follow:

* PROJECT_SRS.md
* API_REFERENCE.md
* DATABASE_SCHEMA.md
* ROLE_PERMISSION.md
* ROUTE_MAPPING.md

If any conflict exists:

PROJECT_SRS.md is the source of truth.

---

# 2. Architecture Rules

Always follow MERN architecture.

Frontend:

* React
* Vite

Backend:

* Node.js
* Express.js

Database:

* MongoDB Atlas
* Mongoose

Authentication:

* JWT
* bcryptjs

---

# 3. File Safety Rules

Never delete existing files.

Never rename existing folders.

Never move project files.

Never overwrite working code without approval.

Always create new files when necessary.

---

# 4. Coding Standards

Use:

* Clean Code
* Modular Structure
* Reusable Components
* Reusable Functions

Avoid:

* Spaghetti Code
* Duplicate Logic
* Hardcoded Values

---

# 5. Environment Rules

Always use environment variables.

Never hardcode:

* Database URI
* JWT Secret
* API Keys
* Passwords

Use:

process.env

for all sensitive data.

---

# 6. Backend Rules

Follow this structure:

src/

config/

controllers/

middleware/

models/

routes/

services/

utils/

app.js

server.js

Do not create random folders.

---

# 7. Frontend Rules

Follow this structure:

src/

assets/

components/

context/

hooks/

layouts/

pages/

routes/

services/

utils/

Never place business logic inside UI components.

---

# 8. React Rules

Use:

* Functional Components
* Hooks
* React Router

Avoid:

* Class Components

Prefer:

* useState
* useEffect
* useContext

---

# 9. API Rules

Every API response must follow:

{
"success": true,
"message": "Operation successful",
"data": {}
}

Error response:

{
"success": false,
"message": "Error message"
}

---

# 10. Error Handling Rules

Always:

* Use try/catch
* Return meaningful errors
* Validate input

Never:

* Expose stack traces
* Expose secrets

---

# 11. Database Rules

Use Mongoose Schema.

Always include:

* timestamps: true

Use:

createdAt

updatedAt

for all collections.

---

# 12. Authentication Rules

Password:

* Hash with bcryptjs

Token:

* JWT

Protected routes:

* Verify JWT
* Verify Role

Never store plain text passwords.

---

# 13. Role Rules

Current Roles:

* user
* student
* admin

Future Roles:

* teacher
* moderator

Always design for scalability.

---

# 14. Route Protection Rules

Public:

/
/login
/register

User:

/user/dashboard

Student:

/student/dashboard

Admin:

/admin/dashboard

Always check permissions.

---

# 15. Naming Convention

Components:

PascalCase

Example:

StudentDashboard.jsx

Variables:

camelCase

Example:

studentData

Folders:

kebab-case

Example:

student-dashboard

Environment Variables:

UPPER_CASE

Example:

JWT_SECRET

---

# 16. Git Rules

Branch Strategy:

main

develop

feature/*

Never commit secrets.

Never commit .env file.

---

# 17. Security Rules

Always:

* Validate Input
* Sanitize Data
* Protect Routes

Never:

* Trust Client Data
* Expose Secrets

---

# 18. UI Rules

Keep UI:

* Clean
* Responsive
* Accessible

Support:

* Desktop
* Tablet
* Mobile

---

# 19. Documentation Rules

When generating code:

Always create comments for:

* Complex Logic
* Authentication
* Middleware
* Database Operations

---

# 20. Final Rule

Never make architectural decisions without checking:

PROJECT_SRS.md

PROJECT_SRS.md is the Single Source of Truth.

END OF DOCUMENT
