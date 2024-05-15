const express = require("express");
const {
  getAllTasks,
  getSingleTask,
  addNewTask,
  editTask,
  deleteTask,
} = require("./methods");
const router = new express.Router();

router.get("/", getAllTasks);
router.get("/:id", getSingleTask);
router.post("/", addNewTask);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;