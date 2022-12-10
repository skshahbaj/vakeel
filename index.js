// import  Express  from "express";
// import fs from "fs";
// const app =  Express()
// app.use(Express.json())

// app.get("/user",(req,res)=>{
//     fs.writeFile('khan.js',"hlo",function(err){
//         if(err){
//             throw err
//         }else{
//             res.send("shi hai")
//         }
//     })
// // console.log("getuserid--");
// // res.send({"name":"shahbaj"});
// })


// app.listen(3000,(req,res)=>{
//     console.log("server");
// })

// import express from 'express'
// import fs from 'fs'
// const app = express();

//  app.use(express.json())
//  export const auther=function(req,res,next){
//     if(1==1){
//         next();
//     }else{
//         res.send ('error nhi hai bee')
//     }
//  }

//            app.post('/ekfile',(req,res)=>{
//             var data = []
//             data.push(req.body)
//             var buf = JSON.stringify(data)

//             fs.writeFile('like.js',buf,function(error){
//                 if(error){
//                     throw error;
//                 }else{
//                     res.send('ek file bann gyi hai')
//                 }
//             })
//             })
//                 app.put('/updata',(req,res)=>{
//                     fs.readFile('like.js',function(err,data){
//                         if(err){
//                             throw err;
//                         }else{

//                             var oldData = JSON.parse(data)
//                             var newData = req.body
//                             console.log('oldData-----',oldData)
//                             console.log('newData---',newData)
//                             oldData.push(newData)
//                             console.log('old+new--data',oldData)
//                            var convertTostring = JSON.stringify(oldData)
//                         }
//                         fs.writeFile('like.js',convertTostring,function(err){
//                             if(err){
//                                 throw err;
//                             }else{
//                                 res.send('succefull file')
//                             }
//                         }) 

//                     })
//            })
//         //    app.post("/append",(req,res) =>{
//         //     fs.appendFile("cotent.txt","Hello World!",(er) =>{
//         //         console.log("What is issue with ER varible---",er);
//         //         if(er == null){
//         //             res.send("Data appended.");
//         //         }else{
//         //             throw er;
//         //         }
//         //     })
//         // })

//  app.listen(7001,(req,res)=>{
//     console.log('saved!')
//  })






import nodemailer from "nodemailer"

import express from "express";
import fs from "fs";
import route from "./router/new.router.js";
import connect from "./config/db.config.js"
import detali from "./router/category.rouer.js";
import sub_cate from "./router/sub_cate.router.js";
import rou from "./router/skhan.router.js";
import review from "./router/review.rating.router.js";
import product from "./router/product.router.js";
import comRouter from "./router/Commnet.router.js";
import sharepost from "./router/share.router.js";
import { config } from 'dotenv'
// import { mail } from "./controller/mail.js";

const app = express();
app.use(express.json())


 
 
// mail();
config();
connect();
app.use(sharepost)
app.use(comRouter)
app.use(detali)
app.use(sub_cate)
app.use(route)
app.use(rou)
app.use(review)
app.use(product)

app.listen( process.env.PORT || 3001, (req, res) => {
  console.log('create server');
})
// process.env.PORT||