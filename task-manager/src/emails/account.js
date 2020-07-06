const nodemailer = require('nodemailer');

 const sendWelcomeMail = async (email, name) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
           user: process.env.MAIL_USER,
           pass: process.env.MAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TaskApp Admin 👻" <Admin@taskApp.com>', // sender address
        to: email, // list of receivers
        subject: "Welcome to TaskApp", // Subject line
        text: `Welcome to the app, ${name}, please feel free to contact us for any further info regarding the app.`, // plain text body
        html: `<b>Welcome to the app, ${name}, please feel free to contact us for any further info regarding the app.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

sendWelcomeMail().catch(console.error);

const sendCancelationEmail = async (email, name) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TaskApp Admin 👻" <Admin@taskApp.com>', // sender address
        to: email, // list of receivers
        subject: "Sorry to see you go !", // Subject line
        text: `Goodbye, ${name}, we very sad to see you go</b>`, // plain text body
        html: `<b>Goodbye, ${name}, we very sad to see you go</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

sendCancelationEmail().catch(console.error);

module.exports = {
    sendWelcomeMail,
    sendCancelationEmail
}
