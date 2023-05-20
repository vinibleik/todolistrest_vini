const express = require("express");
const Task = require("../model/Tasks");
const TaskValidator = require("../validators/TaskValidator");
const router = express.Router();

router.get("/", function (req, res, next) {
  if (Task.list().length == 0) {
    Task.new("Tarefa 1", "low");
    Task.new("Tarefa 2", "normal");
  }

  res.status(200).json({ status: true, list: Task.list() });
});

router.get("/:id", TaskValidator.validateId, function (req, res) {
  let obj = Task.getElementById(req.params.id);
  if (!obj) {
    return res
      .status(500)
      .json({ status: false, msg: "Tarefa não encontrada" });
  }

  return res.status(200).json({ status: true, task: obj });
});

router.post("/", TaskValidator.validate, function (req, res) {
  res
    .status(200)
    .json({ status: true, task: Task.new(req.body.nome, req.body.priority) });
});

router.put(
  "/:id",
  TaskValidator.validateId,
  TaskValidator.validate,
  function (req, res) {
    let obj = Task.update(req.params.id, req.body.nome, req.body.priority);
    if (!obj) {
      return res.json({ status: false, msg: "Falha ao alterar a tarefa" });
    }

    res.json({ status: true, task: obj });
  }
);

router.delete("/:id", TaskValidator.validateId, function (req, res) {
  if (!Task.delete(req.params.id)) {
    return res.json({ status: false, msg: "Falha ao excluir a tarefa" });
  }

  res.json({ status: true });
});

module.exports = router;
