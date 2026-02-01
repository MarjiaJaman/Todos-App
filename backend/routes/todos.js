const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

// GET /todos
router.get("/", todosController.getAll);

// POST /todos
router.post("/", todosController.create);

// PUT /todos/:id
router.put("/:id", todosController.update);

// DELETE /todos/:id
router.delete("/:id", todosController.remove);

module.exports = router;
