# MERN CRUD App — Task Manager

A simple, complete full-stack CRUD app built with **MongoDB, Express, React (Vite), and Node.js**.

Create, read, update, delete, and mark tasks complete — all four CRUD operations, wired end to end.

## Project structure

```
mern-crud-app/
├── backend/          Express API + Mongoose model
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   └── .env.example
└── frontend/         React app (Vite)
    └── src/
        ├── api.js
        ├── App.jsx
        └── components/
```

## 1. Prerequisites

- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) **or** a free MongoDB Atlas connection string

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI if using Atlas
npm run dev                # or: npm start
```

The API runs on `http://localhost:5000`. Endpoints:

| Method | Route            | Description       |
|--------|-------------------|--------------------|
| GET    | /api/tasks        | List all tasks     |
| GET    | /api/tasks/:id     | Get one task       |
| POST   | /api/tasks         | Create a task       |
| PUT    | /api/tasks/:id     | Update a task       |
| DELETE | /api/tasks/:id     | Delete a task       |

## 3. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite is already configured to proxy `/api` requests to `http://localhost:5000`, so no CORS setup is needed in development.


```bash
git init
git add .
git commit -m "Initial commit: MERN CRUD task manager"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

(Create the empty repo first at github.com/new, without a README, then run the commands above.)

## Notes

- `.env` is git-ignored — never commit real credentials. Use `.env.example` as the template.
- To deploy: host `backend/` on something like Render/Railway with an Atlas connection string, and `frontend/` (after `npm run build`) on Vercel/Netlify, pointing its API calls at your deployed backend URL.
