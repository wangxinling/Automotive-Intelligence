// import required modules
const Tool = require('../models/toolModel');

// tool controllers
const getAddTool = (req, res) => {
    res.render('addTool', { title: 'Add a new tool' });
}

const getFindTool = (req, res) => {
    res.render('findTool', { title: 'Find a tool' });
}

const getAllTools = (req, res) => {
    Tool.find().sort({ createdAt: -1 }).then((result) => {
        res.render('tools', { tools: result, title: 'Automotive Intelligence | Tools' });
    }).catch((err) => {
        console.log(err);
    });
}

const postAddTool = (req, res) => {
    const tool = new Tool(req.body);
    tool.save().then((result) => {
        res.redirect('/tools');
    }).catch((err) => {
        console.log(err);
    });
}

const postFindTool = (req, res) => {
    const tool = req.body.search;
    Tool.find({ "name": { $regex: ".*" + tool + ".*" } }).then((result) => {
        res.render('findTool', { list: result, tool, title: 'Find a tool' });
    }).catch((err) => {
        console.log(err);
    });
}

const getTool = (req, res) => {
    const id = req.params.id;
    Tool.findById(id).then((result) => {
        res.render('toolDetails', { tool: result, title: 'Tool Details' });
    }).catch((err) => {
        console.log(err);
        res.render('404', { title: 'Page not found' });
    });
}

const deleteTool = (req, res) => {
    const id = req.params.id;
    Tool.findByIdAndDelete(id).then((result) => {
        res.json({ redirect: '/tools' });
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
    deleteTool
};
module.exports = toolController;