// import models
const Tool = require('../models/toolModel');

/// tool controllers
// get add tool page
const getAddTool = (req, res) => {
    res.render('addTool', {
        email: req.user.email,
        title: 'Add a new tool'
    });
}

// get find tool page
const getFindTool = (req, res) => {
    res.render('findTool', {
        email: req.user.email,
        title: 'Find a tool'
    });
}

// get all tools from database
const getAllTools = (req, res) => {
    Tool.find().sort({ createdAt: -1 }).then((result) => {
        res.render('tools', {
            tools: result,
            email: req.user.email,
            title: 'Automotive Intelligence | Tools'
        });
    }).catch((err) => {
        console.log(err);
    });
}

// add a tool to the database
const postAddTool = (req, res) => {
    const tool = new Tool({
        name: req.body.name,
        type: req.body.type,
        size: req.body.size,
        available: req.body.available,
        location: {
            type: 'Point',
            coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        }
    });
    tool.save().then((result) => {
        res.redirect('/tools');
    }).catch((err) => {
        console.log(err);
    });
}

// find a tool from database
const postFindTool = (req, res) => {
    const tool = req.body.search;
    Tool.find({ "name": { $regex: ".*" + tool + ".*" } }).then((result) => {
        res.render('findTool', {
            tool,
            list: result,
            email: req.user.email,
            title: 'Find a tool' });
    }).catch((err) => {
        console.log(err);
    });
}

// get a tool from database
const getTool = (req, res) => {
    const id = req.params.id;
    Tool.findById(id).then((result) => {
        res.render('toolDetails', {
            tool: result,
            email: req.user.email,
            title: 'Tool Details'
        });
    }).catch((err) => {
        console.log(err);
        res.render('404', { title: 'Page not found' });
    });
}

// delete a tool from database
const deleteTool = (req, res) => {
    const id = req.params.id;
    Tool.findByIdAndDelete(id).then((result) => {
        res.json({ redirect: '/tools' });
    }).catch((err) => {
        console.log(err);
    });
}

//  every minuter check one time all tools' location
const getUsage = () => {
    Tool.find().sort({ createdAt: -1 }).then((result) => {
        result.forEach(tool => {
            // if the tool's location is changed then add 1 time usage
            if (tool.oldLocation == null ||
                tool.location.coordinates[0] != tool.oldLocation.coordinates[0] ||
                tool.location.coordinates[1] != tool.oldLocation.coordinates[1]
            ) {
                tool.usageNum += 1;
                tool.oldLocation = tool.location;
                Tool.updateOne({ _id: tool._id }, { usageNum: tool.usageNum, oldLocation: tool.oldLocation }).then((result) => {
                    console.log(`Updated object`);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                //console.log(`Doesn't neet to update object`);
            }
        });

    }).catch((err) => {
        console.log(err);
    });
}

// export tool controllers
toolController = {
    getAddTool,
    getFindTool,
    getAllTools,
    postAddTool,
    postFindTool,
    getTool,
    deleteTool,
    getUsage
}
module.exports = toolController;