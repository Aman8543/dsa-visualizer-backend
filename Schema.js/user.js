const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    firstName:{
        type:String,
        minlength:4,
        maxlenght:30,
        required:true
    },
    lastName:{
        minlength:4,
        maxlength:30,
        type:String
    },
    emailId:{
        type:String,
        minlength:5,
        maxlenght:60,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = mongoose.model("User",UserSchema);
module.exports = user;