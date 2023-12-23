const mongoose =require('mongoose');

const RiderSchema = new mongoose.Schema({
        VehicleNumber:String,
        SourcePlace:String,
        DestinationPlace:String,
        typeOfTrip:String,
        dateOfTrip:String,
        timeOfTrip:String,
        availableSeat:String,
        PhoneNumber:String,
        IsRider:Boolean,

})
module.exports =mongoose.model("RiderForm",RiderSchema);