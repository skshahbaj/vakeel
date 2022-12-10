import pro from "../models/product.models.js";
export const proCreate = async (req, res) => { 
    // try{
        
    var allImages = [];
    req.files.forEach(image => {
        var imageType = '';
        if (image.mimetype == 'image/png') {
            imageType = 'png';
        } else if (image.mimetype == 'image/jpg' || image.mimetype == 'image/jpeg') {
            imageType = 'jpg';
        }
        let imageData = {
            path: image.filename,
            fullpath: req.get('host')+"/" + image.path,
            type: imageType,
        }
        console.log("imageData------",imageData);
        allImages.push(imageData)
    });
    req.body.images = allImages

    const existname = await pro.findOne({name:req.body.name})
    if(existname){
        res.send({
            status:false,
            msg:'already name exist',
            data:{}
        })
    }

    const productD = await pro.create(req.body);
    if (productD) {
        res.send({
            status: true,
            msg: 'create  product detail succefull',
            data: productD
        })
    } else {
        res.send({
            status: false,
            msg: 'wrong product detail',
            data: {}
        })
    }
// }catch(err){
//     res.send({
//         status: false,
//         msg: 'wrong',
//         data: err
//     })
// }


};

export const productAlldata = async (req, res) => {
    try {
        var productlogin = await pro.find({status:"Active",subCateId:req.body.subCateId}).populate("subCateId").populate("cateId").sort({'_id': -1})
        if (productlogin) {
            res.send({
                status: true,
                msg: "succfull product data",
                data: productlogin
            })
        } else {
            res.send({
                status: false,
                msg: "can not find data",
                data: {}
            })
        }
    } catch (err) {
        res.send({
            status: false,
            msg: "something wrong",
            data: err
        })
    }
};

export const productD_update = async (req, res) => {
    const pro_update = await pro.findOneAndUpdate({ price: req.body.price })
    if (pro_update) {
        res.send({
            status: true,
            msg: "succfull product update",
            data: pro_update
        })
    } else {
        res.send({
            status: false,
            msg: "wrong update",
            data: {}
        })
    }
};

export const productD_delete = async (req, res) => {
    const pro_delete = await pro.findByIdAndDelete({ _id: req.body._id })
    if (pro_delete) {
        res.send({
            status: true,
            msg: "succfull product detail delete",
            data: pro_delete
        })
    } else {
        res.send({
            status: false,
            msg: "no find id",
            data: {}
        })
    }
};

