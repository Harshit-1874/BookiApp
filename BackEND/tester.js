import nodemailer from "nodemailer";
import "dotenv/config";

const mailSender = (email,source,destination,time,cab,date) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for all other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: {
            name: "The Booki App",
            address: "harshit1084.be21@chitkarauniversity.edu.in",
        }, // sender address
        to: [email], // list of receivers
        subject: "Booking Confirmed", // Subject line
        //text: "Hello world?", // plain text body
        html: `Thankyou for using <br/>🚖<b>The Booki App</b><br/>We have recieved a booking for you from <b>${source}</b> to <b>${destination}</b> on <b>${date}</b> at <b>${time}.</b> <br/> Cab Type : ${cab} <br/> We wish you a happy and safe journey.`, // html body
    };


    const sendMail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions); // Pass mailOptions here
            console.log('Email sent successfully!');
        } catch (error) {
            console.error(error);
        }
    }

    sendMail(transporter, mailOptions);
}

export {mailSender};