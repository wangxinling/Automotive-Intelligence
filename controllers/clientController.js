const getclients = (req, res) => {
     
        res.render('client', {
            username: req.user.email,
            
            title: 'Automotive Intelligence | Client'
        });
    }

    const getclientsform = (req, res) => {
     
        res.render('clientappointment', {
            username: req.user.email,
            
            title: 'Automotive Intelligence | Client'
        });
    }

clientController = {
    getclients,
    getclientsform
};
module.exports = clientController;