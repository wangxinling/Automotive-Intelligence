// import required modules
const bcrypt = require('bcryptjs');

// import models
const User = require('../models/userModel');

/// user controllers
// get user login page
const getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
}

// get user signup page
const getSignup = (req, res) => {
    res.render('signup', { title: 'Register' });
}

// log in a user
const postLogin = (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        console.log(req.session);
        res.redirect("/");
    } else {
        res.redirect("/users/login");
    }
}

// register a user
const postSignup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
        if (user) {
          res.send({ errors: ["Email already exists"] });
        } else {
            user = {
                name,
                email,
                password,
            };
            
            const newUser = new User(user);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save().then((user) => {
                        console.log("User has been added to the database");
                    }).catch((err) => {
                        console.log(err)
                    });
                });
            });
        }
    });

    res.redirect("/users/login");
}

// log out a user
const getLogout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
}

// authenticate google user
const postGoogleLogin = async (req, res) => {
    try {
        const code = req.body.code;
        const profile = await googleOAuth.getProfile(code);
        const user = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
        };
    
        // adding google user to the database
        User.findOne({ email: user.email }).then((dbUser) => {
            if (dbUser) {
                req.user = dbUser;
                req.session.passport = { user: dbUser.id };
                console.log("This user already exists");
                console.log(req.user);
                console.log(req.session);
            } else {
                dbUser = {
                    name: user.name,
                    email: user.email,
                    password: user.id,
                };
        
                const newUser = new User(dbUser);
        
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(dbUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
            
                        newUser.save().then((user) => {
                            req.user = user;
                            req.session.passport = { user: user.id };
                            console.log("Google user has been added to the database");
            
                            console.log(req.user);
                            console.log(req.session);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    });
                });
            }
        });
    
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.status(401).send();
      }
}

// export user controllers
userController = {
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getLogout,
    postGoogleLogin
};
module.exports = userController;