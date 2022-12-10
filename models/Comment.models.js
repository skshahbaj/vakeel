import mongoose from "mongoose";

const commentApi = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    status: {

        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    },

    create: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'products'
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'shahbaj_khans'
    },

})

const comment = mongoose.model("comment", commentApi);
export default comment