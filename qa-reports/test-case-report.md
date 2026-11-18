# Detailed Test Case Report

This register documents all executed test cases across frontend, backend, Admin Panel, APIs, and security domains.

| Test ID | Module | Test Scenario | Test Type | Status | Severity | Notes / Observation |
|---|---|---|---|---|---|---|
| TC-FE-01 | Frontend | Public portfolio initial load & rendering | Positive | PASS | High | All sections rendered correctly with no layout shift |
| TC-FE-02 | Frontend | Navigation links scrolling & active state | Positive | PASS | Medium | Smooth scrolling to anchor sections verified |
| TC-FE-03 | Frontend | Mobile responsive menu toggle | Positive | PASS | High | Hamburger menu opens/closes correctly |
| TC-FE-04 | Frontend | Education section dynamic fetch & rendering | Positive | PASS | High | Fetches published records and renders timeline |
| TC-FE-05 | Frontend | Empty state handling for unpublished education | Positive | PASS | Medium | Section hidden cleanly when zero records published |
| TC-FE-06 | Frontend | CustomSelect component interaction & keyboard nav | Positive | PASS | Medium | Arrow keys, Enter, Escape, and outside click verified |
| TC-FE-07 | Frontend | Viewport responsiveness at 320px width | Edge Case | FAIL | Medium | Slight horizontal padding compression on extreme narrow width |
| TC-BE-01 | Backend | MongoDB connection and schema validation | Positive | PASS | Critical | Mongoose models enforce required fields and types |
| TC-BE-02 | Backend | JWT authentication middleware validation | Security | PASS | Critical | Invalid or missing token returns 401 Unauthorized |
| TC-BE-03 | Backend | Password hashing on admin model | Security | PASS | High | bcrypt hashing verified on admin credentials |
| TC-API-01 | API | GET /api/projects (public) | Positive | PASS | High | Returns 200 with list of projects |
| TC-API-02 | API | GET /api/education (public vs all) | Positive | PASS | High | Returns only published records by default |
| TC-API-03 | API | POST /api/education (unauthorized) | Negative | PASS | Critical | Returns 401 when token missing |
| TC-API-04 | API | POST /api/education (valid admin) | Positive | PASS | Critical | Returns 201 Created and persists record |
| TC-API-05 | API | PUT /api/education/:id (valid admin) | Positive | PASS | High | Updates record successfully |
| TC-API-06 | API | DELETE /api/education/:id (valid admin) | Positive | PASS | High | Removes record successfully |
| TC-API-07 | API | GET /api/education/:id (invalid ID format) | Negative | PASS | Medium | Returns 500/404 handled gracefully |
| TC-ADM-01 | Admin | Admin login with valid credentials | Positive | PASS | Critical | Redirects to dashboard and saves JWT |
| TC-ADM-02 | Admin | Admin login with invalid password | Negative | PASS | Critical | Rejects login with error message |
| TC-ADM-03 | Admin | Direct route access to /admin/dashboard without auth | Security | PASS | Critical | Redirects to /admin/login |
| TC-ADM-04 | Admin | Education management CRUD operations | Positive | PASS | Critical | Create, edit, delete, publish toggle all work |
| TC-ADM-05 | Admin | Education logo file upload and size check | Positive | PASS | High | Base64 preview & size validation working <= 5MB |
| TC-ADM-06 | Admin | Currently studying checkbox logic | Positive | PASS | High | Disables end date and sets value appropriately |
| TC-SEC-01 | Security | CORS configuration check | Security | PASS | High | CORS enabled correctly for API access |
| TC-SEC-02 | Security | NoSQL injection payload resistance | Security | PASS | High | Mongoose schema type coercion prevents injection |
| TC-DB-01 | Database | Timestamps auto-generation (`createdAt`, `updatedAt`) | Positive | PASS | Medium | Verified across all models |
| TC-DB-02 | Database | Duplicate prevention / unique constraints | Positive | PASS | Medium | Handled via schema and API responses |
