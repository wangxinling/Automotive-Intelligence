// import required modules
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// nodemailer
exports.sendMail = async (token) => {
    const name = jwt.verify(token, process.env.JWT_SECRET).name;
    const email = jwt.verify(token, process.env.JWT_SECRET).email;
    const email_body = `<center>
                            <h1 style='font-size:200%; color:#2828ff';> Hi ${name}, Welcome to Automotive Intelligence</h1>
                        </center>
                        <center>
                            <img src='https://live.staticflickr.com/65535/51236209187_491491f671_m.jpg' height='150px'/>
                        </center>
                        <center>
                            <p><h2> Thank you for registering with us!
                                <br>We are glad to have you.
                            </h2></p>
                        <center>
                            <i><p style='font-family:sans-serif';>An IoT based Smart Automotive Workshop.</p></i>
                        <center>
                            <h3>
                                <p>Start now by logging in to Automotive Intelligence by clicking the link below.</p>
                                <b><a style='background-color: #d5f4e6;' href='https://localhost/users/signup/${token}'>Confirm My Email</a><b>
                            </h3>
                        </center>
                        <center style='color:#D3D3D3';>
                            <b>This message was sent from Automotive Intelligence.</b>
                        </center>`;
    try {
        // initializing the service
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
            },
        });

        // defining the mail
        let mailOptions = {
            from: process.env.MAIL_ID,
            to: email,
            subject: "Registration Successful!",
            text: "",
            html: email_body
        };

        // sending the email
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Email Sent");
            }
        });
    } catch (err) {
        console.log(err);
    }
}