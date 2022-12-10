import khan from "../models/category.model.js";


export const category = async (req, res) => {
    try {
        const product = await khan.create(req.body);
        if (product) {
            res.send({
                status: true,
                msg: ' succefull',
                data: product
            })
        } else {
            res.send({
                status: false,
                msg: 'wrong create',
                data: {}
            })
        }
    } catch (err) {
        res.send({
            status: false,
            msg: 'wrong ',
            data: err
        })
    }

};

export const categoryLogin = async (req, res) => {
    var getuser = await khan.find().populate("createdBy")
    if (getuser) {
        res.send({
            status: true,
            msg: "succfull login",
            data: getuser
        })
    } else {
        res.send({
            status: false,
            msg: "wrong login",
            data: {}
        })
    }

};

// export const updateCate = async(req,res)=>{
//      const update = await khan.findOneAndUpdate({name:req.body.name})
//      if(update){
//         res.send({
//             status:true,
//             msg:"succfull update",
//             data:update
//         })
//      }else{
//         res.send({
//             status:false,
//             msg:"wrong update",
//             data:{}
//         }) 
//      }
// };

// export const deleteCate = async(req,res)=>{
//     const catedelete = await khan.findOneAndDelete({name:req.body.name})
//     if(catedelete){
//         res.send({
//             status:true,
//             msg:"succfull delete",
//             data:catedelete
//         })
//      }else{
//         res.send({
//             status:false,
//             msg:"not find name",
//             data:{}
//         }) 
//      }
// };


export const GetDataByAgrigate = async (req, res) => {
    const data = await khan.aggregate([
        {
            $match: {
                name: req.body.name
            },
        },
        {
            "$lookup": {
                "from": "sub_categories",
                "localField": "_id",
                "foreignField": "cateId",
                "as": "subcategories"
            }
        }, {
            "$unwind": {
                path: "$subcategories",
                preserveNullAndEmptyArrays: true

            }
        },
        // { $limit: Number(10) },

        // //    { $group:{_id:"$name"}},
        // //     {$count:"name"}

        // {
        //     $group:
        //     {
        //         _id: { status: "$status" },
        //         //    totalEmployee: { $sum: 1 },
        //     }
        // }

    ]);
    res.send(data)
};

export const search = async (req, res) => {

    const sear = await khan.find(
        {
            "$or": [
                { "name": { $regex: req.params.key } },
                { "status": { $regex: req.params.key } },
            ]
        }
    )
    res.send(sear)
    // console.log(sear)
} 
