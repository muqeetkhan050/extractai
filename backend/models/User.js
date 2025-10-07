import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{type:String,reuired:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

export default mongoose.model('User',userSchema)