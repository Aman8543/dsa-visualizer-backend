const jwt = require("jsonwebtoken");
const redisClient = require("../database/redis");
const user = require("../Schema.js/user");


const usermidleware = async (req,res,next)=>{
    
    try{
        const {token}=req.cookies;
        
        if(!token){
            throw new Error("token is not persent");
        }
        const payload=jwt.verify(token,"fidnfieife" );
       
        const {_id}=payload;

        if(!_id){
            throw new Error("invalid token");
        }

        const result=await user.findById(_id);
        if(!result){
            throw new Error("user is not persent");
        }

        const IsBlocked = await redisClient.exists(`token:${token}`);
        if(IsBlocked){
            throw new Error("invalid token");
        }
        req.result=result;
       
        next();
    }
    catch(err){
        res.status(401).send("Error: "+ err.message)
    }

}

module.exports=usermidleware;