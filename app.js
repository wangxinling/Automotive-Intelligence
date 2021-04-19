// import required modules
const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const toolRoutes = require('./routes/toolRoutes');

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

// middlewares
// set static files
app.use(express.static('public'));

// set favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Automotive Intelligence' });
});

// tool routes
app.use('/tools', toolRoutes);

// part routes
app.get('/parts', (req, res) => {
    res.render('parts', { title: 'Parts' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
});