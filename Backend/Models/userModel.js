import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email:{
        unique:true,
        type : String,
        required : true,
        trim : true
    },
    phone:{
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    confirmPassword : {
        type : String,
        required : true,
        trim : true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    verified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpireAt:Date
},{timestamps:true})

export const userModel = new mongoose.model("users", userSchema)