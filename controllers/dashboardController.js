// import required modules
const Part = require('../models/partModel');
const Service = require('../models/serviceModel');
const Tool = require('../models/toolModel');

// get all parts from database
const getAllDashboard = (req, res) => {
    let partResults;
    let serviceResults;
    let toolResults;
    Part.find().sort({ createdAt: -1 }).then((result) => {
        partResults = result;
        Service.find().sort({ createdAt: -1 }).then((result) => {
            serviceResults = result;
            Tool.find().sort({ createdAt: -1 }).then((result) => {
                toolResults = result;
                res.render('index', {
                    parts: partResults,
                    tools: toolResults,
                    services:serviceResults,
                    email: req.user.email,
                    title: 'Automotive Intelligence | Home'
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}

// export controllers
dashboardController = {
    getAllDashboard
};
module.exports = dashboardController;