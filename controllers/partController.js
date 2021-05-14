// import models
const Part = require('../models/partModel');

/// part controllers
// get add part page
const getAddPart = (req, res) => {
    res.render('addPart', { title: 'Add a new part' });
}

// get find part page
const getFindPart = (req, res) => {
    res.render('findPart', { title: 'Find a part' });
}

// get all parts from database
const getAllParts = (req, res) => {
    Part.find().sort({ createdAt: -1 }).then((result) => {
        res.render('parts', { parts: result, title: 'Automotive Intelligence | Parts' });
    }).catch((err) => {
        console.log(err);
    });
}

// add a part to the database
const postAddPart = (req, res) => {
    const part = new Part({
        name : req.body.name,
        type : req.body.type,
        desc : req.body.desc,
        available: req.body.available,
        location : {
            type : 'Point',
            coordinates : [parseFloat(req.body.lng) , parseFloat(req.body.lat)]
        }
    });
    part.save().then((result) => {
        res.redirect('/parts');
    }).catch((err) => {
        console.log(err);
    });
}

// find a part from database
const postFindPart = (req, res) => {
    const part = req.body.search;
    Part.find({ "name": { $regex: ".*" + part + ".*" } }).then((result) => {
        res.render('findPart', { list: result, part, title: 'Find a part' });
    }).catch((err) => {
        console.log(err);
    });
}

// get a part from database
const getPart = (req, res) => {
    const id = req.params.id;
    Part.findById(id).then((result) => {
        res.render('partDetails', { part: result, title: 'Part Details' });
    }).catch((err) => {
        console.log(err);
        res.render('404', { title: 'Page not found' });
    });
}

// delete a part from database
const deletePart = (req, res) => {
    const id = req.params.id;
    Part.findByIdAndDelete(id).then((result) => {
        res.json({ redirect: '/parts' });
    }).catch((err) => {
        console.log(err);
    });
}

// export part controllers
partController = {
    getAddPart,
    getFindPart,
    getAllParts,
    postAddPart,
    postFindPart,
    getPart,
    deletePart
}
module.exports = partController;