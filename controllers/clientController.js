const getclients = (req, res) => {
     
        res.render('home', {
            
            
            title: 'Automotive Intelligence | Client'
        });
    }

    const getclientsform = (req, res) => {
     
        res.render('clientappointment', {
            
            
            title: 'Automotive Intelligence | Client'
        });
    }

clientController = {
    getclients,
    getclientsform
};
module.exports = clientController;