const mongoose = require('mongoose');

// Define schema for project instances - field types in Mongo database
const projectSchema = new mongoose.Schema({
  title: String,
  weight: Number,
  description: String
});

// Export model based on schema
module.exports = mongoose.model('Project', projectSchema);
