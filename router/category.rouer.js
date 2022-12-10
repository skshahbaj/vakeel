import { category, categoryLogin ,GetDataByAgrigate, search} from "../controller/category.controller.js";

import Express from "express";
export const detali = Express.Router();

detali.route("/test/category").get(category);
detali.route("/test/categorylogin").get(categoryLogin);
detali.route("/test/getdata").post(GetDataByAgrigate);
detali.route("/test/search/:key").get(search);


export default detali

