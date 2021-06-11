// import required modules
const mongoose = require('mongoose');
const axios = require("axios")

// import models
const Service = require('../models/serviceModel');

/// service controllers
// get service page
const getService = (req, res) => {
    res.render('services', {
        email: req.user.email,
        title: 'Automotive Intelligence | Services'
    });
}

// get add service page
const getAddService = (req, res) => {
    res.render('addService', {
        email: req.user.email,
        title: 'Automotive Intelligence | Add a new service'
    });
}

//find a service
const getFindService = (req, res) => {
    res.render('findServices', {
        email: req.user.email,
        title: 'Automotive Intelligence | Find a service'
    });
}

// find veficle rego from database
const postFindService = (req, res) => {
    const regoNum = req.body.search;
    Service.find({ "regoNum": { $regex: ".*" + regoNum + ".*" } }).then((result) => {
        res.render('findServices', {
            email: req.user.email,
            vehicle: result,
            regoNum,
            title: 'Automotive Intelligence | Services'
        });
    }).catch((err) => {
        console.log(err);
    });
}

// get all services
const getAllService = (req, res) =>{
    Service.find().sort({ createdAt: -1 }).then((result) => {
        res.render('services', {
            vehicles: result,
            email: req.user.email,
            title: 'Automotive Intelligence | Services'
        });
    }).catch((err) => {
        console.log(err);
    });
}

// add a service to the database
const postAddService = (req, res) => {
    const id = mongoose.Types.ObjectId();
    const service = new Service({
        _id: id,
        job_num: req.body.job_num,
        job_date: req.body.job_date,
        regoNum: req.body.regoNum,
        timein: req.body.timein,
        carmake: req.body.carmake,
        carmodel: req.body.carmodel,
        clientname: req.body.clientname,
        contactnumber: req.body.contactnumber,
        engine: req.body.engine,
        vin: req.body.vin,
        review: req.body.review,
        fls: req.body.fls,
        frs: req.body.frs,
        bls: req.body.bls,
        brs: req.body.brs,
        tech: req.body.tech,
        techid: req.body.techid,
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
        res.render('serviceDetails', {
            email: req.user.email,
            vehicle: result,
            title: 'Vehicle Service Details'
        });
    }).catch((err) => {
        console.log(err);
        res.render('404', { title: 'Page not found' });
    });
}

// delete a service from database
const deleteService = (req, res) => {
    const id = req.params.id;
    Service.findByIdAndDelete(id).then((result) => {
        res.json({ redirect: '/services' });
    }).catch((err) => {
        console.log(err);
    });
}

// get update service page
const getUpdateService = (req, res) => {
    const id = req.params.id;

    Service.findById(id).then((result) => {
        res.render('updateService', {
            email: req.user.email,
            vehicle: result,
            title: 'Vehicle Service Details'
        });
    }).catch((err) => {
        console.log(err);
        res.render('404', { title: 'Page not found' });
    });
}

// update service details
const updateServiceDetails = (req, res) => {
    const id = req.params.id;
 
    Service.findByIdAndUpdate(
        { _id: id },
        {   job_num:req.body.job_num,
            job_date:req.body.job_date,
            regoNum:req.body.regoNum,
            timein:req.body.timein,
            carmake:req.body.carmake,
            carmodel:req.body.carmodel,
            clientname:req.body.clientname,
            contactnumber:req.body.contactnumber,
            engine:req.body.engine,
            vin:req.body.vin,
            review:req.body.review,
            fls:req.body.fls,
            frs:req.body.frs,
            bls:req.body.bls,
            brs:req.body.brs,
            tech:req.body.tech,
            techid:req.body.techid,
            odo:req.body.odo, 
        },
        { new: true }
    ).then((result) => {
        res.render('serviceDetails', {
            email: req.user.email,
            vehicle: result,
            title: 'Vehicle Service Details'
        });
    }).catch((err) => {
        console.log(err);
    });
}

// get registration details
const getVehicleInfo = (req, res) => {
    const rego = req.params.id;
    const options = {
        method: 'GET',
        url: `https://vic-roads.p.rapidapi.com/vicroads/${rego}`,
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': process.env.RAPID_API_HOST
        }
    };
    
    try {
        axios.request(options).then((response) => {
            const vehicle = response.data.vehicle.split(" ");
            let json = JSON.stringify({ 
                regoNum: rego,
                carmake: vehicle[2],
                carmodel: vehicle[3],
                engine: response.data.engine_number,
                vin: response.data.vin_number,
            });

            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(json);
        }).catch((err) => {
            console.error(err);
        });
    } catch (err) {
        console.log(err);
        res.status(401).send();

    }
}

// export service controllers
serviceController = {
    getService,
    getAddService,
    postFindService,
    postAddService,
    getServiceDetails,
    getFindService,
    getAllService,
    deleteService,
    getUpdateService,
    updateServiceDetails,
    getVehicleInfo
}
module.exports = serviceController;