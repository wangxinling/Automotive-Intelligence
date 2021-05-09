// import required modules
const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const serviceRoutes = require('./routes/serviceRoutes');
const toolRoutes = require('./routes/toolRoutes');
const partRoutes = require('./routes/partRoutes');

// create express app
const app = express();

// set application port and ssl certificate
const port = process.env.PORT || 443;
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname,'sslcert/server.key')),
    cert: fs.readFileSync(path.join(__dirname,'sslcert/server.crt'))
}

// connect to mongodb & listen for requests
const uri = 'mongodb+srv://sit725:sit725@Deakin@cluster0.lztrc.mongodb.net/automotive-intelligence?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

mongoose.connect(uri, options).then((result) => {
    console.log("Database connected");
    https.createServer(httpsOptions, app).listen(port, () => {
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