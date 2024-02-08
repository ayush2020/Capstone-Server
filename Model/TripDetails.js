const mongoose =require('mongoose');

const TripDetails = new mongoose.Schema({
        VehicleNumber:{
                type:String,
                unique: true
        },
        SourcePlace:String,
        DestinationPlace:String,
        typeOfTrip:String,
        dateOfTrip:String,
        timeOfTrip:String,
        availableSeat:String,
        PhoneNumber:{
                type:String,
                unique: true
        },
        IsRider:Boolean,

})
module.exports =mongoose.model("TripDetails",TripDetails);