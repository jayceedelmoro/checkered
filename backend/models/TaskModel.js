const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
  status: {
    type: String,
    default: 'In Progress'
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
