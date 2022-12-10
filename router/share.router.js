import { shareAllData, shareApi } from "../controller/share.controller.js";
import  Express from "express";

export const sharepost = Express.Router();

sharepost.route("/test/sharepost").post(shareApi);
sharepost.route("/test/getdata").post(shareAllData)


export default sharepost;