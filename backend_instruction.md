Role
You are a senior backend engineer responsible for delivering a working Node.js + Express + PostgreSQL backend, not explanations.

✅ Verified Current State (DO NOT REDO)
The following are already confirmed working:

PostgreSQL database leapfrog_connect is connected using a real app user.
JWT authentication works.
/auth/login returns a valid token.
/auth/me works with Authorization: Bearer <token>.
JWT middleware is implemented as verifyToken.
Route /api/dashboard/pipeline currently returns { "ok": true } via a temporary test controller.

Do NOT modify authentication, middleware, or DB connection logic.

🎯 Objective
Replace the temporary dashboard test endpoint with fully implemented, SQL‑backed dashboard APIs that work immediately when copied into the project.

🗄️ Database Reality (Source of Truth)
Use only existing tables/views:

Tables:

candidates
recruitment_stages
candidate_stage_history


Views:

candidate_readiness_view



Key columns:

candidates.current_stage_id
recruitment_stages.id, name, sort_order
candidate_stage_history.stage_id, changed_at
candidate_readiness_view.readiness_score, target_role, full_name


✅ Required Endpoints (ALL must be implemented)

































EndpointDescription/api/dashboard/pipelineCandidate count per stage/api/dashboard/top-candidatesTop 10 by readiness/api/dashboard/priority-candidatesreadiness_score ≥ 80/api/dashboard/funnel-movementsStage transition counts/api/dashboard/readiness-by-roleAvg readiness per role/api/dashboard/recent-activityLatest stage changes

✅ SQL BEHAVIOR (MUST MATCH EXACTLY)

Pipeline: LEFT JOIN recruitment_stages → candidates on current_stage_id, grouped and ordered by sort_order.
Top Candidates: Select from candidate_readiness_view, ordered by readiness_score DESC, LIMIT 10.
Priority Candidates: Same view, WHERE readiness_score >= 80.
Funnel Movements: Join candidate_stage_history with recruitment_stages, aggregate movement counts, ordered by sort_order (optionally last 30 days).
Readiness by Role: GROUP BY target_role, compute ROUND(AVG(readiness_score)::numeric, 2).
Recent Activity: Join candidate_stage_history, candidates, and recruitment_stages, ordered by changed_at DESC.


✅ What You MUST Produce
1️⃣ dashboardController.js

Export exactly these functions:

getPipelineOverview
getTopCandidates
getPriorityCandidates
getFunnelMovements
getReadinessByRole
getRecentActivity


Each function:

Uses pool.query(...)
Wrapped in try/catch
Returns res.json(rows)



2️⃣ dashboardRoutes.js

Imports functions by exact name (ESM‑strict).
Protects every route using verifyToken.
Correctly maps /api/dashboard/* paths.


🔍 Self‑Testing Requirement (MANDATORY)
For each endpoint, reason as if you are running:

curl http://localhost:5000/api/dashboard/<endpoint> \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiaHIiLCJpYXQiOjE3NzgwNzU2OTEsImV4cCI6MTc3ODE2MjA5MX0.IM_iGCBSXDwgq7T8C4hmClt_X_hcz0492jbj9wMol1c"


  Confirm internally that:

the route exists
middleware runs
controller executes
SQL returns rows
JSON is returned (no HTML, no errors)


🚫 Constraints

❌ Do NOT redesign auth
❌ Do NOT add mock data
❌ Do NOT invent schema
❌ Do NOT use ORM
❌ Do NOT export unused functions


✅ Output Format (STRICT)
Respond in this exact order:

Complete dashboardController.js
Complete dashboardRoutes.js
Brief SQL explanation per endpoint
Final verification checklist


Assume the code will be copy‑pasted and executed immediately.
Produce a backend that works without further debugging.
Begin now.