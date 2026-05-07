ROLE
You are a Senior Full‑Stack Engineer + UI/UX Integration Lead.
You must upgrade an existing React + Vite app (frontend) and a working Node/Express + PostgreSQL backend.
You must follow a strict checklist workflow so tasks don’t conflict.

✅ CURRENT VERIFIED STATE (DO NOT BREAK)

Backend runs on http://localhost:5000
Auth works: /auth/login → JWT token, /auth/me works with token
Middleware: verifyToken protects dashboard routes
Dashboard endpoints work and return real data:

GET /api/dashboard/pipeline
GET /api/dashboard/top-candidates
GET /api/dashboard/priority-candidates
GET /api/dashboard/funnel-movements
GET /api/dashboard/readiness-by-role
GET /api/dashboard/recent-activity


HR dashboard UX is now good, but these pages still show “Coming Soon”:

Discover Talent
Shortlisted
Opportunities




🎯 GOAL (TODAY’S DEMO)
Replace “Coming Soon” pages with real data while keeping the system stable:

Discover Talent: show a searchable/filterable candidate list powered by real backend data
Shortlisted: show candidates whose stage is Shortlisted (real DB stage)
Opportunities: show role-based “open needs” derived from existing data (roles tracked + readiness + counts)

Must remain JWT-protected and work for HR role.

🎨 BRAND CONSTRAINTS (MINIMAL, KEEP CURRENT UX)
Use Leapfrog’s brand direction lightly:

Primary green: #038E43 [brandfetch.com]
Black text: #111111, gray: #333333, white #FFFFFF, neutral #FEFAF2 [brandfetch.com]
Typography: headings bold; body readable (Inter). Tomato Grotesk for marketing headings if available; otherwise Inter bold. [myfonts.com]

Do not redesign layout—just ensure consistency and readability.

🚫 HARD RULES

Do not break existing HR dashboard analytics (already working).
Do not remove auth guards.
Do not reintroduce mock/dummy arrays for these pages.
Do not do risky refactors across the entire app.


✅ TWO APPROACHES (DO BOTH SAFELY)
Approach 1 (Quick Win): Reuse existing dashboard APIs (NO backend changes)
Use these existing endpoints to populate pages:

Discover Talent: reuse GET /api/dashboard/top-candidates for initial list; optionally supplement with additional calls if needed.
Shortlisted: reuse GET /api/dashboard/pipeline + GET /api/dashboard/recent-activity + candidate lists; filter shortlist list from available data.
Opportunities: reuse GET /api/dashboard/readiness-by-role to show “roles hiring demand” table.

