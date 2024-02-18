const mongoose =require('mongoose');

const PassengerTrip = new mongoose.Schema({
        Fullname:String,
        Email: {
            type:String,
            unique: true
        },
          PhoneNumber:{
            type:Number,
            unique: true
        },
        Gender:{
            type:String,
  
        },
        SourcePlace: String,
        DestinationPlace: String,
        typeOfTrip: String,
        dateOfTrip: String,
        timeOfTrip: String,
        
        Rating: {
            type: Number,
            default: 5
        },
        Price: {
            type: Number
        },
        Distance: {
            type: Number,
            default: 0
        },
        IsRider:Boolean,

})
module.exports =mongoose.model("Passengers",PassengerTrip);