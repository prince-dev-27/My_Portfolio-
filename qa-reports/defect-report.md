# Bug and Defect Report

This register contains all defects identified during the QA audit.

---

### DEF-01: Minor Horizontal Padding Compression on Ultra-Small Viewports (320px)
- **Module:** Frontend UI / Responsive Layout
- **Severity:** Medium
- **Priority:** Low
- **Reproduction Steps:**
  1. Open public portfolio in browser developer tools.
  2. Set viewport width to 320px (iPhone SE / small mobile).
  3. Inspect navbar branding and hero section padding.
- **Expected Result:** Generous side padding with zero horizontal overflow or text clipping.
- **Actual Result:** Padding shrinks to minimum, causing slight text crowding on specific 320px viewports.
- **Evidence:** Visual inspection at 320px width.
- **Impact:** Minor aesthetic degradation on legacy 320px screens.
- **Suggested Resolution:** Ensure minimum 16px (`px-4`) container padding across all breakpoints.

---

### DEF-02: Missing Graceful Session Expiration Notification in Admin Panel
- **Module:** Admin Panel / Authentication
- **Severity:** Medium
- **Priority:** Medium
- **Reproduction Steps:**
  1. Log into Admin Dashboard.
  2. Invalidate or expire the JWT token in local storage / backend.
  3. Attempt to perform a CRUD action (e.g., add education record).
- **Expected Result:** Clear modal or banner prompting re-authentication before API failure.
- **Actual Result:** API returns 401 Unauthorized, caught by error handler alert("Save failed: ...").
- **Evidence:** API error response handling in `AdminDashboard.jsx`.
- **Impact:** User experience during session timeout could be smoother (automatic redirect to login).
- **Suggested Resolution:** Add global Axios response interceptor to detect 401 and redirect to `/admin/login`.

---

### DEF-03: Focus Ring Styling Alignment on CustomSelect Keyboard Navigation
- **Module:** Custom Dropdown Component (`CustomSelect.jsx`)
- **Severity:** Low
- **Priority:** Low
- **Reproduction Steps:**
  1. Navigate to admin form with `CustomSelect`.
  2. Use Tab key to focus dropdown and press ArrowDown to open.
  3. Navigate options via keyboard.
- **Expected Result:** Highlighted option matches focus ring style.
- **Actual Result:** Functional and correct, but focus ring on closed combobox could be more prominent.
- **Evidence:** Component interaction test.
- **Impact:** Minor accessibility polish.
- **Suggested Resolution:** Enhance Tailwind focus ring classes (`focus:ring-2 focus:ring-[#60A5FA]`).
