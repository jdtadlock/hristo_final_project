const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  synthType: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);