# 🔥 TaskFlowApp (Full Stack MERN)

**TaskFlowApp** is a full-stack task management application that helps users and admins create, track, and manage tasks across projects efficiently.

---

## 🌐 Live Demo

- 🔗 Frontend: [taskflow-frontend.vercel.app](https://task-flow-frontend-murex.vercel.app)  
- 🔗 Backend API: [taskflow-api.onrender.com](https://taskflowbackend-cbxp.onrender.com)  
- 📦 GitHub Frontend Repo: [sarojkr05/TaskFlowFrontend](https://github.com/sarojkr05/TaskFlowFrontend)  
- 📦 GitHub Backend Repo: [sarojkr05/TaskFlowBackend](https://github.com/sarojkr05/TaskFlowBackend)

---

## 🛠️ Tech Stack

| Layer       | Technologies                       |
|-------------|------------------------------------|
| Frontend    | React, Redux Toolkit, Tailwind CSS |
| Backend     | Node.js, Express.js, MongoDB       |
| API Calls   | RTK Query, Axios                   |
| Auth        | JWT-based Authentication           |

---

## 📁 Project Structure

TaskFlowApp/
│
├── client/ # React frontend (Vite + Tailwind)
│ ├── src/
│ ├── public/
│ ├── dist/ # Production build output
│ ├── index.html
│ ├── vite.config.js
│ ├── vercel.json
│ └── .env
│
├── server/ # Node.js backend with Express & MongoDB
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── repositories/
│ │ └── schemas/
│ ├── .env
│ └── package.json
│
├── README.md # Root documentation
└── package.json # Optional root scripts if monorepo

---

## 🚀 Features

### 👥 User
- 🔐 Register/Login
- 📋 Create, edit, delete tasks
- 🔍 Filter & sort by status, priority, due date
- ✅ Task completion status tracking

### 👨‍💼 Admin
- 📊 Admin dashboard with stats
- 👥 User management (view, delete, roles)
- 🗂️ View all tasks and projects
- ⚙️ Role-based access control

---

## 💻 Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/TaskFlowApp.git
cd TaskFlowApp

# Install dependencies
cd client && npm install
cd ../server && npm install

# Run both servers (if you set up concurrently)
npm run dev
📂 Environment Variables
📍 client/.env
env
Copy
Edit
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
📍 server/.env
env
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
🙋‍♂️ Author
Saroj Kumar Das
📧 Email: sarojsarojkumar753@gmail.com
🔗 LinkedIn: Saroj Kumar Das

⭐ Like this project?
Give it a ⭐ on GitHub if you find it helpful and want to support my work.

