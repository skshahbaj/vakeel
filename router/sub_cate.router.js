import { Agrigate, deletesubcate, subCate, sub_cateall, updatasub_cate } from "../controller/sub_cate.controller.js";
import Express from "express";
export const sub_cate = Express.Router();


sub_cate.route("/test/sub_cate").get(subCate);
sub_cate.route("/test/sub_cate_alldata").get(sub_cateall);
sub_cate.route("/test/sub_cateupdate").put(updatasub_cate);
sub_cate.route("/test/sub_catedelete").delete(deletesubcate);
sub_cate.route("/test/sub_agrigate").post(Agrigate);






export default sub_cate