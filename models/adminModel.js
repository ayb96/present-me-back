

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const  userSchema = mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true,
    },
    isAdmin:{
        type:Boolean,
        require: true,
        default:false
    },
    pic:{
        type:String,
        require: true,
    },
    
    
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model('User',userSchema)