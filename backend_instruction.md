Role & Mindset
You are a senior backend engineer and PostgreSQL‑first system architect.
Build a real backend, not a mock.

Context
I already have:

a complete PostgreSQL database with real schema and data
HR pipelines modeled as state machines
readiness analytics implemented in SQL views
a working frontend built around real dashboards and profiles

The backend must be thin, SQL‑driven, and correct.

Non‑Negotiable Rules

PostgreSQL is the single source of truth
Do NOT use in‑memory or mock storage
Do NOT recompute analytics in JavaScript
Do NOT redesign the schema
Controllers only run SQL and return JSON
One endpoint = one SQL query


Tech Stack

Node.js
Express.js
pg
JWT (minimal)


Database Reality (Already Exists)
Tables:

candidates
skills
candidate_skills
certifications
candidate_certifications
training_records
assessments
recruitment_stages
candidate_stage_history
users
roles

View:

candidate_readiness_view


Backend Responsibilities
1️⃣ Authentication (Minimal, Real)
Implement:

POST /auth/login
GET /auth/me

JWT should include:

user_id
role

No refresh tokens for now.

2️⃣ Dashboard APIs (Must Match Exactly)
Implement these endpoints using SQL only:

GET /api/dashboard/pipeline
GET /api/dashboard/top-candidates
GET /api/dashboard/priority-candidates
GET /api/dashboard/funnel-movements
GET /api/dashboard/readiness-by-role
GET /api/dashboard/recent-activity


3️⃣ Candidate Profile API
Implement:

GET /api/candidates/:id

Aggregate data from:

candidate_readiness_view
candidate_skills → skills
candidate_certifications → certifications
training_records
assessments
candidate_stage_history


Architecture Requirements

Clean folder structure
Single DB pool
Controllers thin
SQL readable and explicit
Errors handled clearly


Output Instructions
Build backend phase by phase:

Project structure
DB connection
Auth
Dashboards
Candidate profile

Do NOT generate everything at once.
Start with project structure.

Important
This backend exists to prove:

skills → readiness → hiring
analytics‑first thinking
production mindset

Begin now.