import mongoose from "mongoose";

export const connect = async () => {
    const con = await mongoose.connect("mongodb+srv://prod:wgO8WMuZFrJjZWz5@cluster0.2carefb.mongodb.net/?retryWrites=true&w=majority")
    console.log("khan----", con.connection.host);

}
export default connect;

// mongodb+srv://prod:wgO8WMuZFrJjZWz5@cluster0.2carefb.mongodb.net/?retryWrites=true&w=majority