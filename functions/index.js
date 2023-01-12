const functions = require('firebase-functions')
const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail')
const nodemailer = require('nodemailer')

admin.initializeApp();
const db = admin.firestore();

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.taskCompleted = functions.https.onRequest(async (req, res) => {
    const { toEmail, fromEmail, subject, name } = req.body;
    try {
        const output = subject;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "basu1735@gmail.com", // generated ethereal user
                pass: "hvcvcjbpbbslrgtm", // generated ethereal password
            },
        });
        let mailOption = {
            from: `${fromEmail}`, // sender address
            to: `${toEmail}`, // list of receivers
            subject: "Task Approval", // Subject line
            html: output, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                res.json(error);
            } else {
                const data = info.messageId;
                res.status(200).json({ msg: "Success", data });
            }
        });
    } catch (err) {
        res.status(422).json({ msg: "Approve Failed" });
    }

});
