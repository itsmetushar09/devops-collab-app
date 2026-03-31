const auth = require("../middleware/authMiddleware");
const router = require("express").Router();
const Task = require("../models/Task");

// Create Task
router.post("/", auth, async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


// Delete Task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;