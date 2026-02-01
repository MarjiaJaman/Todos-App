const { Todo } = require("../models");

async function getAll(req, res, next) {
  try {
    const todos = await Todo.findAll({ order: [["id", "DESC"]] });
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { text } = req.body;
    if (!text || !String(text).trim())
      return res.status(400).json({ error: "missing_text" });
    const todo = await Todo.create({ text: String(text).trim() });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { text, done } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: "not_found" });

    if (typeof text !== "undefined") todo.text = String(text);
    if (typeof done !== "undefined") todo.done = !!done;

    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const deleted = await Todo.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "not_found" });
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, create, update, remove };
