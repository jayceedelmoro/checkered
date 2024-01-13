const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
  isCompleted: {
    type: Boolean,
    default: false
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  encodedDate: {
    type: Number,
    default: (new Date()).getTime()
  }, 
});

module.exports = mongoose.model("Task", TaskSchema);
