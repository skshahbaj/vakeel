import mongoose from "mongoose";

const ProImages = new mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    fullpath:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
})
export default ProImages;