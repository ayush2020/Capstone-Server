const mongoose = require('mongoose');

const TripDetails = new mongoose.Schema({
    FullName: String,
    VehicleNumber: {
        type: String,
        unique: true
    },
    VehicleName: {
        type: String
    },
    VehicleColour: {
        type: String
    },
    SourcePlace: String,
    DestinationPlace: String,
    typeOfTrip: String,
    dateOfTrip: String,
    timeOfTrip: String,
    AvailableSeat: {
        type: Number
    },
    PhoneNumber: {
        type: String,
        unique: true
    },
    Rating: {
        type: Number,
        default: 5
    },
    Price: {
        type: Number
    },
    Distance: {
        type: String,
        default: "0KM"
    },

    IsRider: Boolean
})
module.exports = mongoose.model("TripDetails", TripDetails);