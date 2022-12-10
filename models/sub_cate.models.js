import mongoose from "mongoose";

const sub_category = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    },
    cateId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categories'
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'shahbaj_khans'
    },
    create: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }

})

const sub = mongoose.model("sub_categories", sub_category);
export default sub