# ToDo List App — Quick Guide

Simple React + Node to-do app with MySQL. Run locally with Docker or npm.

Quick start (Docker):

```bash
docker-compose up --build
```

Open: http://localhost:3000

Stop:

```bash
docker-compose down
```

Run without Docker

Backend:

```bash
cd backend
npm install
cp .env.example .env  # edit DB settings
npm start
```

Frontend:

```bash
cd frontend
npm install
npm start
```

API examples

Get todos:

```bash
curl http://localhost:4000/todos
```

Create todo:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"Buy milk"}' http://localhost:4000/todos
```

Notes

- Backend uses Sequelize. Models: `backend/models`.
- Controllers (API logic): `backend/controllers`. Routes: `backend/routes`.
- DB init SQL: `backend/db.sql` (mounted into the MySQL container).
- Docker maps host MySQL port `3307` → container `3306` (change in `docker-compose.yml` if needed).

Where to look

- Backend entry: `backend/index.js`
- Frontend entry: `frontend/src/index.js`
- Frontend styles: `frontend/src/styles.css`
