const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const api_routes = require('./routes/api_routes');
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
// mongodb://abc:123abc@ds123770.mlab.com:23770/project3db
mongoose.connect('mongodb://localhost:27017/hristo', { useNewUrlParser: true });

const app = express();

// Tell Express where our front end folder is
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api_routes(app);

// app.get('/user', (req, res) => {
//   res.send('Hello from the backend!');
// });

app.listen(port, () => console.log(`Listening on port ${port}`));