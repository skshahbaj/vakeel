import express from "express";
import fs from "fs";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import Randomstring from "randomstring";
import { mail } from "./mail.js";
import users from "../models/user.models.js";
import csv from 'csvtojson'
import path from "path";

export const signup = async (req, res) => {
   try {
      const existname = await users.findOne({ username: req.body.username })
      if (existname) {
         res.send({
            status: false,
            msg: "name is already exist",
            data: {}
         });
      } else {
         var otp = Math.floor(1000 + Math.random() * 9000);

         var data1 = (req.body)
         var passwordhash = await bcrypt.hash(req.body.password, 10);
         data1.password = passwordhash
         data1.otp = otp
         var data = ({
            time: Date(),
            userid: "_id"
         });
         var token = await Jwt.sign(data, "data-token")
         data1.token = token

         const user = await users.create(req.body);
         res.send({
            status: true,
            msg: "signup succefull ",
            data: user
         })
      }
   } catch (err) {
      res.send({
         status: false,
         msg: "something wrong",
         data: err
      });
   }
}

export const login = async (req, res) => {
   try {
      var getuser = await users.findOne({ username: req.body.username })
      //   res.send(getuser)
      if (getuser) {
         const password = await bcrypt.compare(req.body.password, getuser.password)
         if (password) {
            console.log(password)
            var token = await Jwt.sign({ time: Date(), userid: getuser._id }, "data-token")

            console.log(token)
            res.send({
               status: true,
               msg: "login succefull ",
               data: getuser
            })
         } else {
            res.send({
               status: false,
               msg: "passwor wrong ",
               data: {}
            })
         }
      } else {
         res.send({
            status: false,
            msg: "username wrong",
            data: {}
         })
      }


   } catch (err) {
      res.send({
         status: false,
         msg: "something wrong  ",
         data: err
      })
   }

}
// export const allData = async (req, res) => {
//  var where = {}
//  if (req.query.username){
//    where.username = req.query.username
//  }
//  if (req.query.eamil){
//    where.email = req.query.email
//  }
//    const data = await users.find()
//    if (data.length > 0) {
//       res.send({
//          status: true,
//          msg: "User successfully.",
//          data: data
//       })
//    } else {
//       res.send({
//          status: false,
//          msg: "No data found",
//          data: {}
//       })
//    }
//    res.send(data)
// }

//  export const oneupdate = async(req,res)=>{
//    try{
//    const data = await users.findOneAndUpdate({mobile:req.body.mobile},req.body)

//    if (data){
//       res.send({
//          status:true,
//          msg:"update succesfully",
//          data:data
//       })
//    }else{
//       res.send({
//          status:false,
//          msg:"something wrong",
//          data:{}
//       })
//    }
// }catch(err){
//    res.send({
//       status:false,
//       msg:"something wrong",
//       data:{}
//    })
// }
//  }

export const update = async (req, res) => {
   try {
      var data1 = await users.findByIdAndUpdate({ _id: req.body.id }, req.body)
      if (data1) {
         res.send({
            status: true,
            msg: "update one succefull",
            data: data1
         })
      } else {
         res.send({
            status: false,
            msg: "update nhi ho sakta",
            data: data1
         })
      }


   } catch (err) {
      res.send({
         status: false,
         msg: "wrong",
         data: {}
      })
   }
}

export const deletedata = async (req, res) => {
   try {
      var data = await users.findByIdAndDelete({ _id: req.body.id }, req.body)
      //  res.send(data)
      if (data) {
         res.send({
            status: false,
            msg: "delete succfull",
            data: data
         })
      } else {
         res.send({
            status: true,
            msg: "delete succfull",
            data: data
         })
      }
   } catch (err) {
      res.send({
         status: false,
         msg: "something wrong",
         data: {}
      })
   }

}

// export const paramsdelete = async(req,res)=>{
//    try{
//    var data = await users.findOneAndDelete({email:req.body.email},req.body)
//    // res.send(data)
//    if(data){
//       res.send({
//          status:true,
//          msg:"delete succefull",
//          data:data
//       })
//    }else{
//       res.send({
//          status:false,
//          msg:"not found email",
//          data:{}
//       })
//    }
//    }catch(err){
//       res.send({
//          status:false,
//          msg:"something wrong",
//          data:{}
//       })
//    }
// }


export const resendOTP = async (req, res) => {
   var otp = Math.floor(1000 + Math.random() * 9000);
   console.log(otp);
   req.body.otp = otp
   const data = await users.findByIdAndUpdate({ _id: req.body.id }, req.body)
   data.otp = req.body.otp
   if (data) {

      res.send({
         status: true,
         msg: "succefull",
         data: data
      })
   } else {
      res.send({
         status: false,
         msg: "succefull",
         data: {}
      })
   }
}
export const VerifyOtp = async (req, res) => {
   const checkOtp = await users.findOne({ mobile: req.body.mobile, otp: req.body.otp })
   if (checkOtp) {
      var dataToBeUpdate = {};
      dataToBeUpdate.number_verified = true;
      await users.findByIdAndUpdate({ _id: checkOtp._id }, dataToBeUpdate)
      checkOtp.number_varified = true;
      console.log(checkOtp)
      res.send({
         status: true,
         msg: "Otp Verified succesfully.",
         data: checkOtp
      }); return;
   } else {
      res.send({
         status: false,
         msg: "Invalid Otp or mobile no.",
         data: {}
      }); return;
   }
}

