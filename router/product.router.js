import Express from "express";
import { imageUpload } from "../services/image.services.js";
import {   proCreate, productAlldata, productD_delete, productD_update } from "../controller/product.controller.js";
export const product = Express.Router();


 product.route("/test/product_create") .post(imageUpload.array("image",2),proCreate);
product.route("/test/product_allData").get( productAlldata)
product.route("/test/product_update").put(productD_update);

export default product;