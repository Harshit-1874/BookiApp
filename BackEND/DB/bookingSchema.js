import mongoose from "mongoose";

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    bookings: [{
        email: {
            type: String,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
        },
        source: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        cabName: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    }]
});

const booki = mongoose.model("bookings",bookingSchema);

export {booki};