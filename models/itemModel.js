// import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new database schema
const itemSchema = new Schema({
    
});

// create and export item instance
const Item = mongoose.model('Blog', itemSchema);
module.exports = Item;