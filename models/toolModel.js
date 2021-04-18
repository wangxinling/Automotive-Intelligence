// import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new database schema
const toolSchema = new Schema({

});

// create and export tool instance
const Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;