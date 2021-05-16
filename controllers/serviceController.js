// import required modules
const mongoose = require('mongoose');

// import models
const Service = require('../models/serviceModel');

/// service controllers
// get service page
const getService = (req, res) => {
    res.render('services', { title: 'Automotive Intelligence | Services' });
}

// get add service page
const getAddService = (req, res) => {
    res.render('addService', { title: 'Automotive Intelligence | Add a new service' });
}

// find veficle rego from database
const postFindService = (req, res) => {
    const regoNum = req.body.search;
    Service.find({ "regoNum": { $regex: ".*" + regoNum + ".*" } }).then((result) => {
        res.render('services', { list: result, regoNum, title: 'Automotive Intelligence | Services' });
    }).catch((err) => {
        console.log(err);
    });
}

// add a service to the database
const postAddService = (req, res) => {
    const id = mongoose.Types.ObjectId();
    const service = new Service({
        _id: id,
        client : req.body.client,
        regoNum : req.body.regoNum,
        make : req.body.make,
        model: req.body.model,
        year: req.body.year,
        odo: req.body.odo
    });
    service.save().then((result) => {
        res.redirect('/services/' + id.toString());
    }).catch((err) => {
        console.log(err);
    });
}

// get service details from database
const getServiceDetails = (req, res) => {
    const id = req.params.id;
    Service.findById(id).then((result) => {
        res.render('serviceDetails', { vehicle: result, title: 'Vehicle Service Details' });
    }).catch((err) => {
        console.log(err);
        res.render('404', { title: 'Page not found' });
    });
}

// export service controllers
serviceController = {
    getService,
    getAddService,
    postFindService,
    postAddService,
    getServiceDetails
}
module.exports = serviceController;