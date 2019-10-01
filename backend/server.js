const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;

const db = require('../config/keys').mongoURI;

app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect(String(db), { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});