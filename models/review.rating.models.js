import mongoose from "mongoose";

export const reviewschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "shahbaj_khans",
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: "products",
        require: true
    },
    rate: {
        type: Number,
        require: true

    },
    review: {
        type: String,
        Request: true
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const ReviewRating = mongoose.model("reviewrating", reviewschema);
export default ReviewRating;