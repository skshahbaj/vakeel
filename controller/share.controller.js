import share from "../models/share.models.js";

export const shareApi = async(req,res)=>{
    const sha = await share.create(req.body);
    if (sha) {
        res.send({
            status: true,
            msg: 'share succefull',
            data: sha
        })
    } else {
        res.send({
            status: false,
            msg: 'wrong create',
            data: {}
        })
    }
};

export const shareAllData = async (req, res) => {
    var getdata = await share.find({ status: "Active" }).populate("post_id").populate("who_shared").populate("who_received")
    if (getdata) {
        res.send({
            status: true,
            msg: "share succfull ",
            data: getdata
        })
    } else {
        res.send({
            status: false,
            msg: "wrong ",
            data: {}
        })
    }

};
