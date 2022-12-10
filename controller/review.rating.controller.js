import ReviewRating from "../models/review.rating.models.js";
 
 export const rating = async(req,res)=>{
 try{
    const IsratingExist = await ReviewRating.findOne({productId:req.body.productId,userId:req.body.userId})
    if(IsratingExist){
       res.send({
          status:false,
          msg:"Already ratted",
          data:{}
       });
       return;
    }
    const ratingcreate = await ReviewRating.create(req.body)
    if(ratingcreate){
        res.send({
            status:true,
            msg:"succefull created",
            data:ratingcreate
        }) 
    }


 }catch(err){
    res.send({
        status:false,
        msg:"'something wrong",
        data:err
    })
 }
 };

 export const getRatingByProduct = async(req,res) =>{
   
    const data = await ReviewRating.find().populate("userId").populate("productId")
    if(data.length > 0){
       res.send({
          status:true,
          msg:"Rating and reviews fetch successfully.",
          data:data
       })
    }else{
       res.send({
          status:false,
          msg:"No rating and reviews found for this product.",
          data:[]
       })
    }
 }
