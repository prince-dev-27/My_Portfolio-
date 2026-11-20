# Prince Undaviya — Full Stack Developer Portfolio

A professional, modern, fully functional Full Stack Developer Portfolio and Admin Dashboard built for **Prince Undaviya**, strictly adhering to the Midnight Navy + Electric Blue design system with **absolute zero gradients**.

---

## 🎨 Strict Design System

- **Midnight Navy + Electric Blue Identity**
  - Main Background: `#0B1220`
  - Secondary Background / Card Background: `#111C2F`
  - Elevated Surface: `#1B2A41`
  - Primary Accent: `#2563EB`
  - Secondary Accent: `#60A5FA`
  - Primary Text: `#F8FAFC`
  - Secondary Text: `#94A3B8`
  - Borders: `#26364D`
  - Success: `#22C55E` | Error: `#EF4444` | Warning: `#F59E0B`

- **Absolute No-Gradient Rule**
  - Zero gradient color combinations anywhere in the application.
  - Solid colors only across all cards, buttons, navigation, modals, badges, and headers.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS v3** (Custom configured with Midnight Navy palette)
- **Framer Motion** (Smooth scroll reveal & interactive animations)
- **Lucide React** (Clean professional iconography)
- **Axios** (REST API integration)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database schemas for Projects, Skills, Experience, Testimonials, Messages, and Admin)
- **JSON Web Tokens (JWT) & bcryptjs** (Secure authentication for Admin Dashboard)

---

## 🚀 Local Development Instructions

The application runs using separate backend and frontend development servers with dedicated environment configuration.

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection URI.

---

### 1. Environment Setup (Crucial & Secure)

Both frontend and backend rely on environment files. Templates (`.env.example`) are version-controlled, while your private `.env` files are strictly excluded via `.gitignore`.

#### Backend Environment Setup:
1. Navigate to `backend/` and copy the example template:
   ```bash
   cd backend
   cp .env.example .env   # Or 'copy .env.example .env' in Windows CMD
   ```
2. Verify or customize variables in `backend/.env`:
   - `PORT`: Default `5000`
   - `NODE_ENV`: `development` (set to `production` in production environments)
   - `MONGO_URI`: `mongodb://127.0.0.1:27017/prince-portfolio`
   - `JWT_SECRET`: A secure 256-bit cryptographically random key. (Generate a new one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `JWT_EXPIRES_IN`: Token validity period (e.g. `7d`)
   - `CLIENT_URL`: Allowed frontend origin(s), e.g. `http://localhost:3000,http://localhost:5173`
   - `SEED_ADMIN_*`: Credentials used during `npm run seed`.

#### Frontend Environment Setup:
1. Navigate to `frontend/` and copy the example template:
   ```bash
   cd frontend
   cp .env.example .env   # Or 'copy .env.example .env' in Windows CMD
   ```
2. In `frontend/.env`:
   - `VITE_API_URL`: `http://localhost:5000/api` (or `/api` to use Vite's dev proxy)
   - `VITE_APP_TITLE`: Portfolio title
   - `VITE_APP_URL`: `http://localhost:3000`
   - `VITE_CONTACT_EMAIL`: `princeundaviya@gmail.com`

---

### 2. Backend Setup & Seeding

In the `backend` directory:

```bash
cd backend
npm install
```

Seed the initial portfolio data and admin account:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

---

### 3. Frontend Setup

In the `frontend` directory:

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
# Frontend runs on http://localhost:3000 (with proxying to backend)
```

---

## 🔒 Admin Dashboard Features

The Admin Dashboard provides full CRUD capabilities to:
1. **Manage Projects:** Add, update, or remove portfolio projects with categories, tech stacks, and live links.
2. **Manage Skills:** Add, update, or remove technical skills and proficiency percentages.
3. **Manage Experience:** Add work history and educational background.
4. **Manage Testimonials:** Review, approve, or delete client and colleague testimonials.
5. **Manage Messages:** View and delete incoming contact form messages.
6. **Admin Profile:** Update admin name, email, and password.
