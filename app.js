// import required modules
const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const serviceRoutes = require('./routes/serviceRoutes');
const toolRoutes = require('./routes/toolRoutes');
const partRoutes = require('./routes/partRoutes');

// create express app
const app = express();
const port = 3000;

// connect to mongodb & listen for requests
const uri = 'mongodb://localhost/automotive-intelligence';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

mongoose.connect(uri, options).then((result) => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

// set view engine
app.set('view engine', 'ejs');

/// middlewares
// set static files
app.use(express.static('public'));

// use express body parser middleware
app.use(express.urlencoded({ extended: true }));

// set favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Automotive Intelligence | Home' });
});

// service routes
app.use('/services', serviceRoutes);

// tool routes
app.use('/tools', toolRoutes);

// part routes
app.use('/parts', partRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
});