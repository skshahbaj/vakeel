// import jwt from "jsonwebtoken";
// export const auth = (req,res,next) =>{
//     try{
//     if(!req.headers["authorization"]){
//         res.send({
//             status:false,
//             msg:"Auth token is required.",
//             data:{}
//         })
//         return;
//     }
//     var token = req.headers["authorization"].replace("Bearer ",'');
//     var checkToken = jwt.verify(token,"han-ka-token")
//     if(checkToken){
//        next();
//        return;
//     }else{
//         res.send({
//             status:false,
//             msg:"Auth token is not valid.",
//             data:{}
//         })
//         return;
//     }
// } catch(err){
//     res.send({
//         status:false,
//         msg:"Invalid token",
//         data:{}
//     })
//     return;
// }
// }

import  Jwt  from "jsonwebtoken";
export const auth = async(req,res,next)=>{
    //res.send("yes !")
    if (!req.headers["authorization"]){
        res.send({
            status:false,
            msg:"auth token is required",
            data:{}
        })
    }
    try{
     var token = req.headers["authorization"].replace("Bearer ","")
     //res.send(token)
    var checkToken = await Jwt.verify(token,"han-ka-token")
    res.send(checkToken)
    if(checkToken){
        next();
        
    }else{
        res.send({
            status:false,
            msg:"not valid token",
            data:{} 
        })
    }
    }catch(err){
        res.send({
            status:false,
            msg:"something wrong",
            data:{}   
        })

    }
}