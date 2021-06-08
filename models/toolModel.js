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
const ToolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    location: {
        type: GeoSchema,
        require: true
    },
    // for usage
    oldLocation:{
        type: GeoSchema,
        require:false
    },
    // for usage
    usageNum:{
        type: Number,
        default:0
    },
    nfcTagID:{
        type: String
    }
});

// create and export tool instance
const Tool = mongoose.model('tool', ToolSchema);
module.exports = Tool;