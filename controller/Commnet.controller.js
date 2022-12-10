import comment from "../models/Comment.models.js";

export const commentApi = async (req, res) => {
    const comm = await comment.create(req.body);
    if (comm) {
        res.send({
            status: true,
            msg: 'comment succefull',
            data: comm
        })
    } else {
        res.send({
            status: false,
            msg: 'wrong create',
            data: {}
        })
    }
};

export const commentAllData = async (req, res) => {
    var getdata = await comment.find({ status: "Active" }).populate("post_id").populate("commentBy")
    if (getdata) {
        res.send({
            status: true,
            msg: "succfull ",
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
