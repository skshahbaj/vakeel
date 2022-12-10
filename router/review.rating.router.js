import { getRatingByProduct, rating } from "../controller/review.rating.controller.js";
import Express from "express";
export const review = Express.Router()

review.route("/review/create").post(rating)
review.route("/review/alldata").get(getRatingByProduct)


export default review;