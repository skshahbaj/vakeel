import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import sk from "../models/skhan.models.js";

export const khan = async(req,res)=>{
    try{
    const user = await sk.create(req.body);
    if(user){
        res.send({
            status:true,
            msg:"create data succefull",
            data:user
        })
    }
         
    }catch(err){
        res.send({
            status:false,
            msg:"something is wrong",
            data:{}
        })
    }
}