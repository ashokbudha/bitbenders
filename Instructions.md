You are a senior full-stack engineer, React architect, Node.js backend architect, PostgreSQL database designer, authentication expert, and code refactoring specialist.

I already have an existing project with:
- frontend in React
- backend in Node.js / Express
- PostgreSQL running locally
- role-based platform structure
- existing student / hr / admin system direction
- existing codebase that I want to preserve as much as possible

I do NOT want a redesign from scratch unless the current implementation is fundamentally broken.
I want you to review my EXISTING codebase and CONFIGURE / COMPLETE all student-side features, along with the required backend and database integration.

## Main goal
I want the **student portal** to be fully functional end-to-end.

That means:
- all important student-facing features should be configured properly
- frontend, backend, and local PostgreSQL database should all be connected and aligned
- student flows should work in a real application, not only with mock frontend behavior

## Important instruction
Do NOT ignore the current codebase.
Use my current project as the source of truth.

You must:
- inspect the existing frontend
- inspect the existing backend
- inspect current route structure
- inspect current auth flow
- inspect current student pages/components
- inspect current mock data usage
- inspect the current database/backend setup if partially implemented
- then MODIFY and COMPLETE the system

Do NOT create an unrelated architecture that doesn’t fit the current app.

---

# STUDENT FEATURES TO CONFIGURE AND COMPLETE

I want all major student-side features configured and connected properly.

## 1) Authentication and student access
Ensure student authentication works correctly.

The system should support:
- student registration / signup
- student login / signin
- JWT authentication
- protected student routes
- fetching current authenticated student
- correct redirect to student dashboard after login
- proper logout behavior

The student side must work with real backend auth, not only frontend assumptions.

---

## 2) Student dashboard
The student dashboard should be properly configured and backed by real data.

The dashboard should support:
- welcome section
- selected career path
- completed career paths
- learning progress
- project progress
- capstone progress
- profile completion / CV strength
- verified skills count
- opportunities/match indicators if relevant
- recent activity

Make sure the dashboard is actually connected to backend APIs and database-backed state where appropriate.

---

## 3) First-time student path selection
If the student has not selected a path yet, the dashboard should not just show generic course choices.

It should support:
- first-time path selection state
- multiple career path cards
- selecting a path
- saving selected path to backend/database
- persistent path selection across sessions

There should also be:
- a “Still confused? Let’s explore” CTA
- redirect to Explore / Career Explorer page

This must be fully connected to backend and database.

---

## 4) Explore Roles / Career Explorer
The Explore page should be fully configured and functional, not just a placeholder.

For each role/path, support:
- overview
- responsibilities
- required skills
- extra / soft skills
- tools
- fit guidance
- roadmap preview
- sample projects
- opportunities linked to that role
- choose-this-path action

When a student chooses a path from Explore:
- save it properly
- persist it in backend/database
- update dashboard personalization

---

## 5) Learning / roadmap system
The learning section should be fully configured.

Support:
- selected career path roadmap
- roadmap steps/courses
- completed steps
- current progress
- locked/unlocked logic if relevant
- course detail retrieval
- progress persistence in database
- personalized recommendations by selected path

Learning progress must not remain purely frontend-only if backend/database support is needed.

---

## 6) Multi-project system for student
A student must be able to work on multiple projects.

The project system should support:
- project library
- recommended projects
- my projects
- completed projects
- project types:
  - mini
  - guided
  - capstone

Each student should be able to:
- start multiple projects
- track progress
- complete projects
- showcase completed projects on profile/CV

This must be backed by backend + PostgreSQL, not just mock frontend data.

---

## 7) Project Launchpad / guided project flow
Projects should not just be static cards.

Each project should support:
- project overview
- why it fits the student
- skills it proves
- project scope:
  - minimum
  - standard / portfolio-ready
  - advanced
- blueprint/project structure guidance
- milestones
- progress tracking
- help/checkpoint structure if current architecture supports it
- completion flow

Backend and database should store:
- project progress
- selected scope
- milestone completion
- project status

---

## 8) Final Capstone system
The final capstone project should be properly configured.

It should support:
- capstone intro
- recommended capstone ideas
- custom capstone proposal submission
- proposal fields
- proposal status
- capstone selection
- approval / revision states if current system supports it
- capstone milestones
- final project completion
- capstone showcase

This must be connected to backend and database tables/models properly.

---

## 9) Profile / CV system
The student profile and CV should be fully connected.

The system should support:
- profile view page
- edit profile form
- profile data persistence
- CV view based on saved backend data
- multiple completed career paths reflected in CV
- verified skills
- self-declared / unverified skills
- pending verification skills
- completed projects
- capstone highlight
- portfolio/GitHub/LinkedIn links

Important:
If the student edits profile details, the updated data must show in:
- profile view
- CV view
- any summary/profile widgets on dashboard

Fix any stale data, schema mismatch, or unsynced profile/CV logic.

