const user = require("../Schema.js/user");
const jwt = require('jsonwebtoken');
const validate = require("../Utils/validator");
const bcrypt = require("bcrypt");
const redisClient = require("../database/redis");


const userRegister = async (req,res)=>{
    
    try{
        validate(req.body);
        
         const {firstName,emailId,password} = req.body;
         const findUser= await user.findOne({emailId:emailId});
         if(findUser){
           throw new Error("change your emailId");
         }
        req.body.password = await bcrypt.hash(password,10);
      
        const newUser = await user.create({
            firstName:firstName,
            emailId:emailId,
            password:req.body.password,
        })
       
        const reply = {
            firstName:firstName,
            emailId:emailId,
            _id:user._id
        }

        const token = jwt.sign({emailId:emailId,_id:user._id},"fidnfieife",{expiresIn: 60*60});
        res.cookie('token',token,{maxAge: 60*60*1000,httpOnly:true ,  secure:false,sameSite:'Lax' });
        res.json({
            user:reply,
            message:"user register successfully"
        })
    }
    catch(err){
        
        res.json({message:""+err});
    }
}



const userLogin = async (req,res)=>{
    try{
        const {emailId , password} = req.body;
        if(!emailId && !password){
            throw new Error("something is wrong ");
        
        }
        const findUser = await user.findOne({emailId:emailId});
        
        if(!findUser){
            return res.json({message:"please SignUp"});
        }

        const match = await bcrypt.compare(password,findUser.password);
     
        if(!match){
            throw new Error("gmail or password wrong");
        }

        const token = jwt.sign({emailId:emailId,_id:findUser._id},"fidnfieife",{expiresIn: 60*60});
        res.cookie('token',token,{maxAge: 60*60*1000 ,httpOnly: true,               // Prevent JS access
  secure: false,                // Set to true in production with HTTPS
  sameSite: 'Lax', path: '/' });
        const reply = {
            firstName:findUser.firstName,
            emailId:emailId,
            _id:findUser._id
        }

        res.json({
            user:reply,
            message:"succesfuly login"
        })

    }
    catch(err){
        res.json({
            message:"error to login : "+err
        })
    }
}

const userLogout = async(req,res)=>{
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`,'Blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);
    //    Token add kar dung Redis ke blockList
    //    Cookies ko clear kar dena.....

        res.cookie("token",null,{expires: new Date(Date.now())});
        res.json({message:"logout successfuly"});
    }
    catch(err){
        res.json({message: "ERROR "+err});
    }
}

const userDelete = async (req,res)=>{
    try{
        const userId= req.result._id;
        if(!userId){
            res.send("user is not exist");
        }
       await user.findByIdAndDelete(userId);

        //await Submission.deleteMany({userId});

        res.send("successfully deleted");
    }
    catch(err){
        res.send("error"+ err);
    }
}

const userCheck = (req,res)=>{
    
    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
}

module.exports = {userRegister , userLogin , userDelete , userLogout ,userCheck}