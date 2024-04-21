import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{type:String,required:true,trim:true,unique:true},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},
    verifyToken:{type:String},
    verifyTokenExpiry:{type:Date},
    forgetPasswordToken:{type:String},
    forgetPasswordTokenExpiry:{type:Date}
})
export const User = mongoose.models.users || mongoose.model('users',userSchema);