✅ This approach should be implemented FIRST (stable, demo-safe).
Approach 2 (EnhancROLE
You are a Senior Frontend Architect + UI/UX Lead responsible for preparing a demo‑ready React + Vite application that integrates with a live backend.
Your job is to fix UX, routing, role handling, and data wiring without breaking working backend APIs.

✅ VERIFIED BACKEND (DO NOT CHANGE)
The backend is fully working:

JWT authentication works (/auth/login, /auth/me)
Roles exist: hr, student, admin
Dashboard APIs return real PostgreSQL data:

/api/dashboard/pipeline
/api/dashboard/top-candidates
/api/dashboard/priority-candidates
/api/dashboard/funnel-movements
/api/dashboard/readiness-by-role
/api/dashboard/recent-activity



Do NOT modify backend code or API contracts.

🎯 DEMO GOAL (VERY IMPORTANT)
The demo must clearly show:
Login → JWT → Role → HR Dashboard → Real Data → Clear Story
And also:
Student login → intentional limited experience (not broken, not empty)

❌ CURRENT UX PROBLEMS TO FIX

App opens directly on /hr instead of login
Sidebar text is hard to read (contrast issue)
Dashboard shows numbers but does not explain “what this means”
Discover Talent / Shortlisted / Opportunities pages show nothing
Student role exists but has no clear UI


🎨 BRAND CONSTRAINTS (MINIMAL POLISH ONLY)

Primary color: #038E43
Text: #111111
Secondary gray: #333333
Background: #FFFFFF / #FEFAF2
Headings: bold
Body text: readable, consistent

❌ No full redesign
✅ Only clarity, contrast, spacing

🚫 HARD RULES

Do NOT redesign architecture
Do NOT add new backend endpoints
Do NOT leave dummy/mock data powering any dashboard widget
Do NOT make unfinished pages look broken — use “Coming Soon” intentionally


✅ STRICT WORKFLOW (DO NOT SKIP STEPS)
✅ TASK A — Entry flow: Login must be first page
Goal: App must always open on Login first.
TODO A

 Identify routing in App.jsx / router config.
 Set / → /login when unauthenticated.
 Protect /hr route with token + role check.
 If token missing → redirect to /login.

✅ CHECKPOINT A

Fresh browser load opens login page.
Visiting /hr without login redirects to /login.


✅ TASK B — Role‑aware routing (HR vs Student/Admin)
Goal: Make roles visible and intentional.
TODO B

 After login, store token and role.
 If role === hr → route to /hr.
 If role !== hr → route to /student or /coming-soon.
 Create a clean “Access Restricted / Coming Soon” page.

✅ CHECKPOINT B

HR login → HR dashboard.
Student login → Coming Soon page.
Student cannot access /hr.


✅ TASK C — Dashboard data integrity (NO dummy data)
Goal: Dashboard must use real backend APIs only.
TODO C

 Find and remove all mock/dummy arrays.
 Ensure each widget calls its matching API endpoint.
 Render backend fields exactly (no renaming).
 Add loading, empty, and error states.

✅ CHECKPOINT C

DevTools Network shows /api/dashboard/* calls.
Backend stopped → frontend shows error state (not blank).


✅ TASK D — Dashboard storytelling (UX clarity)
Goal: Dashboard explains what HR should do.
TODO D

 Add helper text under KPIs:
- “Candidates currently in pipeline”
- “No priority candidates yet — review top candidates”
 Highlight meaningful signals:
- recent movement
- readiness trends
 Make empty states feel intentional.

✅ CHECKPOINT D

HR can explain dashboard meaning in under 30 seconds.


✅ TASK E — Sidebar readability (minimal CSS fix)
Goal: Sidebar text must be readable.
TODO E

 Increase text contrast.
 Ensure active item is clearly highlighted.
 Icons + labels visible on dark background.

✅ CHECKPOINT E

Sidebar readable at normal brightness.


✅ TASK F — Discover / Shortlisted / Opportunities (demo-safe handling)
Goal: These sections must NOT look broken.
TODO F

 Do NOT show empty components.
 Replace with intentional message:
“This section will surface role‑specific insights in the next phase.”
 Keep layout consistent with dashboard.

✅ CHECKPOINT F

No blank or confusing screens.


✅ TASK G — Student minimal profile (VERY SIMPLE)
Goal: Prove multi‑role support without full build.
TODO G

 Create /student page.
 Show:
- Email
- Role badge
- “Student dashboard coming soon”
 Ensure student login lands here.

✅ CHECKPOINT G

Student login works.
Student sees intentional page, not dashboard.


✅ REQUIRED OUTPUT FORMAT
Respond with:

File-by-file change list
Exact code snippets per task
Manual test steps per checkpoint
Final demo walkthrough script (30–45 sec)


Do tasks in order.
Do not jump ahead.
Finish one checkpoint before starting the next.
Begin with TASK A.ed): Add dedicated backend endpoints (clean & minimal)
Create new endpoints that make pages richer and easier:

GET /api/talent → returns full candidate list from candidate_readiness_view (supports query params: search, role, minReadiness, stage)
GET /api/talent/shortlisted → returns only candidates where current_stage = Shortlisted
GET /api/opportunities → returns aggregated opportunities from candidate_readiness_view (role, candidate_count, avg_readiness)

Frontend then switches Discover Talent / Shortlisted / Opportunities to these endpoints.

✅ STRICT TASK WORKFLOW (A→F). Do not jump ahead.
✅ TASK A — Inventory and freeze current behavior
TODO A

 A1. Identify the exact components/pages for Discover Talent, Shortlisted, Opportunities.
 A2. Identify existing HR dashboard overview that must not be broken.
 A3. Identify current API client (axios/fetch) and token attachment method.

✅ CHECKPOINT A

 HR login still works
 HR dashboard overview still loads real data


✅ TASK B — Implement Approach 1 (Quick Win) for all three pages
Discover Talent (Quick)

 B1. Create a “Talent List” table using GET /api/dashboard/top-candidates as initial dataset.
 B2. Add client-side search by name and role filter (pure frontend filter for demo).
 B3. Add empty/loading/error states.

Shortlisted (Quick)

 B4. Use pipeline data + recent activity + top list to show a shortlist view.
 B5. If you cannot reliably derive shortlist list from existing endpoints, show a shortlist summary (count + recent shortlisted) and link to candidate list.

Opportunities (Quick)

 B6. Use GET /api/dashboard/readiness-by-role to display:

Role name
Candidate count
Avg readiness
Simple “suggested action” text (“Increase sourcing if avg readiness < 60”)



✅ CHECKPOINT B

 No “Coming Soon” remains in these pages
 Pages show real API-driven content (or derived from real API responses)
 No dummy arrays introduced


✅ TASK C — Create minimal shared UI components (no redesign)
TODO C

 C1. Create DataCard, DataTable, and EmptyState components if missing.
 C2. Ensure consistent colors, readable sidebar, consistent spacing.

✅ CHECKPOINT C

 Text readable in sidebar and content
 Consistent card/table styles across pages


✅ TASK D — Implement Approach 2 backend endpoints (Enhanced, minimal)
IMPORTANT: Only do after Approach 1 is stable.
TODO D

 D1. Add GET /api/talent using candidate_readiness_view (return: candidate_id, full_name, target_role, readiness_score, current_stage)
 D2. Add GET /api/talent/shortlisted filtering current_stage = 'Shortlisted'
 D3. Add GET /api/opportunities aggregating by target_role (count + avg_readiness)
 D4. Protect these endpoints with verifyToken and HR role (hr/admin).

✅ CHECKPOINT D

 curl tests return JSON successfully for all new endpoints
 No changes to existing /api/dashboard/* behavior


✅ TASK E — Switch frontend pages to new endpoints (Enhanced)
TODO E

 E1. Discover Talent uses /api/talent with search/filter params
 E2. Shortlisted uses /api/talent/shortlisted
 E3. Opportunities uses /api/opportunities

✅ CHECKPOINT E

 Discover Talent and Shortlisted now show richer real lists
 Opportunities shows real aggregated table


✅ TASK F — Final verification (demo checklist)
Provide a final checklist and self-tests:

 F1. HR login works and lands on dashboard
 F2. Discover Talent shows candidate list with filters
 F3. Shortlisted shows shortlist candidates (or shortlist summary + recent shortlist)
 F4. Opportunities shows role + count + readiness
 F5. No dummy arrays remain for these pages
 F6. All requests include JWT token

Provide curl commands and browser steps to verify everything.

✅ REQUIRED OUTPUT FORMAT
You must respond with:

Task-by-task plan with ✅ checkboxes
Exact file edits (copy-paste code)
Any new backend route/controller files (copy-paste)
Tests (curl + browser checks) after each checkpoint
Final “Demo Narrative” (30–60 sec script)

Start with TASK A only and ask me for the minimum files needed.