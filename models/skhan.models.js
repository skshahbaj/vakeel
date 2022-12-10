import mongoose from "mongoose";

const skschama = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    Father_name: {
        type: String,
        require: true
    },
    Mother_name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    Aadarcard: {
        type: Number,
        require: true
    },
    pincard: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now

    }
});

const sk = mongoose.model("shahbaj_khans", skschama);
export default sk