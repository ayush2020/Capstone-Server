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
        },
        PaymentMethod:{
            type: String,
        },
        Price:{
            type:Number,
            default: 0
        },
        PaymentStatus:{
            type: String,
            default: "Not_Paid"
        }

})
module.exports =mongoose.model("Passengers",PassengerTrip);