import mongoose from 'mongoose';
import { auth0 } from '../config/config';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    phoneNumber:{

        type:String,
        trim:true
    },
    country:{
        type:String,
        trim:true
    },
    auth0Id:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{
    timestamps:true
}
);
module.exports=mongoose.model('User',userSchema);