# 🌌 Aura Blog — *Share Your Light*

Aura Blog is a premium, full-stack blogging web application built with a modern decoupled architecture. It features a sleek, dark-themed user interface, secure JWT cookie-based user authentication, and comprehensive post-creation capabilities.

---

## 🚀 Key Features

*   🔑 **Secure Authentication**: Register and log in securely. Password hashing is handled via `bcrypt`, and persistent user sessions are managed with JWTs stored in secure, HttpOnly cookies.
*   📝 **Complete CRUD Operations**: Create, view, edit, and delete posts easily with client-side routing.
*   🎨 **Premium Dark Aesthetics**: Styled with a gorgeous dark palette, smooth transitions, interactive states, and glassmorphic inputs.
*   🛡️ **Route Guards**: Protected client-side pages and secure API endpoints prevent unauthorized users from creating or modifying posts.
*   ⚡ **Vite + Express Architecture**: Decoupled client-server setup optimized for fast development cycles.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) (Vite)
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios
*   **Styling**: Pure CSS with Custom Variables

### Backend
*   **Runtime**: Node.js
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose ORM
*   **Security**: JSON Web Tokens (JWT), bcrypt, CORS, cookie-parser

---

## 📁 Repository Structure

```text
full-stack-with-auth/
├── backend/            # Express.js Server API
│   ├── config/         # Database connection configuration
│   ├── controllers/    # Business logic for auth & posts
│   ├── middleware/     # Auth checks & JWT verification
│   ├── models/         # MongoDB schemas (User, Post)
│   ├── routes/         # Express router endpoints
│   ├── server.js       # Main server entrypoint
│   └── package.json
│
├── frontend/           # React Client Application
│   ├── src/
│   │   ├── components/ # Reusable layout components (Navbar, ProtectedRoute)
│   │   ├── context/    # Global Auth State Provider (AuthContext)
│   │   ├── pages/      # Pages (Home, Login, Register, PostDetail, etc.)
│   │   ├── App.jsx     # Route manager
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js  # Port configurations and proxy settings
│   └── package.json
└── README.md
```

---

## ⚙️ Quick Start

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v16+)
*   [MongoDB](https://www.mongodb.com/) (running locally or a remote MongoDB Atlas URI)

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and configure the environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fullstack-blog
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend development server:
   ```bash
   npm start
   ```
   *The server will start running on `http://localhost:5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the client-side dependencies:
   ```bash
   npm install
   ```
3. Start the client application:
   ```bash
   npm run dev
   ```
   *The frontend application will start running on `http://localhost:3000`.*

---

## 🔒 Security Practices Built-in

*   **HttpOnly Cookies**: Prevents client-side scripts from reading the JWT token, neutralizing XSS token theft vectors.
*   **Password Salting**: Uses high-entropy salt rounds to store passwords securely.
*   **Global Request Interceptors**: Standardized headers and credentials handling using central Axios instance configs.

---

Created with ❤️ by [MASTER-UTKARSH](https://github.com/MASTER-UTKARSH).
