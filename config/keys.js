require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://heroku_6d22m2sn:7do28ial3tt2hdn0gc8cltrkm2@ds137687.mlab.com:37687/heroku_6d22m2sn",
  secretOrKey: process.env.SECRET
}