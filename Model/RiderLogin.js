const mongoose =require('mongoose');

const RiderLoginSchema = new mongoose.Schema({
          Fullname:String,
          Email:String,
          PhoneNumber:String,
          Licenseno:String,
          Vehicleno:String,
          Password:String,
          Rc: String,
          IsRider:Boolean,

})
module.exports =mongoose.model("Riderform",RiderLoginSchema);
// Name:"",
//       Email:"",
//       Password:"",
//       Licenseno:"",
//       Vehicleno:"",
//       Rc: ""