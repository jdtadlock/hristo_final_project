const express = require("express");
const router = express.Router();

// Load User Model
const User = require("../../models/User");

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({msg: "Users test route"});
});

module.exports = router;