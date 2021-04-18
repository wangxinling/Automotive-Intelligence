const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

// create express app
const app = express();
const port = 3000;

// set view engine
app.set('view engine', 'ejs');

// set static files
app.use(express.static('public'));

// set favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});