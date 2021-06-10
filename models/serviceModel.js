// import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create service schema
const ServiceSchema = new Schema({
    job_num: {
        type: String,
        required: true
    },
    job_date: {
        type: String,
        require : true
    },
    regoNum: {
        type: String,
        required: true
    },
    timein: {
        type: String,
        require: true
    },
    carmake: {
        type: String,
        require: true
    },
    carmodel: {
        type: String,
        require: true
    },
    clientname: {
        type: String,
        require: true
    },
    contactnumber: {
        type: String,
        require: true
    },
    engine: {
        type: String,
        require: true
    },
    vin: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    fls: {
        type: String,
        require: true,
        default:0
    },
    frs: {
        type: String,
        require: true,
        default:0
    },
    bls: {
        type: String,
        require: true,
        default:0
    },
    brs: {
        type: String,
        require: true,
        default:0
    },
    tech: {
        type: String,
        require: true
    },
    techid: {
        type: String,
        require: true
    },
    odo: {
        type: String,
        require: true
    }

});

// create and export service instance
const Service = mongoose.model('service', ServiceSchema);
module.exports = Service;