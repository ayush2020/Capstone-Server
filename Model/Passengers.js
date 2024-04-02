const mongoose =require('mongoose');

const PassengerTrip = new mongoose.Schema({
        FullName:String,
        Email: {
            type:String,
            unique: true
        },
          PhoneNumber:{
            type:String,
            unique: true
        },
        Gender:{
            type:String,
  
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
        IsRider:Boolean,
        
        RiderEmail: {
            type : String,
            default: "Not Assigned"
        },
        Acceptance:{
            type: String,
            default:"Not Assigned"
        },
        confirmRide:{
            type:Boolean,
            default:false
        },
        RejectRide:{
            type:Boolean,
            default:false
        }

})
module.exports =mongoose.model("Passengers",PassengerTrip);