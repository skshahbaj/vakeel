import mongoose from "mongoose";

const category = new mongoose.Schema({
    name:{
   type:String,
   require:true
    },
    status:{
      
            type:String,
            enum:["Active","Deactive"],
            default:"Active"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'shahbaj_khans' 
    },
    create:{
        type:Date,
        default:Date.now
    },
    update:{
        type:Date,
        default:Date.now
    }
    
})

const khan = mongoose.model("categorie",category );
export default khan