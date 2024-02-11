const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
          Fullname:String,
          Email:{
            type:String,
            unique: true
        },
          PhoneNumber:{
            type:String,
            unique: true
        },
          Password:String,
          IsRider:Boolean,

})
module.exports =mongoose.model("User",UserSchema);