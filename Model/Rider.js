const mongoose =require('mongoose');

const Rider = new mongoose.Schema({
          Fullname:String,
          Email: {
            type:String,
            unique: true
        },
          PhoneNumber:{
            type:Number,
            unique: true
        },
          Licenseno:String,
          Vehicleno:String,
          Password:String,
          Rc: String,
          IsRider:Boolean,

})
module.exports =mongoose.model("Rider",Rider);
// Name:"",
//       Email:"",
//       Password:"",
//       Licenseno:"",
//       Vehicleno:"",
//       Rc: ""