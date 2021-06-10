/// client controllers
// get client web view
const getClientView = (req, res) => {
    res.render('home', {
        title: 'Automotive Intelligence'
    });
}

// get client's booking view
const getClientBooking = (req, res) => {
    res.render('clientAppointment', {
        title: 'Automotive Intelligence | Bookings'
    });
}

// export client controllers
clientController = {
    getClientView,
    getClientBooking
};
module.exports = clientController;