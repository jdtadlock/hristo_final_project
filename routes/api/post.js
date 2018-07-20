const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import Post Model
const Post = require("../../models/Post");

// @route   GET api/post/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({msg: "Post test route!"})
});

router.get("/", (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
});

// @route   POST api/post/create
// @desc    Creates post and saves to DB
// @access  Public, for now
router.post("/create", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    synthType: req.body.synthType,
    notes: req.body.notes
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.send(err));
});

module.exports = router;