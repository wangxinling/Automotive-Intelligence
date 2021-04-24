// import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create service schema
const ServiceSchema = new Schema({
    client: {
        type: String,
        required: true
    },
    regoNum: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        require: true
    },
    year: {
        type: String,
        required: true
    },
    odo: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// create and export service instance
const Service = mongoose.model('service', ServiceSchema);
module.exports = Service;