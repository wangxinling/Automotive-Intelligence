// import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

// create part schema
const PartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    available: {
        type: Boolean,
        default: true
    },
    location: {
        type: GeoSchema,
        require: true
    },
    nfcTagID:{
        type: String
    }
});

// create and export part instance
const Part = mongoose.model('part', PartSchema);
module.exports = Part;