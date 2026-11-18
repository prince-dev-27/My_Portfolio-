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

The application runs using separate backend and frontend development servers.

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or connection URI in `.env`.

### 1. Backend Setup & Seeding

Open a terminal and navigate to the backend directory:

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

### 2. Frontend Setup

Open a second terminal and navigate to the frontend directory:

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

Click on the **Admin Login** button in the top navigation and log in with:
- **Username:** `prince`
- **Password:** `admin123`

The Admin Dashboard provides full CRUD capabilities to:
1. **Manage Projects:** Add, update, or remove portfolio projects with categories, tech stacks, and live links.
2. **Manage Skills:** Add, update, or remove technical skills and proficiency percentages.
3. **Manage Experience:** Add work history and educational background.
4. **Manage Testimonials:** Review, approve, or delete client and colleague testimonials.
5. **Manage Messages:** View and delete incoming contact form messages.
6. **Admin Profile:** Update admin name, email, and password.
