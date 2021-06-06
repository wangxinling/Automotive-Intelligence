const getNFCManager = (req, res) => {
    res.render('nfcManagement', {
        title: 'NFC'
    });
}
const getTagdata = (req, res) => {
    res.write("mikeWang");
    res.end();
}
const setTagdata = (req, res) => {
    var tagID = req.params.id
    res.end()
}


// export controllers
nfcController = {
    getNFCManager,
    getTagdata,
    setTagdata
};
module.exports = nfcController;