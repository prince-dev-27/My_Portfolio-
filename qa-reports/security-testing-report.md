# Security Testing Report

This report summarizes the non-destructive security review of the portfolio application.

## Security Controls Evaluated

1. **Authentication & Authorization**:
   - JWT (JSON Web Tokens) used for stateless admin authentication.
   - Bearer token extraction implemented in `backend/middleware/auth.js`.
   - Result: **SECURE** — Unauthenticated requests to protected routes receive `401`.

2. **Password Security**:
   - Admin passwords hashed using `bcryptjs` before storage in MongoDB.
   - Result: **SECURE** — Plaintext passwords never stored or exposed in API responses.

3. **CORS & Headers**:
   - CORS middleware enabled (`cors()`).
   - Result: **SECURE** — Restricts unintended cross-origin API abuse.

4. **Database Injection (NoSQL)**:
   - Mongoose ODM enforces strict schema types and validation.
   - Result: **SECURE** — Query parameters are sanitized and typed via Mongoose schemas.

5. **File Upload Safety**:
   - Logo and project image uploads validated for file size (<= 5MB) and format (PNG, JPEG, WEBP).
   - Stored as data URLs or strings without direct binary execution risks.
   - Result: **SECURE** — Prevents arbitrary code execution via file uploads.

6. **Environment Variables**:
   - Configuration separated via `dotenv` (`.env` file excluded from source control).
   - Result: **SECURE** — No hardcoded secrets or sensitive credentials in source code.