export const ResetPassword = async (req, res) => {
   const checkUserExist = await users.findOne({ username: req.body.username })
   // console.log(checkUserExist)
   if (checkUserExist) {
      let checkPass = await bcrypt.compare(req.body.oldpassword, checkUserExist.password)
      // console.log(checkPass)
      if (checkPass) {
         var dataToBeUpdate = {};
         const passwordHash = await bcrypt.hash(req.body.new_password, 10)
         dataToBeUpdate.password = passwordHash;
         // console.log(passwordHash)

         const pass = await users.findOneAndUpdate({ username: checkUserExist.username }, dataToBeUpdate)
         // console.log(pass)
         res.send({
            status: true,
            msg: "Password Reset Succesfully",
            data: checkUserExist
         })
      } else {
         res.send({
            status: false,
            msg: "Invalid Old Password given.",
            data: {}
         })
      }
   } else {
      res.send({
         status: false,
         msg: "User not found with given id.",
         data: {}
      }); return;
   }
}
export const forgetpasword = async (req, res) => {
   const eamailexist = users.findOne({ email: req.body.email })
   if (eamailexist) {
      var otp = Math.floor(1000 + Math.random() * 9000);

      const transport = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         requireTLS: true,
         auth: {
            user: 'shahbaj090khan@gmail.com',
            pass: 'hwgeubbsnqctcjyi'
         }

      });

      const mailoption = {
         from: 'shahbaj090khan@gmail.com',
         to: 'shahbaj090khan@gmail.com',
         subject: "completed mail  ",
         html: "<p> your otp given your mail" + otp + "</ap>"
      }
      transport.sendMail(mailoption, function (err, info) {
         if (err) {
            console.log(err)
            res.send(err)
         } else {
            console.log('email send', info)
            res.send(info)
         }
      })
   }

}
function importUserRes(uName, email, reason, key) {
   return {
      username: uName,
      email: email,
      reason: reason,
      key: key,

   }
}

export const InsertBulkuser = async (req, res) => {
   const jsonArray = await csv().fromFile(req.file.path);
   var rejected = []
   var success = 0
   jsonArray.forEach(async (value, key) => {
      const IsEmailExist = await users.findOne({ email: value.email }).sort({ "_id": -1 })
      const IsMobileExist = await users.findOne({ mobile: value.mobile })
      if (!value.email) {
         rejected.push(importUserRes(value.username, value.email, "Email not given.", key))
      } else if (!value.password) {
         rejected.push(importUserRes(value.username, value.email, "Password not given.", key))
      }
      else if (!value.username) {
         rejected.push(importUserRes(value.username, value.email, "Username not given.", key))
      }
      else if (!value.mobile) {
         rejected.push(importUserRes(value.username, value.email, "Mobile no.not given.", key))

      }
      else if (!value.age) {
         rejected.push(importUserRes(value.username, value.email, "age not given.", key))

      }

      else if (IsEmailExist) {
         rejected.push(importUserRes(value.username, value.email, "Email already .", key))
      } else if (IsMobileExist) {
         rejected.push(importUserRes(value.username, value.email, "Mobile no. already .", key))
      }

      else {

         const passwordHash = await bcrypt.hash(value.password, 10)
         value.password = passwordHash
         var user = await users.create(value)
         if (user) {
            success++;
            console.log("success", success)
         }
      }
   });
   setTimeout(() => {
      if (success == 0) {
         res.send({
            status: false,
            msg: "No data inserted.",
            success: success,
            rejected_data: rejected,
         })
      } else {
         res.send({
            status: true,
            msg: "Data inserted succefully.",
            success: success,
            rejected_data: rejected,
         })
      }
   }
      , "1000")

}




export const Uploadimage = async (req, res) => {
   var imgBase64 = req.body.image;
   var lowercase = imgBase64.toLowerCase();
   var extension = undefined;
   if (lowercase.indexOf("png") == 11) {
      extension = "png"

      var base64Data = imgBase64.replace(/^data:image\/png;base64,/, "");

   }
   else if (lowercase.indexOf("jpg") == 11 || lowercase.indexOf("jpeg") == 11) {
      extension = "jpg"
      var base64Data = imgBase64.replace(/^data:image\/jpeg;base64,/, "");
   }
   var imagePath = "upload" + "/" + Date.now() + "." + extension;
   fs.writeFile(imagePath, base64Data, 'base64', function (err) {
      console.log("errr-----", err)
      if (err) {
         res.send({
            status: false,
            msg: "image not found",
            data: err
         })
      } else {
         console.log(imagePath)
         res.send({
            status: true,
            msg: "image upload succesfully",
            data: imagePath
         })
      }
   })
};

export const searchuser = async (req, res) => {
   const search = await users.find(
      {
         "$or": [
            { "username": { $regex: req.params.key } },
            
         ]
      }
   )
   res.send(search)
   //  console.log(search)
} 
