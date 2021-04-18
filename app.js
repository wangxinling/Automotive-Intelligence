const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');

// create express app
const app = express();
const port = 3000;

// connect to mongodb & listen for requests
const uri = 'mongodb://localhost/automotive-intelligence';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, options).then(() => {
    console.log("Databse connected");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

// set view engine
app.set('view engine', 'ejs');

// set static files
app.use(express.static('public'));

// set favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.get('/', (req, res) => {
    res.render('index');
});