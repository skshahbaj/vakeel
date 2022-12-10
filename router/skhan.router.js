import { khan } from "../controller/skhan.controller.js";
import Express from "express";

export const rou = Express.Router();

rou.route("/sk_shahbaj").get(khan);

export default rou