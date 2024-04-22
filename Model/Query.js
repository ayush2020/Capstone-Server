const mongoose = require('mongoose');

const Query = new mongoose.Schema({
    FullName:String,
          Email: {
            type:String,
            unique: true
        },
          PhoneNumber:{
            type:String,
            unique: true
        },
    Query :{
       type :String,
       unique :false,
       require :true,        
    }
})
module.exports =mongoose.model("Queries",Query);