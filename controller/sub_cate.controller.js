import sub from "../models/sub_cate.models.js"

export const subCate = async(req,res)=>{
    const cate = await sub.create(req.body);
    if(cate){
        res.send({
            status:true,
            msg:'create succefull',
            data:cate
        })
    }else{
        res.send({
            status:false,
            msg:'wrong create',
            data:{}
        }) 
    }


};
export const sub_cateall = async(req,res)=>{
    var sublogin = await sub.find({status:"Active"}).populate("cateId").populate("createBy")
    if(sublogin){
        res.send({
            status:true,
            msg:"succfull login",
            data:sublogin
        })
    }else{
        res.send({
            status:false,
            msg:"wrong login",
            data:{}
        }) 
    }

};

export const updatasub_cate = async(req,res)=>{
    const update = await sub.findOneAndUpdate({category_id:req.body.category_id})
    if(update){
       res.send({
           status:true,
           msg:"succfull update",
           data:update
       })
    }else{
       res.send({
           status:false,
           msg:"wrong update",
           data:{}
       }) 
    }
};

export const deletesubcate = async(req,res)=>{
    const subcatedelete = await sub.findOneAndDelete({name:req.body.name})
    if(subcatedelete){
        res.send({
            status:true,
            msg:"succfull delete",
            data:subcatedelete
        })
     }else{
        res.send({
            status:false,
            msg:"not find name",
            data:{}
        }) 
     }
};
export const Agrigate = async (req, res) => {
    const data = await sub.aggregate([
        {
            $match: {
                name: req.body.name
            },
        },
        {
            "$lookup": {
                "from": "products",
                "localField": "_id",
                "foreignField": "subCateId",
                "as": "pro"
            }
        },        {
            "$unwind": {
                path:"$pro",
                preserveNullAndEmptyArrays: true

            }
        },
    ]);
    res.send(data)
}



   