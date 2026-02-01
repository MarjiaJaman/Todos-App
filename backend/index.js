const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize, Todo } = require("./models");
const todosRouter = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple root route
app.get("/", (req, res) => {
  res.send("Hello World from Express + Sequelize!");
});

// API routes
app.use("/todos", todosRouter);

// 404 catch-all
app.all("*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal_server_error" });
});

// Sync models and start server
async function start() {
  try {
    await sequelize.authenticate();
    // Use { alter: true } in dev to auto-migrate safely; avoid in production.
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start app:", err);
    process.exit(1);
  }
}

start();
