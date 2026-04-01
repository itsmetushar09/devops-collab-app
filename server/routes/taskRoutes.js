const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// Create Task (linked to user)
router.post("/", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    user: req.user.id
  });

  await task.save();
  res.json(task);
});

// Get only user's tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Delete only user's task
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });
  res.json({ msg: "Deleted" });
});

// Update only user's task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;