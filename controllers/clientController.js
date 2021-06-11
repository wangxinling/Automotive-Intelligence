// import required modules
const axios = require("axios");

// import models
const Service = require('../models/serviceModel');

/// client controllers
// get client web view
const getClientView = (req, res) => {
    res.render('home', {
        title: 'Automotive Intelligence'
    });
}

// get client's booking view
const getClientBooking = (req, res) => {
    res.render('clientAppointment', {
        title: 'Automotive Intelligence | Bookings'
    });
}

// add a service booking to the database
const postAddClientBooking = (req, res) => {
    let jobNum = null;
    const rego = req.body.rego;
    const options = {
        method: 'GET',
        url: `https://vic-roads.p.rapidapi.com/vicroads/${rego}`,
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': process.env.RAPID_API_HOST
        }
    };

    Service.find().sort({job_num: -1}).limit(1).then((result) => {
        jobNum = parseInt(result[0].job_num, 10) + 1;
        jobNum = "00" + jobNum;
    }).catch((err) => {
        console.log(err);
    });
    
    try {
        axios.request(options).then((response) => {
            const vehicle = response.data.vehicle.split(" ");
            const service = new Service({
                job_num: jobNum,
                job_date: req.body.date,
                regoNum: response.data.registration_number,
                carmake: vehicle[2],
                carmodel: vehicle[3],
                clientname: req.body.cname,
                contactnumber: req.body.cnum,
                engine: response.data.engine_number,
                vin: response.data.vin_number,
                odo: req.body.odo
            });
            
            service.save().then((result) => {
                console.log("Booking added");
                res.redirect('/booking');
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.error(err);
        });
    } catch (err) {
        console.log(err);
        res.status(401).send();
    }
}

// export client controllers
clientController = {
    getClientView,
    getClientBooking,
    postAddClientBooking
};
module.exports = clientController;