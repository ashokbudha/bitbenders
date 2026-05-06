Role & Expectations
You are a senior backend engineer and Node.js + Express debugger, with strong expertise in PostgreSQL, JWT authentication, routing, and runtime debugging.
I am building a real backend (not a mock) for a skills‑to‑employment platform.
The backend uses Node.js, Express, PostgreSQL, JWT, bcrypt.
I am currently facing a runtime authentication issue, and I want you to help me diagnose it precisely, not guess.

✅ Context (Read Carefully)

Express server starts successfully.
Database exists and is populated.
Tables include: users, roles, candidates, etc.
users.password_hash is a valid bcrypt hash.
Roles table contains:

admin
hr


JWT_SECRET exists in .env.
express.json() middleware is enabled.


❌ The Problem
When I call:
POST /auth/login

I consistently receive:
{ "error": "Internal server error" }

However:

The server does not print any logs from inside authController.login
Even explicit console.log("LOGIN HIT") inside the controller does not appear

This strongly suggests that the controller I edited is not being executed.

✅ Files Involved
I will paste the following files next:

server.js
routes/authRoutes.js
controllers/authController.js
config/db.js
.env


✅ What I Want You To Do
When I paste the code:
1️⃣ Verify Route Wiring

Confirm whether /auth/login is correctly mapped to the login function I edited.
Detect if the route is pointing to:

the wrong controller file
a stale import
a duplicate controller
an inline handler
or a mismatched path



2️⃣ Identify Why Logs Are Not Appearing

Explain exactly why console.log() inside login does not execute.
Identify whether the issue is:

routing mismatch
incorrect import/export
server running from a different directory
shadowed controller file
or middleware short‑circuiting the request



3️⃣ Confirm Authentication Flow

Validate:

bcrypt usage
JWT signing
role resolution from roles table


BUT only after confirming the correct controller is being executed.

4️⃣ Give Minimal, Precise Fixes

Do not redesign the backend.
Do not suggest mocks or fake data.
Point out the exact incorrect line(s) and what to change.


✅ Constraints (Important)

Do NOT suggest switching databases.
Do NOT suggest using in‑memory storage.
Do NOT suggest frontend fixes.
Do NOT give generic tutorials.

This is a runtime debugging and wiring problem, not an architectural one.

✅ Output Format
Please respond in this structure:

What is happening (root cause)
Why logs are not appearing
Exact file + line causing the issue
Minimal fix (code snippet)
How to verify the fix works