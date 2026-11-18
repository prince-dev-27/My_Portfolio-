# API Testing Report

This report documents the discovered Express REST API endpoints, their specifications, authentication requirements, and test results.

## API Endpoint Inventory

| HTTP Method | Endpoint | Auth Required | Description | Test Status | Status Code (Success) | Status Code (Error) |
|---|---|---|---|---|---|---|
| **GET** | `/api/auth/me` | Yes (Bearer) | Get current authenticated admin info | PASS | 200 | 401 |
| **POST** | `/api/auth/login` | No | Admin login credentials verification | PASS | 200 | 400, 401 |
| **GET** | `/api/projects` | No | Get all public projects | PASS | 200 | 500 |
| **POST** | `/api/projects` | Yes (Bearer) | Create new project | PASS | 201 | 400, 401 |
| **PUT** | `/api/projects/:id` | Yes (Bearer) | Update project by ID | PASS | 200 | 400, 404 |
| **DELETE** | `/api/projects/:id` | Yes (Bearer) | Delete project by ID | PASS | 200 | 404, 500 |
| **GET** | `/api/skills` | No | Get all skills | PASS | 200 | 500 |
| **POST** | `/api/skills` | Yes (Bearer) | Create skill | PASS | 201 | 400, 401 |
| **PUT** | `/api/skills/:id` | Yes (Bearer) | Update skill | PASS | 200 | 400, 404 |
| **DELETE** | `/api/skills/:id` | Yes (Bearer) | Delete skill | PASS | 200 | 404, 500 |
| **GET** | `/api/experience` | No | Get experience records | PASS | 200 | 500 |
| **POST** | `/api/experience` | Yes (Bearer) | Create experience | PASS | 201 | 400, 401 |
| **PUT** | `/api/experience/:id` | Yes (Bearer) | Update experience | PASS | 200 | 400, 404 |
| **DELETE** | `/api/experience/:id` | Yes (Bearer) | Delete experience | PASS | 200 | 404, 500 |
| **GET** | `/api/education` | No (supports `?all=true`) | Get education records (published or all) | PASS | 200 | 500 |
| **GET** | `/api/education/:id` | No | Get single education record | PASS | 200 | 404, 500 |
| **POST** | `/api/education` | Yes (Bearer) | Create education record | PASS | 201 | 400, 401 |
| **PUT** | `/api/education/:id` | Yes (Bearer) | Update education record | PASS | 200 | 400, 404 |
| **DELETE** | `/api/education/:id` | Yes (Bearer) | Delete education record | PASS | 200 | 404, 500 |
| **GET** | `/api/testimonials` | No (supports `?all=true`) | Get testimonials | PASS | 200 | 500 |
| **POST** | `/api/testimonials` | No | Submit testimonial (pending approval) | PASS | 201 | 400 |
| **PUT** | `/api/testimonials/:id` | Yes (Bearer) | Approve/update testimonial | PASS | 200 | 400, 404 |
| **DELETE** | `/api/testimonials/:id` | Yes (Bearer) | Delete testimonial | PASS | 200 | 404, 500 |
| **GET** | `/api/contact` | Yes (Bearer) | Get contact messages | PASS | 200 | 401 |
| **POST** | `/api/contact` | No | Send contact message | PASS | 201 | 400 |
| **DELETE** | `/api/contact/:id` | Yes (Bearer) | Delete contact message | PASS | 200 | 404, 500 |

---

## API Negative & Validation Testing Results
- **Missing Auth Token on Protected Endpoints (`POST/PUT/DELETE /api/education`, etc.)**: Properly returns `401 Unauthorized`.
- **Invalid ID Format**: Mongoose casting error handled gracefully by catch blocks returning `500` or `404`.
- **Missing Required Fields**: Mongoose validation throws validation error returning `400 Bad Request`.
- **Currently Studying Date Logic**: Pre-save hook correctly nullifies `endDate` when `currentlyStudying` is true.
