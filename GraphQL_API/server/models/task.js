
const { Schema, model } = require('mongoose');

// Define schema for task instances
const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String
});

// Export model based on schema
module.exports = model('Task', taskSchema);
