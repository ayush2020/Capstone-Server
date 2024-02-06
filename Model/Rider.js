const mongoose =require('mongoose');

const Rider = new mongoose.Schema({
          Fullname:String,
          Email:String,
          PhoneNumber:String,
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