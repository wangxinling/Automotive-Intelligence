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

// create tool schema
const toolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    location: GeoSchema
});

// create and export tool instance
const Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;