---

## 10) Skills system
The student skill system should be properly configured.

Support:
- skills from multiple completed career paths
- manually added skills
- verification status per skill:
  - verified
  - self-declared / unverified
  - pending verification
- project-based skill verification flow
- display of verified vs unverified skills in profile/CV

Backend and database should support these distinctions cleanly.

---

## 11) Opportunities / jobs module
The student opportunities section should be properly configured.

Support:
- opportunities listing
- matching by selected path / skills / projects if already in architecture
- internship / trainee / junior role types
- save / bookmark / apply flow if relevant
- showing eligibility / readiness if supported
- linking to student profile progress

Do NOT leave this as frontend-only placeholder data if backend integration is expected.

---

## 12) Student settings / account basics
If settings/account pages exist, configure them properly too.

May include:
- basic account info
- password change flow if supported
- logout
- notification preferences placeholder if useful

---

# BACKEND REQUIREMENTS

I want the student portal backed by a real Node.js / Express backend.

You must inspect the current backend and either complete it or refactor it carefully.

## Backend should support:
- clean modular architecture
- routes
- controllers
- services
- middleware
- validation
- auth middleware
- role middleware
- PostgreSQL integration
- proper error handling
- API responses aligned with frontend expectations

Use the existing backend if already partially present.
Do not rewrite everything unnecessarily.

---

# AUTHENTICATION BACKEND REQUIREMENTS

Use JWT authentication properly.

Support:
- register/signup
- login/signin
- logout
- current user / me endpoint
- protected student routes
- role-based route protection
- password hashing
- secure auth middleware

If refresh-token structure is already in place or easy to add cleanly, support it.
If not, at minimum ensure robust access-token auth is working properly.

---

# DATABASE REQUIREMENTS (POSTGRESQL LOCAL)

Use the existing local PostgreSQL setup and configure the database schema properly.

Create or improve the required schema/models/tables for student features.

At minimum, consider support for:
- users
- roles
- student profiles
- career paths
- student career path progress
- roadmap/course progress
- project templates
- student projects
- capstone proposals
- capstone progress
- skills
- student skills
- verification status
- opportunities / saved opportunities / applications if already needed
- portfolio/CV data references if relevant

If you need migrations or schema setup, provide them.

The final system should run locally with PostgreSQL.

---

# IMPORTANT IMPLEMENTATION PRINCIPLES

Please follow these carefully:

### 1. Modify the existing codebase
Do NOT rebuild the whole app unless necessary.

### 2. Use the current project as source of truth
Frontend and backend must align with the existing app.

### 3. Configure student features end-to-end
Do not leave features half-implemented.

### 4. Keep frontend, backend, and database aligned
No mismatched field names or disconnected flows.

### 5. Fix root causes, not just UI symptoms
If student features are broken because of backend/data issues, fix the full flow.

### 6. Keep architecture scalable
This should support future HR/admin expansion as well.

---

# WHAT I WANT YOU TO DO WHEN I PASTE MY CODE

When I paste my current code, do ALL of the following:

### A. Review the existing codebase
Inspect:
- student frontend pages/components
- React routes/navigation
- backend routes/controllers/services
- authentication logic
- role handling
- PostgreSQL connection/config
- current database schema/models
- any mock data still being used
- API integration assumptions

### B. Identify gaps and broken/incomplete areas
Explain:
- what student features are incomplete
- what is frontend-only
- what backend is missing
- what database schema is missing
- what integration problems exist

### C. Recommend the best implementation approach
Choose the best way to configure the full student portal in the current architecture.

### D. Refactor and add code
Do NOT only describe what to do.
Actually provide the updated/refactored code for:
- frontend changes
- backend changes
- database schema/migrations
- API routes/controllers/services
- auth middleware
- integration layer

### E. Preserve and extend existing structure
Reuse as much of the working project as possible.

---

# REQUIRED OUTPUT STRUCTURE

When I paste my code, respond in this exact structure:

1. Existing codebase review
2. Student feature gaps found
3. Recommended implementation approach
4. Backend architecture updates
5. PostgreSQL schema / model design
6. API route design
7. Frontend changes
8. Backend changes
9. Database/migration changes
10. Auth/JWT/RBAC configuration details
11. Integration notes
12. Final checklist to verify everything works

---

# IMPORTANT FINAL INSTRUCTION

Do NOT leave the student portal partially configured.

I want the student system fully configured end-to-end using:
- React frontend
- Node.js / Express backend
- local PostgreSQL database
- JWT authentication

The student portal should support:
- registration/login
- dashboard
- path selection
- explore roles
- learning roadmap
- multi-project system
- project launchpad
- capstone
- profile/CV
- verified/unverified skills
- opportunities
- backend and database persistence

I will paste my existing code next.
Review it carefully and directly modify it to configure all student features, backend, and database in a clean, scalable, and maintainable way.
``