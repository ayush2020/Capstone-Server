const mongoose =require('mongoose');

const Rider = new mongoose.Schema({
          FullName:String,
          Email: {
            type:String,
            unique: true
        },
          PhoneNumber:{
            type:String,
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