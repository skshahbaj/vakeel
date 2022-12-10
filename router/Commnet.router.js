import { commentAllData, commentApi } from "../controller/Commnet.controller.js";

import  Express  from "express";
export const comRouter = Express.Router();

comRouter.route("/test/comment").post(commentApi);
comRouter.route("/test/comment/getData").get(commentAllData);

export default comRouter;
