// require('dotenv').config();

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer')
const accountSid = "ACf1001e4cc2eb8e4528606becf3f8c306";
const authToken = "73aebff9468524c58d1839aa504669ff";
const client = require('twilio')(accountSid, authToken);


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.taskCompleted = functions.https.onRequest((req, res) => {
    cors(req, res, () => { });
    const { toEmail, fromEmail, subject, name, text, whatsAppNo } = req.body;

    const output = subject;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "basu1735@gmail.com", // generated ethereal user
            pass: "zihskvpxkactecta", // generated ethereal password
        },
    });
    let mailOption = {
        from: `Teambo <teambo@app.com>`, // sender address
        to: toEmail, // list of receivers
        subject: "Task Approval", // Subject line
        html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: text,
                    to: `whatsapp:+91${whatsAppNo}`
                }).then((res) => {
                    res.status(200).json({ msg: "Success" })
                })
                .catch((err) => {
                    res.status(422).json({ msg: "Fail1" })
                })

        }
        else {
            console.log(info);
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: text,
                    to: `whatsapp:+91${whatsAppNo}`
                })
                .then((res) => {
                    res.status(200).json({ msg: "Success" })
                })
                .catch(err => res.status(422).json({ msg: "Fail2" }))


        }
    });

});
