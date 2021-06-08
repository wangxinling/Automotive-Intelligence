const getNFCManager = (req, res) => {
    res.render('nfcManagement', {
        title: 'NFC'
    });
}
const getTagdata = (req, res) => {
    res.write(currentTag);
    res.end();
}
const setTagdata = (req, res) => {
    currentTag = req.params.id
    res.end();
}

var currentTag = "";
var latitude = "";
var longitude = "";

// export controllers
nfcController = {
    getNFCManager,
    getTagdata,
    setTagdata
};
module.exports = nfcController;