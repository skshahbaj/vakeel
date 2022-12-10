import mongoose from "mongoose";
import ProImages from "./pro.images.js";

const productschema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'shahbaj_khans'

    },
    subCateId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'sub_categories'

    },
    cateId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categories'
    },
    name: {
        type: String,
        require: true
    },
    images:[ProImages],

    status: {
        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    cash_on_delivery:{
        type:String,
        require:true
    },
    delivery_fees:{
        type:Number,
        require:true
    },
    description: {
        type: String,
        required: true,
    },

    create: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    },

})


const pro = mongoose.model("products", productschema);
export default pro