const mongoose =require('mongoose');

const TripDetails = new mongoose.Schema({
        Fullname:String,
        VehicleNumber:{
                type:String,
                unique: true
        },
        VehileName:{
                type:String,
        },
        VehileColour:{
                type:String,
        },
        SourcePlace:String,
        DestinationPlace:String,
        typeOfTrip:String,
        dateOfTrip:String,
        timeOfTrip:String,
        availableSeat:{
                type: Number,
                
        },
        PhoneNumber:{
                type:String,
                unique: true
        },
        Rating:{
                type:Number,
                default :5
        },
        Price:{
                type:Number
        },
        Distance:{
                type:Number,
                default: 0,
        },
        


        IsRider:Boolean,
        
})
module.exports =mongoose.model("TripDetails",TripDetails);