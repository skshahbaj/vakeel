import mongoose from "mongoose";

const shareApi = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'products'
    },
    who_shared: {
        type: mongoose.Schema.Types.ObjectId, ref: 'shahbaj_khans'
    },
    who_received: {
        type: mongoose.Schema.Types.ObjectId, ref: 'shahbaj_khans'
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
    }
})

const share = mongoose.model("share", shareApi);
export default share