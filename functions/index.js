const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer')

admin.initializeApp();


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.taskCompleted = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => { });
    const { toEmail, fromEmail, subject, name } = req.body;
    try {
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
                res.json({ error, mailOption, toEmail });
            } else {
                const data = info.messageId;
                res.status(200).json({ msg: "Success", data });
            }
        });
    } catch (err) {
        res.status(422).json({ msg: "Approve Failed" });
    }

});
