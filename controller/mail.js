 import nodemailer from "nodemailer";

 export const mail = (name,token,email)=>{

const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
     requireTLS:true,
    auth:{
        user:'shahbaj090khan@gmail.com',
        pass:'hwgeubbsnqctcjyi'
    }

});

const mailoption = {
    from:'shahbaj090khan@gmail.com',
    to:'shahbaj090khan@gmail.com',
    subject:"completed mail  ",
    html:'<P> hiii '+name+',please copy the link and <a href ="localhost:3001/test/forgetpasword?token '+token+'">reset your password</a> '
}
transport.sendMail(mailoption,function(err,info){
 if(err){
    console.log(err)
 }else{
    console.log('email send',info.response)
 }
})
 }