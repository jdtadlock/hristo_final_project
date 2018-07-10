const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Here is our schema for the mongoDB
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

modules.exports = mongoose.model('User', UserSchema);