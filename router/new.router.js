import { login, update, deletedata, signup, resendOTP, VerifyOtp, ResetPassword, forgetpasword, InsertBulkuser, Uploadimage, searchuser } from "../controller/user.controller.js"
import Express from "express"
import { auth } from "../middleware/authentication.js"
import { ExcelUploadUser } from "../services/image.services.js";

export const route = Express.Router();

route.route("/signup").post(signup);
route.route("/login").post(login);
// route.route("/all_data").get(allData);
// route.route("/oneupdate").put(oneupdate);
route.route("/update").put(update);
route.route("/delete").delete(deletedata);
route.route("/test/otp").post(resendOTP)
route.route("/test/resetPassword").post(ResetPassword)
route.route("/test/searchUser/:key").get(searchuser);

route.route("/test/VerifyOtp").post(VerifyOtp)
route.route("/test/forgetpasword").post(forgetpasword)
route.route("/test/uploadimage").post(Uploadimage)
route.route("/test/export").post(ExcelUploadUser.single("excel_upload"), InsertBulkuser)








export default route;