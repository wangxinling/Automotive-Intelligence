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
        default: "12:00"
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
        default: "Good"
    },
    fls: {
        type: String,
        default:0
    },
    frs: {
        type: String,
        default:0
    },
    bls: {
        type: String,
        default:0
    },
    brs: {
        type: String,
        default:0
    },
    tech: {
        type: String,
        default: null
    },
    techid: {
        type: String,
        default: null
    },
    odo: {
        type: String,
        require: true
    }

});

// create and export service instance
const Service = mongoose.model('service', ServiceSchema);
module.exports = Service;