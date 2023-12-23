const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
          Fullname:String,
          Email:String,
          PhoneNumber:String,
          IsRider:Boolean,

})
module.exports =mongoose.model("Userform",UserSchema);