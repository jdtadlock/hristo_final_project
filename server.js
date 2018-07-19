const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Database Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Shit's fucked"));

// Express Init
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
const post = require("./routes/api/post");

// Use Routes
app.use("/api/post", post);

// Server Port
const port = process.env.PORT || 5000;

// Server Start
app.listen(port, () => console.log(`Server listening on port ${port}`));
